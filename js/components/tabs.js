import { getById, queryAll } from '../utils.js';

export function initTabs() {
  const tabButtons = queryAll('.tab-btn');
  if (!tabButtons.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.dataset.tab;
      if (!tabId) return;

      const parent = button.closest('.program-container');
      if (!parent) return;

      parent.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      parent.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

      button.classList.add('active');
      const targetContent = parent.querySelector(`#${tabId}`);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}
