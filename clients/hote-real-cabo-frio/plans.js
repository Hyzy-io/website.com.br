// --------- PLANS LOGIC ---------
const plansSection = document.getElementById('plansSection');
const plansRoot = document.getElementById('plansRoot');
/* SPA navigation is handled by dashboard.js */

// Data
const PLANOS = [
  {
    key: 'free', label: 'Free', color: '#F77028', price: '0', period: '/mês',
    ideal: 'Iniciantes / Portfólios', features: [
      '1 projeto', '1 ambiente dev', 'Desenvolvimento CMD'
    ]
  },
  {
    key: 'scale', label: 'Scale', color: '#34be31', price: '99', period: '/mês',
    ideal: 'Devs e startups', features: [
      '3 projetos', '75k workunits', '3 bancos de dados', 'Monitoramento com IA', 
    ]
  },
  {
    key: 'enterprise', label: 'Enterprise AI', color: '#7a31be', price: 'Sob consulta', period: '',
    ideal: 'Empresas em escala / Agências grandes', features: [
      'Projetos ilimitados', 'Customizados',
    ]
  }
];
// Estado
let currentPlan = "free";
let selectedPlan = currentPlan;
let appliedCoupon = null;

// Used for focus restoration
let planList = null;
let msgBox = null;

function isMobile() {
  return window.matchMedia('(max-width: 900px)').matches;
}

function renderPlanList() {
  const ul = document.createElement('ul');
  ul.className = "plan-list";
  PLANOS.forEach(plano => {
    const li = document.createElement('li');
    li.className = `plan-list-item${selectedPlan===plano.key ? ' selected':''}${currentPlan===plano.key ? ' current':''}`;
    li.setAttribute('data-plan', plano.key);
    li.innerHTML = `
      <div class="list-indicator" style="background:${plano.color};"></div>
      <div class="list-label">${plano.label}</div>
      <div class="list-price">
        ${plano.price === 'Sob consulta' ? '<span class="sobconsulta">Sob consulta</span>' : `R$ <b>${plano.price}</b> <span>${plano.period}</span>`}
      </div>
      ${currentPlan===plano.key ? '<span class="badge-atual">Plano Atual</span>' : ''}
    `;
    li.tabIndex = 0;
    li.addEventListener('click', () => selectPlan(plano.key));
    li.addEventListener('keypress', e => { if(e.key==='Enter'||e.key===' ') { selectPlan(plano.key);} });
    ul.appendChild(li);
  });
  planList = ul;
  return ul;
}

function renderPlanDetail(plano, isMobileVer = false) {
  // Render detail box for plano
  const msgHtml = `
    <div class="plan-titlewrap" style="border-color:${plano.color}">
      <span class="plan-detail-title" style="color:${plano.color}">${plano.label}</span>
      ${currentPlan===plano.key ? `<span class="badge-atual-detalhe">Plano Atual</span>` : ''}
    </div>
    <div class="plan-detail-sub">${plano.ideal}</div>
    <ul class="plan-feature-list">
      ${plano.features.map(f=>`<li>${f}</li>`).join('')}
    </ul>
    <div class="plan-detail-price">
      ${plano.price === 'Sob consulta' ? '<span class="sobconsulta-preco">Sob consulta</span>' : `
        <span class="plan-preco-label">R$</span>
        <span class="plan-preco-main">${plano.price}</span>
        <span class="plan-preco-period">${plano.period}</span>
        ${appliedCoupon && selectedPlan!== 'free' ? `<span class="plan-cupom">-10%: R$${Math.floor(plano.price*0.9)}/${plano.period.replace('/','')}</span>` : ``}
      `}
    </div>
    <button class="plan-escolher-btn" ${currentPlan===plano.key ? 'disabled' : ''} id="escolherPlanoBtn">
      ${currentPlan===plano.key ? 'Plano Atual':'Selecionar este plano'}
    </button>
  `;
  const div = document.createElement('div');
  div.className = "plan-detail-box";
  div.innerHTML = msgHtml;
  // Add handler
  const btn = div.querySelector('.plan-escolher-btn');
  if(btn){
    btn.addEventListener('click', () => {
      if (plano.key === "scale") {
        window.open("https://buy.stripe.com/7sIaGA7ji7ibb7yfYY", "_blank");
        if(msgBox) {
          msgBox.textContent = "Estamos aguardando a confirmação do pagamento. Em breve atualizaremos seu plano.";
          msgBox.style.display = "block";
          msgBox.classList.remove("error");
          msgBox.classList.add("success");
        }
      } else if (plano.key === "enterprise") {
        window.location.href = "mailto:planos@hyzy.com.br";
      } else if (plano.key === "free") {
        window.location.href = "mailto:suporte@hyzy.com.br";
      } else {
        if(selectedPlan!==currentPlan){
          currentPlan = selectedPlan;
          rerenderAll();
          if(msgBox) {
            msgBox.textContent = `Plano alterado para "${plano.label}"${appliedCoupon ? " com desconto aplicado!":""}`;
            msgBox.style.display = "block";
            msgBox.classList.remove("error");
            msgBox.classList.add("success");
          }
        }
      }
    });
  }
  return div;
}

function renderPlansBody() {
  // Compose layout
  const area = document.createElement('div');
  area.className = "plans-body-wrap";
  // Header + Input
  const box = document.createElement('div');
  box.className = "subscription-listbox";
  box.innerHTML = `
    <div class="subscription-list-header">
      <h2>Planos</h2>
      <form class="coupon-form" autocomplete="off" onsubmit="return false;">
        <input 
          type="text" 
          id="couponInput" 
          placeholder="Adicionar cupom"
          aria-label="Adicionar cupom de desconto"
          maxlength="20"
        >
        <button type="button" class="coupon-btn" id="applyCouponBtn">Aplicar</button>
      </form>
      <div id="subscription-msg" class="subscription-msg" style="display:none"></div>
    </div>
  `;
  // Plans list
  box.appendChild(renderPlanList());
  // Details (for desktop)
  const detailArea = document.createElement('div');
  detailArea.className = "subscription-detail";
  detailArea.appendChild(renderPlanDetail(PLANOS.find(p=>p.key===selectedPlan)));
  area.appendChild(box);
  area.appendChild(detailArea);

  // Sidemenu mobile overlay
  const mobileOverlay = document.createElement('div');
  mobileOverlay.className = 'sidemenu-plan-detail-overlay';
  mobileOverlay.id = 'mobilePlanDetailOverlay';
  mobileOverlay.tabIndex = -1;
  mobileOverlay.setAttribute('aria-modal','true');
  mobileOverlay.setAttribute('aria-label','Detalhes do Plano');
  mobileOverlay.innerHTML = `
    <div class="sidemenu-plan-detail-menu" id="mobilePlanDetailMenu">
      <button class="sidemenu-plan-detail-close" id="mobileSidemenuClose" aria-label="Fechar detalhes do plano">
        &times;
      </button>
      <div id="mobilePlanDetailBox"></div>
    </div>
  `;
  area.appendChild(mobileOverlay);

  // Save important elements for event hookups
  setTimeout(() => { 
    msgBox = document.getElementById('subscription-msg');
    setupPlansEvents();
  }, 10);

  // Fix: Ensure full available height for content, but not clipped!
  area.style.width = '100%';
  area.style.minWidth = '0';

  return area;
}

function rerenderAll() {
  plansRoot.innerHTML = '';
  const body = renderPlansBody();
  plansRoot.appendChild(body);
  if(isMobile()) {
    document.querySelector('.subscription-detail').style.display = 'none';
  } else {
    document.querySelector('.subscription-detail').style.display = 'flex';
  }
}

function handleResize() {
  if(isMobile()) {
    document.querySelector('.subscription-detail').style.display = 'none';
  } else {
    // Hide overlay, show detail
    hideMobilePlanDetailMenu();
    document.querySelector('.subscription-detail').style.display = 'flex';
  }
}

function selectPlan(key) {
  selectedPlan = key;
  rerenderAll();
  if(isMobile()) {
    renderMobilePlanDetail();
    showMobilePlanDetailMenu();
    if(msgBox) msgBox.style.display = "none";
  } else {
    if(msgBox) msgBox.style.display = "none";
  }
}
function setupPlansEvents() {
  // Coupon
  const couponBtn = document.getElementById('applyCouponBtn');
  const couponInput = document.getElementById('couponInput');
  couponBtn.addEventListener('click', () => {
    const v = couponInput.value.trim();
    msgBox.style.display = "block";
    if(!v) {
      msgBox.textContent = "Digite um cupom válido.";
      msgBox.classList.add("error");
      msgBox.classList.remove("success");
      appliedCoupon = null;
      rerenderAll();
      return;
    }
    if(v.toLowerCase() === "super10") {
      appliedCoupon = v;
      msgBox.textContent = "Cupom aplicado: 10% de desconto!";
      msgBox.classList.add("success");
      msgBox.classList.remove("error");
    } else {
      appliedCoupon = null;
      msgBox.textContent = "Cupom inválido ou expirado.";
      msgBox.classList.add("error");
      msgBox.classList.remove("success");
    }
    rerenderAll();
  });
  // Mobile overlay: close buttons
  const mobileSidemenuClose = document.getElementById('mobileSidemenuClose');
  const mobilePlanDetailOverlay = document.getElementById('mobilePlanDetailOverlay');
  mobileSidemenuClose && mobileSidemenuClose.addEventListener('click', hideMobilePlanDetailMenu);
  mobilePlanDetailOverlay && mobilePlanDetailOverlay.addEventListener('click', (e)=>{
    if(e.target === mobilePlanDetailOverlay) hideMobilePlanDetailMenu();
  });
}

function renderMobilePlanDetail() {
  const plano = PLANOS.find(p=>p.key===selectedPlan);
  const mobilePlanDetailBox = document.getElementById('mobilePlanDetailBox');
  if(!mobilePlanDetailBox) return;
  mobilePlanDetailBox.innerHTML = renderPlanDetail(plano, true).innerHTML;
  // Add mobile button logic
  const btn = mobilePlanDetailBox.querySelector('.plan-escolher-btn');
  if(btn){
    btn.addEventListener('click', () => {
      if (plano.key === "scale") {
        window.open("https://buy.stripe.com/7sIaGA7ji7ibb7yfYY", "_blank");
        if(msgBox) {
          msgBox.textContent = "Estamos aguardando a confirmação do pagamento. Em breve atualizaremos seu plano.";
          msgBox.style.display = "block";
          msgBox.classList.remove("error");
          msgBox.classList.add("success");
        }
      } else if (plano.key === "enterprise") {
        window.location.href = "mailto:planos@hyzy.com.br";
      } else if (plano.key === "free") {
        window.location.href = "mailto:suporte@hyzy.com.br";
      } else {
        if(selectedPlan!==currentPlan){
          currentPlan = selectedPlan;
          rerenderAll();
          if(msgBox) {
            msgBox.textContent = `Plano alterado para "${plano.label}"${appliedCoupon ? " com desconto aplicado!":""}`;
            msgBox.style.display = "block";
            msgBox.classList.remove("error");
            msgBox.classList.add("success");
          }
        }
      }
    });
  }
}

function showMobilePlanDetailMenu() {
  const overlay = document.getElementById('mobilePlanDetailOverlay');
  if(overlay){
    overlay.classList.add('active');
    document.body.style.overflow = "hidden";
  }
}

function hideMobilePlanDetailMenu() {
  const overlay = document.getElementById('mobilePlanDetailOverlay');
  if(overlay){
    overlay.classList.remove('active');
    document.body.style.overflow = "";
    if(planList) planList.focus();
  }
}

window.addEventListener('resize', handleResize);

rerenderAll();
handleResize();