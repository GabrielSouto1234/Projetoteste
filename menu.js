// ============================================
// MENU.JS - SEM ALERTS XML 17/10/2025
// ✅ SELECIONAR = UPLOAD + FECHAR SILENCIOSO
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // ✅ TODOS OS ELEMENTOS
  const sidebar = document.getElementById('sidebar');
  const closeSidebarBtn = document.getElementById('closeSidebarBtn');
  const recebidoList = document.getElementById('recebidoList');
  const placaList = document.getElementById('placaList');
  const separadoList = document.getElementById('separadoList');
  const expedidoList = document.getElementById('expedidoList');
  const searchRecebido = document.getElementById('searchRecebido');
  const searchPlaca = document.getElementById('searchPlaca');
  const searchSeparado = document.getElementById('searchSeparado');
  const searchExpedido = document.getElementById('searchExpedido');
  const inserirPedidoModal = document.getElementById('inserirPedidoModal');
  const insertPedidoBtn = document.getElementById('insertPedidoBtn');
  const loginModal = document.getElementById('loginModal');
  const loginButton = document.getElementById('loginButton');
  const closeLoginModal = document.getElementById('closeLoginModal');
  const closeInserirModal = document.getElementById('closeInserirModal');
  const detalhesPedidoModal = document.getElementById('detalhesPedidoModal');
  const detalhesPedidoContent = document.getElementById('detalhesPedidoContent');
  const numeroPedido = document.getElementById('numeroPedido');
  const seriePedido = document.getElementById('seriePedido');
  const nomeCliente = document.getElementById('nomeCliente');
  const dataChegada = document.getElementById('dataChegada');
  const tatuFlag = document.getElementById('tatuFlag');
  const gkFlag = document.getElementById('gkFlag');
  const addPedidoBtn = document.getElementById('addPedidoBtn');
  const cdCount = document.getElementById('cdCount');
  const placaCount = document.getElementById('placaCount');
  const expedidoCount = document.getElementById('expedidoCount');
  const toggleThemeBtn = document.getElementById('toggleThemeBtn');
  const toggleParticlesBtn = document.getElementById('toggleParticlesBtn');
  const particlesContainer = document.getElementById('particles-js');
  const chatbotButton = document.getElementById('chatbot-button');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const loginUser = document.getElementById('loginUser');
  const loginPass = document.getElementById('loginPass');
  const xmlFileInput = document.getElementById('xmlFileInput');
  const deleteAllBtn = document.getElementById('deleteAllBtn');
  const deleteModal = document.getElementById('deleteModal');
  const deleteModalContent = document.getElementById('deleteModalContent');
  
  // ✅ CONTAGEM CARDS
  const recebidoCardCount = document.getElementById('recebidoCount');
  const placaCardCount = document.getElementById('placaCardCount');
  const separadoCardCount = document.getElementById('separadoCount');
  const expedidoCardCount = document.getElementById('expedidoCardCount');

  if (xmlFileInput) xmlFileInput.multiple = true;
  let logado = sessionStorage.getItem('logado') === 'true';
  let particlesActive = localStorage.getItem('particlesActive') === 'true';

  // ============================================
  // ✅ UTILITÁRIOS
  // ============================================
  function getAnoAtual() { return new Date().getFullYear(); }
  function sanitizeInput(input) { if (!input) return ''; const div = document.createElement('div'); div.textContent = input; return div.innerHTML; }
  function isValidDate(dateStr) { return dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !isNaN(new Date(dateStr).getTime()); }
  function debounce(func, wait) { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), wait); }; }
  function formatarDataBrasileira(dataISO) { if (!dataISO) return ''; const data = new Date(dataISO); const dia = String(data.getDate()).padStart(2, '0'); const mes = String(data.getMonth() + 1).padStart(2, '0'); const ano = data.getFullYear(); return `${dia}/${mes}/${ano}`; }
  function converterDataBrasilParaISO(dataBrasil) { 
    if (!dataBrasil) return null; 
    if (dataBrasil.match(/^\d{1,2}\/[a-z]{3}$/i)) { 
      const meses = {'jan':'01','fev':'02','mar':'03','abr':'04','mai':'05','jun':'06','jul':'07','ago':'08','set':'09','out':'10','nov':'11','dez':'12'}; 
      const [dia, mes] = dataBrasil.split('/'); 
      const anoAtual = getAnoAtual(); 
      const mesNum = meses[mes.toLowerCase()]; 
      if (mesNum) return `${anoAtual}-${mesNum}-${dia.padStart(2, '0')}`; 
    } 
    const [dd, mm, aaaa] = dataBrasil.split('/'); 
    if (dd && mm && aaaa) return `${aaaa}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`; 
    return null; 
  }

  // ✅ LOGO POR DÍGITOS
  function getLogoPorDigitos(numeroCompleto) { 
    const match = numeroCompleto.match(/^(\d+)[\/\-]/); 
    if (match) { 
      const digitos = match[1]; 
      return digitos.length === 4 ? 'logogk.png' : 'logotatu.png'; 
    } 
    return numeroCompleto.length === 4 ? 'logogk.png' : 'logotatu.png'; 
  }
  function getFlagTextPorDigitos(numeroCompleto) { 
    const match = numeroCompleto.match(/^(\d+)[\/\-]/); 
    if (match) { 
      const digitos = match[1]; 
      return digitos.length === 4 ? 'GK' : 'TATU'; 
    } 
    return numeroCompleto.length === 4 ? 'GK' : 'TATU'; 
  }

  // ============================================
  // ✅ PARTICULAS
  // ============================================
  function initParticles() {
    particlesContainer.innerHTML = ''; // Clear previous particles
    if (typeof particlesJS === 'undefined') return;
    const isLight = document.body.classList.contains('light');
    const particleColor = isLight ? '#000000' : '#ffffff';
    const lineColor = isLight ? '#000000' : '#ffffff';
    const config = {
      particles: { number: { value: 80 }, color: { value: particleColor }, shape: { type: "circle" }, opacity: { value: 0.5 }, size: { value: 3 }, line_linked: { enable: true, distance: 150, color: lineColor, opacity: 0.4 }, move: { enable: true, speed: 6 } },
      interactivity: { events: { onhover: { enable: true, mode: "repulse" } }, modes: { repulse: { distance: 100 } } },
      retina_detect: true
    };
    particlesJS('particles-js', config);
    if (particlesActive) particlesContainer.classList.add('active');
  }

  if (toggleParticlesBtn) {
    toggleParticlesBtn.addEventListener('click', () => {
      particlesActive = !particlesActive;
      localStorage.setItem('particlesActive', particlesActive);
      particlesContainer.classList.toggle('active', particlesActive);
      toggleParticlesBtn.classList.toggle('active', particlesActive);
      toggleParticlesBtn.textContent = particlesActive ? '💫' : '✨';
    });
    toggleParticlesBtn.textContent = particlesActive ? '💫' : '✨';
    toggleParticlesBtn.classList.toggle('active', particlesActive);
  }

  // ============================================
  // ✅ CONTAGEM ANIMADA
  // ============================================
  function animateCount(element, target) {
    if (!element) return;
    element.style.animation = 'none';
    setTimeout(() => {
      element.textContent = target;
      element.style.animation = 'countUp 0.8s ease-out';
    }, 10);
  }

  function atualizarContagens() {
    const recebido = recebidoList?.getElementsByClassName('pedido-item').length || 0;
    const placa = placaList?.getElementsByClassName('pedido-item').length || 0;
    const separado = separadoList?.getElementsByClassName('pedido-item').length || 0;
    const expedido = expedidoList?.getElementsByClassName('pedido-item').length || 0;
    
    animateCount(cdCount, recebido);
    animateCount(placaCount, placa);
    animateCount(expedidoCount, expedido);
    animateCount(recebidoCardCount, recebido);
    animateCount(placaCardCount, placa);
    animateCount(separadoCardCount, separado);
    animateCount(expedidoCardCount, expedido);
    
    savePedidos();
  }

  // ============================================
  // ✅ UPLOAD XML - SILENCIOSO 100%
  // ============================================
  xmlFileInput?.addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // ✅ FECHAR MODAL IMEDIATAMENTE
    inserirPedidoModal.classList.remove('show');
    e.target.value = ''; // Limpar input

    let totalAdicionados = 0;

    // ✅ PROCESSAR CADA ARQUIVO SILENCIOSAMENTE
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          const xml = evt.target.result;
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xml, "text/xml");

          // ✅ EXTRAIR DADOS DO XML
          const numeroPedidoStr = xmlDoc.querySelector('NumeroPedido')?.textContent || '';
          let numero = '0000', serie = '0';
          const parts = numeroPedidoStr.split('/').map(str => str.trim());
          if (parts.length >= 2) {
            numero = parts[0];
            serie = parts[1];
          } else {
            numero = numeroPedidoStr.trim();
          }

          const cliente = xmlDoc.querySelector('NomeCliente')?.textContent || 'Cliente';
          const chegadaBrasil = xmlDoc.querySelector('DataChegada')?.textContent || '';
          const separacaoBrasil = xmlDoc.querySelector('DataSeparacao')?.textContent || '';
          const observacao = xmlDoc.querySelector('Observacao')?.textContent || null;
          const transportadora = xmlDoc.querySelector('Transportadora')?.textContent || null;
          const dataColetaBrasil = xmlDoc.querySelector('DataColeta')?.textContent || '';

          const chegada = converterDataBrasilParaISO(chegadaBrasil) || new Date().toISOString().split('T')[0];
          const separacao = converterDataBrasilParaISO(separacaoBrasil);
          const dataColeta = converterDataBrasilParaISO(dataColetaBrasil);

          let volume = 'Total';
          if (observacao && observacao.toUpperCase().includes('PLACA')) {
            volume = 'Parcial';
          }

          const pedidoData = {
            numero, serie, cliente, chegada, flag: getFlagTextPorDigitos(`${numero}/${serie}`),
            separacao, volume, observacao, transportadora, dataColeta
          };

          // ✅ ADICIONAR PEDIDO SILENCIOSAMENTE
          const item = createPedidoItem(pedidoData);
          getListForPedido(pedidoData)?.appendChild(item);
          totalAdicionados++;
          atualizarContagens();

        } catch(err) {
          console.error('❌ Erro ao processar XML:', file.name, err);
        }
      };
      reader.readAsText(file);
    });

    // ✅ APENAS UM ALERT FINAL (OPCIONAL - COMENTADO)
    // setTimeout(() => {
    //   if (totalAdicionados > 0) {
    //     console.log(`✅ ${totalAdicionados} pedidos adicionados silenciosamente!`);
    //   }
    // }, 1000);
  });

  // ============================================
  // CRUD PEDIDOS
  // ============================================
  function savePedidos() { 
    const pedidos = []; 
    [recebidoList, placaList, separadoList, expedidoList].forEach(list => { 
      Array.from(list?.getElementsByClassName('pedido-item') || []).forEach(item => { 
        pedidos.push(JSON.parse(item.dataset.pedido)); 
      }); 
    }); 
    localStorage.setItem('pedidos', JSON.stringify(pedidos)); 
  }

  function loadPedidos() { 
    const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]'); 
    pedidos.forEach(pedidoData => { 
      const item = createPedidoItem(pedidoData); 
      getListForPedido(pedidoData)?.appendChild(item); 
    }); 
    atualizarContagens(); 
  }

  function formatarDisplayPedido(pedidoData) { 
    if (pedidoData.transportadora && pedidoData.dataColeta && pedidoData.serie === '0') { 
      return pedidoData.numero; 
    } 
    return `${pedidoData.numero}/${pedidoData.serie}`; 
  }

  function createPedidoItem(pedidoData) {
    const item = document.createElement('div');
    item.className = `pedido-item ${pedidoData.volume === 'Parcial' ? 'parcial bg-orange-500/20 border-orange-700/50' : 'total bg-green-600/20 border-yellow-400/50'} flex items-start justify-between p-2 rounded-lg text-white cursor-pointer border-2 hover:bg-blue-500/20 text-sm`;
    item.dataset.pedido = JSON.stringify(pedidoData);
    
    const displayNumero = formatarDisplayPedido(pedidoData);
    const logoSrc = getLogoPorDigitos(displayNumero);
    const flagText = getFlagTextPorDigitos(displayNumero);
    
    const flagSpan = document.createElement('span'); 
    flagSpan.className = 'flag-label px-1 py-1 rounded font-semibold flex-shrink-0';
    const imgFlag = document.createElement('img'); 
    imgFlag.src = logoSrc;
    imgFlag.className = 'h-4 w-4';
    flagSpan.appendChild(imgFlag);
    
    const text = document.createElement('span'); 
    text.className = 'whitespace-normal break-words flex-1 ml-1 text-xs'; 
    text.textContent = displayNumero;
    
    if (pedidoData.volume === 'Parcial') { 
      const symbol = document.createElement('span'); 
      symbol.className = 'attention-symbol ml-1 text-xs'; 
      symbol.textContent = '⚠️'; 
      item.appendChild(symbol); 
    }
    
    item.append(flagSpan, text);
    item.addEventListener('click', (e) => abrirDetalhesPedido(item, getOrigem(item)));
    return item;
  }

  function getListForPedido(pedidoData) { 
    if (pedidoData.transportadora && pedidoData.dataColeta) return expedidoList; 
    if (pedidoData.volume === 'Parcial') return placaList;
    if (pedidoData.separacao) return separadoList; 
    return recebidoList; 
  }

  function getOrigem(item) { 
    if (recebidoList?.contains(item)) return 'recebido'; 
    if (placaList?.contains(item)) return 'placa'; 
    if (separadoList?.contains(item)) return 'separado'; 
    if (expedidoList?.contains(item)) return 'expedido'; 
    return null; 
  }

  function moverPedido(item, novaLista) {
    const origem = getOrigem(item);
    if (origem) {
      item.parentNode.removeChild(item);
      novaLista.appendChild(item);
      atualizarContagens();
    }
  }

  // ============================================
  // MODAIS
  // ============================================
  function createModal(id, contentId) {
    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="modal-content bg-gray-900 p-6 rounded-lg max-w-md w-full relative">
        <span class="close absolute top-2 right-2 text-gray-400 cursor-pointer">&times;</span>
        <div id="${contentId}"></div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.close').addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('show'); });
    return modal;
  }

  // Criar modais dinamicamente se não existirem
  const progressModal = document.getElementById('progressModal') || createModal('progressModal', 'progressContent');
  const progressContent = document.getElementById('progressContent');
  const placaObsModal = document.getElementById('placaObsModal') || createModal('placaObsModal', 'placaObsContent');
  const placaObsContent = document.getElementById('placaObsContent');
  const dataSeparacaoModal = document.getElementById('dataSeparacaoModal') || createModal('dataSeparacaoModal', 'dataSeparacaoContent');
  const dataSeparacaoContent = document.getElementById('dataSeparacaoContent');
  const expedidoModal = document.getElementById('expedidoModal') || createModal('expedidoModal', 'expedidoContent');
  const expedidoContent = document.getElementById('expedidoContent');
  const dataEditModal = document.getElementById('dataEditModal') || createModal('dataEditModal', 'dataEditContent');
  const dataEditContent = document.getElementById('dataEditContent');

  function showProgressModal(pedidoData, item) {
    progressContent.innerHTML = `
      <h2 class="text-2xl font-bold mb-4 text-center text-blue-400">Prosseguir Pedido</h2>
      <div class="flex flex-col gap-4">
        <label class="flex items-center">
          <input type="radio" name="volume" value="Total" class="mr-2"> Total
        </label>
        <label class="flex items-center">
          <input type="radio" name="volume" value="Placa" class="mr-2"> Placa
        </label>
        <button id="confirmProgress" class="bg-blue-500 text-white p-3 rounded hover:bg-blue-600">Confirmar</button>
      </div>
    `;
    progressModal.classList.add('show');

    document.getElementById('confirmProgress').addEventListener('click', () => {
      const selected = document.querySelector('input[name="volume"]:checked');
      if (!selected) return alert('❌ Selecione uma opção!');
      progressModal.classList.remove('show');
      if (selected.value === 'Placa') {
        pedidoData.volume = 'Parcial';
        showPlacaObsModal(pedidoData, item);
      } else {
        pedidoData.volume = 'Total';
        showDataSeparacaoModal(pedidoData, item, 'separado');
      }
    });
  }

  function showPlacaObsModal(pedidoData, item) {
    placaObsContent.innerHTML = `
      <h2 class="text-2xl font-bold mb-4 text-center text-orange-400">Observação</h2>
      <textarea id="observacaoInput" placeholder="Digite a observação..." class="w-full p-3 mb-3 rounded border bg-gray-700 text-white"></textarea>
      <button id="confirmObs" class="bg-orange-500 text-white p-3 rounded hover:bg-orange-600">OK</button>
    `;
    placaObsModal.classList.add('show');

    document.getElementById('confirmObs').addEventListener('click', () => {
      const obs = sanitizeInput(document.getElementById('observacaoInput').value);
      pedidoData.observacao = obs;
      placaObsModal.classList.remove('show');
      // Definir data de separação automaticamente para hoje
      pedidoData.separacao = new Date().toISOString().split('T')[0];
      item.parentNode.removeChild(item);
      const newItem = createPedidoItem(pedidoData);
      placaList.appendChild(newItem);
      atualizarContagens();
    });
  }

  function showDataSeparacaoModal(pedidoData, item, destino) {
    dataSeparacaoContent.innerHTML = `
      <h2 class="text-2xl font-bold mb-4 text-center text-green-400">Data de Separação</h2>
      <input type="date" id="dataSeparacaoInput" class="w-full p-3 mb-3 rounded border bg-gray-700 text-white">
      <button id="confirmDataSeparacao" class="bg-green-500 text-white p-3 rounded hover:bg-green-600">Confirmar</button>
    `;
    dataSeparacaoModal.classList.add('show');

    document.getElementById('confirmDataSeparacao').addEventListener('click', () => {
      const dataSep = document.getElementById('dataSeparacaoInput').value;
      if (!isValidDate(dataSep)) return alert('❌ Data inválida!');
      pedidoData.separacao = dataSep;
      dataSeparacaoModal.classList.remove('show');
      item.parentNode.removeChild(item);
      const newItem = createPedidoItem(pedidoData);
      const novaLista = destino === 'placa' ? placaList : separadoList;
      novaLista.appendChild(newItem);
      atualizarContagens();
    });
  }

  function showPlacaToSeparadoModal(pedidoData, item) {
    showExpedidoModal(pedidoData, item);
  }

  function showExpedidoModal(pedidoData, item) {
    expedidoContent.innerHTML = `
      <h2 class="text-2xl font-bold mb-4 text-center text-green-400">Expedir Pedido</h2>
      <label class="block mb-2">Data de Coleta</label>
      <input type="date" id="dataColetaInput" class="w-full p-3 mb-3 rounded border bg-gray-700 text-white">
      <label class="block mb-2">Transportadora</label>
      <input type="text" id="transportadoraInput" placeholder="Nome da transportadora" class="w-full p-3 mb-3 rounded border bg-gray-700 text-white">
      <button id="confirmExpedido" class="bg-green-500 text-white p-3 rounded hover:bg-green-600">Confirmar</button>
    `;
    expedidoModal.classList.add('show');

    document.getElementById('confirmExpedido').addEventListener('click', () => {
      const dataColeta = document.getElementById('dataColetaInput').value;
      const transportadora = sanitizeInput(document.getElementById('transportadoraInput').value);
      if (!isValidDate(dataColeta) || !transportadora) return alert('❌ Preencha data e transportadora!');
      pedidoData.dataColeta = dataColeta;
      pedidoData.transportadora = transportadora;
      expedidoModal.classList.remove('show');
      item.parentNode.removeChild(item);
      const newItem = createPedidoItem(pedidoData);
      expedidoList.appendChild(newItem);
      atualizarContagens();
    });
  }

  function showDataEditModal(pedidoData, item) {
    dataEditContent.innerHTML = `
      <h2 class="text-2xl font-bold mb-4 text-center text-blue-400">Editar Datas</h2>
      <label class="block mb-2">Data de Chegada</label>
      <input type="date" id="editChegada" value="${pedidoData.chegada || ''}" class="w-full p-3 mb-3 rounded border bg-gray-700 text-white">
      <label class="block mb-2">Data de Separação</label>
      <input type="date" id="editSeparacao" value="${pedidoData.separacao || ''}" class="w-full p-3 mb-3 rounded border bg-gray-700 text-white">
      <button id="confirmEditDatas" class="bg-blue-500 text-white p-3 rounded hover:bg-blue-600">Salvar</button>
    `;
    dataEditModal.classList.add('show');

    document.getElementById('confirmEditDatas').addEventListener('click', () => {
      const chegada = document.getElementById('editChegada').value;
      const separacao = document.getElementById('editSeparacao').value;
      if ((chegada && !isValidDate(chegada)) || (separacao && !isValidDate(separacao))) {
        return alert('❌ Datas inválidas!');
      }
      pedidoData.chegada = chegada || pedidoData.chegada;
      pedidoData.separacao = separacao || null;
      if (!pedidoData.separacao) {
        if (pedidoData.observacao && pedidoData.observacao.toUpperCase().includes('PLACA')) {
          pedidoData.volume = 'Parcial';
        } else {
          pedidoData.volume = 'Total';
        }
      }
      dataEditModal.classList.remove('show');
      item.parentNode.removeChild(item);
      const newItem = createPedidoItem(pedidoData);
      getListForPedido(pedidoData).appendChild(newItem);
      atualizarContagens();
      abrirDetalhesPedido(newItem, getOrigem(newItem));
    });
  }

  function abrirDetalhesPedido(item, origem) {
    const pedidoData = JSON.parse(item.dataset.pedido);
    const displayNumero = formatarDisplayPedido(pedidoData);
    const logoSrc = getLogoPorDigitos(displayNumero);
    const flagText = getFlagTextPorDigitos(displayNumero);

    detalhesPedidoContent.innerHTML = `
      <div class="relative mb-6">
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-2">📋 Pedido ${displayNumero}</h2>
          <span class="status-badge ${origem === 'expedido' ? 'bg-green-600' : origem === 'placa' ? 'bg-orange-600' : origem === 'separado' ? 'bg-blue-600' : 'bg-gray-600'} text-white">
            ${origem === 'expedido' ? '✅ EXPEDIDO' : origem === 'placa' ? '⚠️ PLACA' : origem === 'separado' ? '✅ SEPARADO' : '📦 RECEBIDO'}
          </span>
        </div>
        <div class="flex items-center justify-center mt-4">
          <img src="${logoSrc}" class="h-12" alt="${flagText}">
          <span class="ml-3 text-lg font-semibold">${flagText}</span>
        </div>
      </div>
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-dot bg-blue-500"></div>
          <div class="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
            <div><h3 class="font-bold text-blue-400">📦 RECEBIDO NO CD</h3><p class="text-sm text-gray-300">${formatarDataBrasileira(pedidoData.chegada)}</p></div>
            <div class="text-right"><p class="font-semibold">${pedidoData.cliente}</p></div>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-dot ${pedidoData.separacao ? 'bg-green-500' : 'bg-gray-500'}"></div>
          <div class="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
            <div>
              <h3 class="font-bold ${pedidoData.separacao ? (pedidoData.volume === 'Parcial' ? 'text-orange-400' : 'text-green-400') : 'text-gray-400'}">
                ${pedidoData.separacao ? (pedidoData.volume === 'Parcial' ? '⚠️ PLACA' : '✅ SEPARAÇÃO TOTAL') : '⏳ AGUARDANDO SEPARAÇÃO'}
              </h3>
              <p class="text-sm ${pedidoData.separacao ? 'text-gray-300' : 'text-gray-500'}">${pedidoData.separacao ? formatarDataBrasileira(pedidoData.separacao) : '---'}</p>
            </div>
            ${pedidoData.volume === 'Parcial' ? '<div class="text-right"><span class="text-orange-400 font-bold">Volume Parcial</span></div>' : ''}
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-dot ${pedidoData.dataColeta ? 'bg-green-600' : 'bg-gray-500'}"></div>
          <div class="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
            <div>
              <h3 class="font-bold ${pedidoData.dataColeta ? 'text-green-400' : 'text-gray-400'}">
                ${pedidoData.dataColeta ? '🚚 EXPEDIDO' : '⏳ AGUARDANDO EXPEDIÇÃO'}
              </h3>
              <p class="text-sm ${pedidoData.dataColeta ? 'text-gray-300' : 'text-gray-500'}">${pedidoData.dataColeta ? formatarDataBrasileira(pedidoData.dataColeta) : '---'}</p>
            </div>
            ${pedidoData.transportadora ? `<div class="text-right"><p class="font-semibold">${pedidoData.transportadora}</p></div>` : ''}
          </div>
        </div>
      </div>
      ${pedidoData.observacao ? `<div class="mt-6 p-4 bg-blue-900/50 rounded-lg border border-blue-500"><h3 class="font-bold text-blue-300 mb-2">📝 OBSERVAÇÃO</h3><p class="text-blue-100">${pedidoData.observacao}</p></div>` : ''}
      ${logado ? `
        <div class="btns-container mt-8 grid grid-cols-4 gap-3">
          <button id="btnEditarDatas" class="btn-compact btn-data" title="Editar Datas"><i class="fas fa-calendar-alt"></i></button>
          ${origem !== 'expedido' ? '<button id="btnProseguir" class="btn-compact btn-prosseguir" title="Prosseguir"><i class="fas fa-arrow-right"></i></button>' : ''}
          <button id="btnObservacao" class="btn-compact btn-obs" title="Observação"><i class="fas fa-edit"></i></button>
          <button id="btnCancelar" class="btn-compact btn-cancelar" title="Cancelar"><i class="fas fa-trash"></i></button>
        </div>
      ` : ''}
    `;

    detalhesPedidoModal.classList.add('show');
    detalhesPedidoModal.onclick = (e) => { if (e.target === detalhesPedidoModal) detalhesPedidoModal.classList.remove('show'); };

    if (logado) {
      document.getElementById('btnEditarDatas').onclick = () => { detalhesPedidoModal.classList.remove('show'); showDataEditModal(pedidoData, item); };
      const btnProseguir = document.getElementById('btnProseguir');
      if (btnProseguir) {
        btnProseguir.onclick = () => { 
          detalhesPedidoModal.classList.remove('show'); 
          if (origem === 'recebido') showProgressModal(pedidoData, item); 
          else if (origem === 'placa') showPlacaToSeparadoModal(pedidoData, item); 
          else if (origem === 'separado') showExpedidoModal(pedidoData, item); 
        };
      }
      document.getElementById('btnObservacao').onclick = () => { 
        const novaObs = prompt('📝 Digite nova observação:', pedidoData.observacao || ''); 
        if (novaObs !== null) { 
          pedidoData.observacao = sanitizeInput(novaObs); 
          item.parentNode.removeChild(item);
          const newItem = createPedidoItem(pedidoData);
          getListForPedido(pedidoData).appendChild(newItem);
          savePedidos(); 
          abrirDetalhesPedido(newItem, origem); 
        } 
      };
      document.getElementById('btnCancelar').onclick = () => { 
        if(confirm(`❌ Cancelar pedido ${displayNumero}?`)) { 
          item.parentNode.removeChild(item); 
          atualizarContagens(); 
          detalhesPedidoModal.classList.remove('show');
        } 
      };
    }
  }

  // ============================================
  // FILTRO & EVENTOS
  // ============================================
  function filtrarPedidos(lista, searchTerm) { 
    Array.from(lista?.getElementsByClassName('pedido-item') || []).forEach(item => { 
      const pedidoData = JSON.parse(item.dataset.pedido || '{}'); 
      const displayText = formatarDisplayPedido(pedidoData); 
      item.style.display = displayText.toLowerCase().includes(searchTerm.toLowerCase()) ? '' : 'none'; 
    }); 
  }

  // Event Listeners
  closeSidebarBtn?.addEventListener('click', () => sidebar?.classList.add('-translate-x-full'));
  closeLoginModal?.addEventListener('click', () => loginModal?.classList.remove('show'));
  closeInserirModal?.addEventListener('click', () => inserirPedidoModal?.classList.remove('show'));

  [searchRecebido, searchPlaca, searchSeparado, searchExpedido].forEach((search, i) => {
    const lists = [recebidoList, placaList, separadoList, expedidoList];
    search?.addEventListener('input', debounce(() => { filtrarPedidos(lists[i], search.value); atualizarContagens(); }, 300));
  });

  loginButton?.addEventListener('click', () => {
    if (loginUser?.value === 'admin' && loginPass?.value === 'adminmatrix') {
      logado = true; sessionStorage.setItem('logado', 'true'); loginModal?.classList.remove('show'); inserirPedidoModal?.classList.add('show');
    } else { alert('❌ Usuário ou senha incorretos!'); }
  });

  insertPedidoBtn?.addEventListener('click', () => { 
    if (logado) { inserirPedidoModal?.classList.add('show'); } else { loginModal?.classList.add('show'); } 
  });

  addPedidoBtn?.addEventListener('click', () => {
    if (!numeroPedido?.value || !seriePedido?.value || !nomeCliente?.value || !dataChegada?.value || (!tatuFlag?.checked && !gkFlag?.checked)) { 
      return alert('❌ Preencha todos os campos!'); 
    }
    if (!isValidDate(dataChegada.value)) { 
      return alert('❌ Data inválida!'); 
    }
    const pedidoData = { 
      numero: sanitizeInput(numeroPedido.value), 
      serie: sanitizeInput(seriePedido.value), 
      cliente: sanitizeInput(nomeCliente.value), 
      chegada: dataChegada.value, 
      flag: tatuFlag.checked ? 'TATU' : 'GK', 
      separacao: null, 
      volume: 'Total', 
      observacao: null, 
      transportadora: null, 
      dataColeta: null 
    };
    recebidoList?.appendChild(createPedidoItem(pedidoData)); 
    atualizarContagens(); 
    inserirPedidoModal?.classList.remove('show'); 
    numeroPedido.value = seriePedido.value = nomeCliente.value = ''; 
    dataChegada.value = ''; 
    tatuFlag.checked = gkFlag.checked = false;
  });

  // Delete All
  deleteAllBtn?.addEventListener('click', () => {
    deleteModal.classList.add('show');
    deleteModalContent.innerHTML = `
      <h2 class="text-2xl font-bold mb-4 text-center text-blue-400">Login para Apagar</h2>
      <input id="deleteLoginUser" placeholder="Usuário" class="w-full p-3 mb-3 rounded border bg-gray-700 text-white" />
      <input id="deleteLoginPass" type="password" placeholder="Senha" class="w-full p-3 mb-3 rounded border bg-gray-700 text-white" />
      <button id="deleteLoginButton" class="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">Entrar</button>
    `;

    document.getElementById('deleteLoginButton').addEventListener('click', () => {
      const user = document.getElementById('deleteLoginUser').value;
      const pass = document.getElementById('deleteLoginPass').value;
      if (user === 'admin' && pass === 'adminmatrix') {
        deleteModalContent.innerHTML = `
          <h2 class="text-2xl font-bold mb-4 text-center text-red-400">Tem Certeza?</h2>
          <p class="text-center mb-6">Deseja apagar todos os pedidos?</p>
          <div class="flex gap-4">
            <button id="confirmDelete" class="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold">OK</button>
            <button id="cancelDelete" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-bold">Cancelar</button>
          </div>
        `;

        document.getElementById('confirmDelete').addEventListener('click', () => {
          localStorage.removeItem('pedidos');
          location.reload();
        });

        document.getElementById('cancelDelete').addEventListener('click', () => {
          deleteModal.classList.remove('show');
        });
      } else {
        alert('❌ Usuário ou senha incorretos!');
      }
    });
  });

  deleteModal.addEventListener('click', (e) => { if (e.target === deleteModal) deleteModal.classList.remove('show'); });

  chatbotButton?.addEventListener('click', () => chatbotWindow?.classList.toggle('hidden'));
  chatbotClose?.addEventListener('click', () => chatbotWindow?.classList.add('hidden'));
  chatbotSend?.addEventListener('click', () => { 
    const msg = chatbotInput.value.trim(); 
    if (!msg) return; 
    const userMsg = document.createElement('div'); 
    userMsg.textContent = `🧑 ${msg}`; 
    userMsg.className = 'chat-msg user-msg'; 
    chatbotMessages?.appendChild(userMsg); 
    chatbotInput.value = ''; 
    const botMsg = document.createElement('div'); 
    botMsg.textContent = '🤖 Resposta automática'; 
    botMsg.className = 'chat-msg bot-msg'; 
    chatbotMessages?.appendChild(botMsg); 
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; 
  });

  // ✅ INICIALIZAR
  if (toggleThemeBtn) { 
    toggleThemeBtn.addEventListener('click', () => { 
      document.body.classList.toggle('dark'); 
      document.body.classList.toggle('light'); 
      toggleThemeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙'; 
      initParticles(); 
      updatePedidoTextColors();
    }); 
    toggleThemeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙'; 
  }
  initParticles();
  loadPedidos();
  updatePedidoTextColors();
});

function updatePedidoTextColors() {
  const isLight = document.body.classList.contains('light');
  document.querySelectorAll('.pedido-item').forEach(item => {
    item.classList.toggle('text-white', !isLight);
    item.classList.toggle('text-black', isLight);
  });
}