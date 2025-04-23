const root = document.documentElement;
const icon = document.getElementById('themeIcon');
const btn = document.getElementById('toggleTheme');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('admin_theme', theme);

  if (theme === "dark") {
    icon.innerHTML = `<circle cx="14" cy="14" r="9" fill="#F77028"/>
      <path d="M14 5a1 1 0 0 1 0-2m0 22a1 1 0 0 1 0 2m9-9a1 1 0 0 1 2 0m-22 0a1 1 0 1 1-2 0m16.97-7.03a1 1 0 1 1 1.41-1.41m0 16.97a1 1 0 1 1-1.41 1.41m-9.9-16.97a1 1 0 0 1-1.41-1.41m0 16.97a1 1 0 0 1 1.41 1.41"
      stroke="#FFF" stroke-width="1.4"
      stroke-linecap="round" stroke-linejoin="round"/>`;
  } else {
    icon.innerHTML = `<circle cx="14" cy="14" r="9" stroke="#F77028" stroke-width="2" fill="none"/>
      <path d="M14 5a9 9 0 0 0 0 18V5z" fill="#F77028"/>
      <circle cx="14" cy="14" r="9" stroke="#F77028" stroke-width="2" fill="none"/>`
  }
}

btn.addEventListener('click', () => {
  const curr = document.documentElement.getAttribute('data-theme');
  setTheme(curr === 'dark' ? 'light' : 'dark');
});

// Carrega o tema salvo ou preferecia do SO
let theme = localStorage.getItem('admin_theme');
if (!theme) {
  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
setTheme(theme);

