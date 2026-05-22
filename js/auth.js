document.addEventListener('DOMContentLoaded', async () => {
    const id = (str) => document.getElementById(str);

    const loginForm = id('loginForm');
    const loginMessage = id('loginMessage');
    const landingView = id('landingView');
    const dashboardView = id('dashboardView');
    const dashUserName = id('dashUserName');
    const loginModal = id('loginModal');
    const logoutBtn = id('logoutBtn');
    const userMenu = id('userMenu');
    const logoutDropdown = id('logoutDropdown');

    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        showDashboard(session.user);
    }

    supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
            showDashboard(session.user);
        } else if (event === 'SIGNED_OUT') {
            showLanding();
        }
    });

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = id('loginEmail').value.trim();
            const password = id('loginPassword').value;

            if (!email || !password) return;

            loginMessage.style.display = 'none';

            try {
                const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
                if (error) throw error;

                loginModal.classList.remove('active');
                loginForm.reset();
            } catch (err) {
                showLoginError(
                    err.message === 'Invalid login credentials'
                        ? 'Email o contraseña incorrectos.'
                        : err.message
                );
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await supabaseClient.auth.signOut();
        });
    }

    if (userMenu && logoutDropdown) {
        userMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            logoutDropdown.style.display = logoutDropdown.style.display === 'block' ? 'none' : 'block';
        });
        document.addEventListener('click', () => {
            logoutDropdown.style.display = 'none';
        });
    }

    function showDashboard(user) {
        if (landingView) landingView.style.display = 'none';
        if (dashboardView) {
            dashboardView.classList.remove('hidden');
            dashboardView.style.display = 'block';
        }
        if (dashUserName) {
            dashUserName.textContent = user.user_metadata?.nombre || user.email || 'Usuario';
        }
    }

    function showLanding() {
        if (landingView) landingView.style.display = '';
        if (dashboardView) {
            dashboardView.classList.add('hidden');
            dashboardView.style.display = '';
        }
    }

    function showLoginError(msg) {
        if (!loginMessage) return;
        loginMessage.textContent = msg;
        loginMessage.style.display = 'block';
        loginMessage.style.background = 'rgba(239,68,68,0.2)';
        loginMessage.style.color = '#dc2626';
        loginMessage.style.border = '1px solid #dc2626';
    }
});
