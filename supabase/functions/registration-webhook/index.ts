import "@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "@supabase/supabase-js"

const BUCKET = "exports"
const FILE = "registros.xls"

function escapeXml(s: string): string {
  const a = "&"
  return s
    .replace(/&/g, a + "amp;")
    .replace(/</g, a + "lt;")
    .replace(/>/g, a + "gt;")
    .replace(/"/g, a + "quot;")
}

function buildExcelXml(rows: Record<string, string>[]): string {
  const headers = Object.keys(rows[0] ?? {})
  const rowsXml = rows.map((row) => {
    const cells = headers.map((h) =>
      `<Cell><Data ss:Type="String">${escapeXml(row[h])}</Data></Cell>`
    ).join("")
    return `    <Row>${cells}</Row>`
  }).join("\n")
  const headerRow = headers.map((h) =>
    `<Cell><Data ss:Type="String">${escapeXml(h)}</Data></Cell>`
  ).join("")
  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="Registros">
  <Table>
    <Row>${headerRow}</Row>
${rowsXml}
  </Table>
 </Worksheet>
</Workbook>`
}

Deno.serve(async (_req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )
    const { data: registrations, error } = await supabase
      .from("registrations")
      .select("nombre, email, universidad, tipo_participante, fecha_registro, evento")
      .order("fecha_registro", { ascending: true })
    if (error) throw error

    const rows = registrations.map((r, i) => ({
      "#": String(i + 1),
      Nombre: r.nombre,
      Email: r.email,
      Universidad: r.universidad ?? "",
      "Tipo de Participante": r.tipo_participante === "estudiante" ? "Estudiante" : "Profesional",
      "Fecha de Registro": new Date(r.fecha_registro).toLocaleString("es-CO"),
      Evento: r.evento
    }))

    const xml = buildExcelXml(rows)
    const buffer = new TextEncoder().encode(xml)

    const { error: bucketError } = await supabase.storage.getBucket(BUCKET)
    if (bucketError) {
      await supabase.storage.createBucket(BUCKET, { public: true })
    }

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(FILE, buffer, {
        contentType: "application/vnd.ms-excel",
        upsert: true
      })
    if (uploadError) throw uploadError

    console.log("Excel actualizado — " + registrations.length + " registros")
    return new Response("ok", { status: 200 })
  } catch (e) {
    console.error("Error generando Excel:", e)
    return new Response(e.message, { status: 500 })
  }
})
