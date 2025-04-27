// --------- Software SideMenu Logic ---------
const CLIENTE_SOFTWARES = [
  {name: "APP Fidelidade", icon: "#4A90E2", id: "sw1", url: "https://Hyzy-io.github.io/hotel-real/"},
  {name: "APP Onboard", icon: "#F77028", id: "sw2", url: "https://Hyzy-io.github.io/hotel-real/onboard"},
  {name: "Checkout Infinitepay", icon: "#7a31be", id: "sw3", url: "https://Hyzy-io.github.io/hotel-real/utilitarios/checkout-infinitepay.html"},
  {name: "Webhook reservas", icon: "#F77028", id: "sw4", url: "https://Hyzy-io.github.io/hotel-real/utilitarios/webhook-reservas-lista.html"},
  {name: "Central Técnica", icon: "#7a31be", id: "sw5", url: "https://Hyzy-io.github.io/hotel-real/utilitarios/central-tecnica"},
];

const softwaresOverlay = document.getElementById('softwaresOverlay');
const softwaresMenu = document.getElementById('softwaresMenu');
const openSoftwaresBtn = document.getElementById('openSoftwaresBtn');

function renderSoftwaresList() {
  softwaresMenu.innerHTML = `
    <button class="sidemenu-softwares-close" id="closeSoftwaresBtn" aria-label="Fechar lista de softwares">&times;</button>
    <h2 class="softwares-title"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>Seus Softwares</h2>
    <p class="softwares-description">Acesse e gerencie todos os seus produtos digitais</p>
    <ul class="cliente-softwares-list" id="clienteSoftwaresList"></ul>
  `;
  const clienteSoftwaresList = softwaresMenu.querySelector('#clienteSoftwaresList');
  CLIENTE_SOFTWARES.forEach(soft => {
    const li = document.createElement('li');
    li.className = "cliente-software-item";
    li.innerHTML = `
      <div class="sw-logo" style="background: ${soft.icon};">
        ${getSoftwareIcon(soft.name)}
      </div>
      <div class="sw-info">
        <a href="${soft.url}" target="_blank" rel="noopener" class="sw-title-link">
          <div class="sw-title">${soft.name}
            <svg class="sw-external-link" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </div>
        </a>
        <div class="sw-upload-wrap">
          <label for="sw-upload-${soft.id}" class="sw-upload-label" title="Upload arquivo para ${soft.name}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Upload
            <input type="file" id="sw-upload-${soft.id}" class="sw-upload-input" style="display:none" />
          </label>
          <span class="sw-upload-status" id="sw-upload-status-${soft.id}"></span>
        </div>
      </div>
    `;
    // Upload handler
    const fileInput = li.querySelector('.sw-upload-input');
    const uploadStatus = li.querySelector('.sw-upload-status');
    fileInput.addEventListener('change', (e) => {
      const file = fileInput.files[0];
      if (!file) return;
      uploadStatus.textContent = "Enviando...";
      uploadStatus.style.color = "#3072ff";
      setTimeout(() => {
        uploadStatus.textContent = `Arquivo "${file.name}" enviado!`;
        uploadStatus.style.color = "#34be31";
        setTimeout(() => { uploadStatus.textContent = ""; }, 3800);
      }, 1200);
    });
    clienteSoftwaresList.appendChild(li);
  });
  // Button close
  softwaresMenu.querySelector('#closeSoftwaresBtn').addEventListener('click', hideSoftwaresOverlay);
}

// Helper function to get appropriate icon for each software type
function getSoftwareIcon(softwareName) {
  const name = softwareName.toLowerCase();
  
  if (name.includes('site')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`;
  } else if (name.includes('cashback') || name.includes('app')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`;
  } else if (name.includes('admin') || name.includes('painel')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`;
  } else if (name.includes('blog')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`;
  } else if (name.includes('pet') || name.includes('delivery')) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`;
  } else {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect><circle cx="12" cy="12" r="2"></circle></svg>`;
  }
}

function showSoftwaresOverlay() {
  renderSoftwaresList();
  softwaresOverlay.classList.add('active');
  document.body.style.overflow = "hidden";
  // para acessibilidade (teclado focus)
  const clienteList = softwaresMenu.querySelector('#clienteSoftwaresList');
  clienteList && clienteList.focus();
}

function hideSoftwaresOverlay() {
  softwaresOverlay.classList.remove('active');
  document.body.style.overflow = "";
  // Try to restore focus
  openSoftwaresBtn && openSoftwaresBtn.focus();
}

softwaresOverlay.addEventListener('click', (e) => {
  if (e.target === softwaresOverlay) hideSoftwaresOverlay();
});

document.addEventListener('keydown', (e) => {
  if (softwaresOverlay.classList.contains('active') && e.key === "Escape") {
    hideSoftwaresOverlay();
  }
});

openSoftwaresBtn.addEventListener('click', showSoftwaresOverlay);
