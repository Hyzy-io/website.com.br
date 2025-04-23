// --------- Dashboard Cards Logic ---------
const dashboardSection = document.getElementById('dashboardSection');
const navDashboard = document.getElementById('navDashboard');
const navPlans = document.getElementById('navPlans');
const plansSection = document.getElementById('plansSection');

function setNavPage(page) {
  document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
  if(page === 'dashboard') {
    navDashboard.classList.add('active');
    dashboardSection.style.display = '';
    plansSection.style.display = 'none';
  } else if(page === 'plans') {
    navPlans.classList.add('active');
    dashboardSection.style.display = 'none';
    plansSection.style.display = 'flex';
  }
}
navDashboard.addEventListener('click', () => setNavPage('dashboard'));
navPlans.addEventListener('click', () => setNavPage('plans'));
setNavPage('dashboard');

// Card data
const DASHBOARD_CARDS = [
  {
    key: "softwares",
    iconClass: "purple-bg",
    iconSVG: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="7" width="20" height="16" rx="5" fill="#7a31be"/>
      <rect x="10" y="11" width="12" height="8" rx="3" fill="#fff"/>
      <path d="M19.2 25.3a3 3 0 0 1-6.4 0h6.4Z" fill="#7a31be"/>
    </svg>`,
    title: "Softwares",
    description: "Gerencie todos os softwares contratados e realize uploads rápidos de arquivos.",
    btnLabel: "Ver todos",
    btnId: "openSoftwaresBtn",
    enabled: true,
  },
  {
    key: "payments",
    iconClass: "orange-bg",
    iconSVG: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="10" width="24" height="14" rx="3" fill="#F77028"/>
      <rect x="10" y="14" width="12" height="6" rx="2" fill="#fff"/>
      <path d="M22 10V8c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v2" stroke="#fff" stroke-width="1.3"/>
    </svg>`,
    title: "Pagamentos",
    description: "Administre planos, faturas e recebimentos de seu sistema de hospedagem.",
    btnLabel: "Gerenciar Pagamentos",
    btnId: null,
    enabled: false,
  },
  {
    key: "cashback",
    iconClass: "blue-bg",
    iconSVG: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" fill="#F77028"/>
      <text x="16" y="22" text-anchor="middle" font-family="Inter,sans-serif" font-size="18" fill="#fff" font-weight="700">%</text>
    </svg>`,
    title: "Pontos/Cashback",
    description: "Gerencie o aplicativo de pontos dos usuários para trocas e cashback.",
    btnLabel: "Gerenciar Pontos",
    btnId: null,
    enabled: false,
  },
];

function renderDashboardCards() {
  dashboardSection.innerHTML = '';
  DASHBOARD_CARDS.forEach(card => {
    const div = document.createElement('div');
    div.className = "card" + (card.key === "softwares" ? " softwares-card" : "");
    div.innerHTML = `
      <div class="card-icon ${card.iconClass}">
        ${card.iconSVG}
      </div>
      <h2>${card.title}</h2>
      <p>${card.description}</p>
      <button class="card-btn" 
        ${card.btnId ? `id="${card.btnId}"` : ''}
        ${card.enabled ? '' : 'style="pointer-events:none; opacity:0.67; cursor:not-allowed;"'}>
        ${card.btnLabel}
      </button>
    `;
    dashboardSection.appendChild(div);
  });
}
renderDashboardCards();

// --------- NAVIGATION tombstone ---------
// removed all SPA logic from here, kept only what is relevant for dashboard