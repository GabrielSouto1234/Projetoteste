(function () {
  // Elementos
  const tbody = document.getElementById('tbody');
  const fPedido = document.getElementById('fPedido');
  const fCliente = document.getElementById('fCliente');
  const fCnpj = document.getElementById('fCnpj');
  const fStatus = document.getElementById('fStatus');
  const fFrom = document.getElementById('fFrom');
  const fTo = document.getElementById('fTo');
  const clearFilters = document.getElementById('clearFilters');
  const exportCsv = document.getElementById('exportCsv');
  const printBtn = document.getElementById('printBtn');
  const themeBtn = document.getElementById('themeBtn');
  const toggleParticles = document.getElementById('toggleParticles');
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const closeModal = document.getElementById('closeModal');
  const dashboardLink = document.getElementById('dashboardLink');
  const dashboardModal = document.getElementById('dashboardModal');
  const closeDashboard = document.getElementById('closeDashboard');
  const backToMenu = document.getElementById('backToMenu');
  const sortIcons = {
    pedido: document.getElementById('s-pedido'),
    cliente: document.getElementById('s-cliente'),
    cnpj: document.getElementById('s-cnpj'),
    data_cd: document.getElementById('s-data_cd'),
    data_separado: document.getElementById('s-data_separado'),
    data_expedido: document.getElementById('s-data_expedido'),
    transportadora: document.getElementById('s-transportadora')
  };

  // Estado
  let particlesOn = false;
  let sortState = { key: null, asc: true };

  // Dados de exemplo (troque pelo seu)
  const pedidos = [
    { pedido: '001', cliente: 'Miquelute LTDA', cnpj: '12.345.678/0001-90', data_cd: '2025-10-01', data_separado: '2025-10-02', data_expedido: '2025-10-03', transportadora: 'Trans A', items: [{sku:'LIXA-01', qty:10}] },
    { pedido: '002', cliente: 'Shigaki Omoto', cnpj: '98.765.432/0001-12', data_cd: '2025-10-03', data_separado: '2025-10-04', data_expedido: '', transportadora: '', items: [{sku:'LIXA-02', qty:5}] },
    { pedido: '003', cliente: 'Cliente Teste', cnpj: '11.222.333/0001-44', data_cd: '2025-10-05', data_separado: '', data_expedido: '', transportadora: '', items: [{sku:'LIXA-03', qty:2}] },
    { pedido: '004', cliente: 'Empresa ABC', cnpj: '55.666.777/0001-88', data_cd: '2025-10-06', data_separado: '2025-10-07', data_expedido: '2025-10-08', transportadora: 'Trans B', items: [{sku:'LIXA-99', qty:1}] },
    { pedido: '005', cliente: 'Loja Central', cnpj: '22.333.444/0001-55', data_cd: '2025-10-08', data_separado: '', data_expedido: '', transportadora: '', items: [{sku:'LIXA-07', qty:7}] },
  ];

  let current = [...pedidos];

  // Util
  function formatDate(d) {
    if (!d) return '---';
    const D = new Date(d);
    if (isNaN(D)) return d;
    return String(D.getDate()).padStart(2,'0') + '/' + String(D.getMonth()+1).padStart(2,'0') + '/' + D.getFullYear();
  }

  function statusOf(p) {
    return p.data_expedido ? 'Expedido' : p.data_separado ? 'Separado' : 'Chegado';
  }

  function statusBadge(p) {
    const s = statusOf(p);
    if (s === 'Expedido') return `<span class="status expedido"><i class="fas fa-truck"></i> ${s}</span>`;
    if (s === 'Separado') return `<span class="status separado"><i class="fas fa-box-open"></i> ${s}</span>`;
    return `<span class="status chegado"><i class="fas fa-warehouse"></i> ${s}</span>`;
  }

  // Render
  function render(rows) {
    tbody.innerHTML = '';
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="8" style="padding:24px;text-align:center;color:var(--muted)">Nenhum registro</td></tr>`;
      return;
    }
    for (const r of rows) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${r.pedido}</td>
        <td>${r.cliente}</td>
        <td>${r.cnpj}</td>
        <td>${formatDate(r.data_cd)}</td>
        <td>${formatDate(r.data_separado)}</td>
        <td>${formatDate(r.data_expedido)}</td>
        <td>${r.transportadora || '---'}</td>
        <td>${statusBadge(r)}</td>
      `;
      tr.addEventListener('click', () => openDetail(r));
      tbody.appendChild(tr);
    }
  }

  // Filters
  function applyFilters() {
    const qPedido = fPedido.value.trim().toLowerCase();
    const qCliente = fCliente.value.trim().toLowerCase();
    const qCnpj = fCnpj.value.trim();
    const qStatus = fStatus.value;
    const from = fFrom.value ? new Date(fFrom.value) : null;
    const to = fTo.value ? new Date(fTo.value) : null;

    current = pedidos.filter(p => {
      const mp = p.pedido.toLowerCase().includes(qPedido);
      const mc = p.cliente.toLowerCase().includes(qCliente);
      const mcj = !qCnpj || p.cnpj.includes(qCnpj);
      const st = statusOf(p);
      const ms = !qStatus || st === qStatus;
      const cd = p.data_cd ? new Date(p.data_cd) : null;
      const mf = !from || (cd && cd >= from);
      const mt = !to || (cd && cd <= to);
      return mp && mc && mcj && ms && mf && mt;
    });

    // Toggle black theme based on status selection
    if (qStatus) {
      document.body.classList.add('black-theme');
      document.body.classList.remove('light');
    } else {
      document.body.classList.remove('black-theme');
    }

    applySort();
    render(current);
    updateSortIcons();
  }

  // Sort
  function applySort() {
    if (!sortState.key) return;
    const key = sortState.key;
    const asc = sortState.asc;
    current.sort((a,b) => {
      let va = a[key] || '';
      let vb = b[key] || '';
      if (key.startsWith('data')) {
        va = va ? new Date(va) : new Date(0);
        vb = vb ? new Date(vb) : new Date(0);
      } else {
        va = String(va).toLowerCase();
        vb = String(vb).toLowerCase();
      }
      if (va < vb) return asc ? -1 : 1;
      if (va > vb) return asc ? 1 : -1;
      return 0;
    });
  }

  function clearSortIcons() {
    Object.values(sortIcons).forEach(el => el.innerHTML = '');
  }

  function updateSortIcons() {
    clearSortIcons();
    if (!sortState.key) return;
    const el = sortIcons[sortState.key];
    if (!el) return;
    el.innerHTML = sortState.asc ? '<i class="fas fa-arrow-up"></i>' : '<i class="fas fa-arrow-down"></i>';
  }

  // Header click sort
  document.querySelectorAll('thead th[data-col]').forEach(th => {
    th.style.cursor = 'pointer';
    th.addEventListener('click', () => {
      const key = th.getAttribute('data-col');
      if (sortState.key === key) sortState.asc = !sortState.asc;
      else { sortState.key = key; sortState.asc = true; }
      applySort();
      render(current);
      updateSortIcons();
    });
  });

  // Modal para detalhes
  function openDetail(item) {
    modalBody.innerHTML = '';
    const html = `
      <div class="row"><strong>Pedido</strong><div>${item.pedido}</div></div>
      <div class="row"><strong>Cliente</strong><div>${item.cliente}</div></div>
      <div class="row"><strong>CNPJ</strong><div>${item.cnpj}</div></div>
      <div class="row"><strong>Data CD</strong><div>${formatDate(item.data_cd)}</div></div>
      <div class="row"><strong>Data Separado</strong><div>${formatDate(item.data_separado)}</div></div>
      <div class="row"><strong>Data Expedido</strong><div>${formatDate(item.data_expedido)}</div></div>
      <div class="row" style="grid-column:1 / -1"><strong>Transportadora</strong><div>${item.transportadora || '---'}</div></div>
      <div class="row" style="grid-column:1 / -1"><strong>Itens</strong><div>${(item.items||[]).map(i=>`${i.sku} (x${i.qty})`).join(', ')}</div></div>
    `;
    modalBody.innerHTML = html;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden','false');
  }
  function hideModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden','true');
  }
  closeModal.addEventListener('click', hideModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });

  // Modal para dashboard (gráficos)
  function showDashboard() {
    dashboardModal.style.display = 'flex';
    dashboardModal.setAttribute('aria-hidden','false');

    // Computar contagens por status
    const counts = { Expedido: 0, Separado: 0, Chegado: 0 };
    pedidos.forEach(p => {
      const st = statusOf(p);
      counts[st]++;
    });

    // Criar gráfico moderno (pie chart)
    const ctx = document.getElementById('statusChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(counts),
        datasets: [{
          label: 'Quantidade por Status',
          data: Object.values(counts),
          backgroundColor: [
            'rgba(16, 185, 129, 0.8)',  // Verde para Expedido
            'rgba(245, 158, 11, 0.8)',  // Amarelo para Separado
            'rgba(59, 130, 246, 0.8)'   // Azul para Chegado
          ],
          borderColor: [
            'rgba(16, 185, 129, 1)',
            'rgba(245, 158, 11, 1)',
            'rgba(59, 130, 246, 1)'
          ],
          borderWidth: 2,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#e6eef8',
              font: { size: 14 }
            }
          },
          title: {
            display: true,
            text: 'Quantidade de Pedidos por Status',
            color: '#e6eef8',
            font: { size: 18, weight: 'bold' }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#e6eef8',
            bodyColor: '#e6eef8',
            borderColor: 'rgba(59, 130, 246, 0.2)',
            borderWidth: 1
          }
        },
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart'
        }
      }
    });
  }
  function hideDashboard() {
    dashboardModal.style.display = 'none';
    dashboardModal.setAttribute('aria-hidden','true');
    // Destruir o gráfico se necessário (para reutilização)
    const canvas = document.getElementById('statusChart');
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  }
  closeDashboard.addEventListener('click', hideDashboard);
  dashboardModal.addEventListener('click', (e) => { if (e.target === dashboardModal) hideDashboard(); });

  // Evento de clique no link Dashboard
  dashboardLink.addEventListener('click', (e) => {
    e.preventDefault();
    showDashboard();
  });

  // Evento para botão Voltar ao Menu
  backToMenu.addEventListener('click', () => {
    window.location.href = 'menu.html';
  });

  // CSV export
  function exportToCsv() {
    const headers = ['Pedido','Cliente','CNPJ','Data CD','Data Separado','Data Expedido','Transportadora','Status'];
    const rows = [headers];
    for (const r of current) {
      rows.push([
        r.pedido, r.cliente, r.cnpj, formatDate(r.data_cd),
        formatDate(r.data_separado), formatDate(r.data_expedido),
        r.transportadora || '', statusOf(r)
      ]);
    }
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_pedidos_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Print
  function doPrint() {
    window.print();
  }

  // Theme
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    if (fStatus.value) {
      document.body.classList.add('black-theme');
      document.body.classList.remove('light');
    }
  });

  // Clear filters
  clearFilters.addEventListener('click', () => {
    fPedido.value = '';
    fCliente.value = '';
    fCnpj.value = '';
    fStatus.value = '';
    fFrom.value = '';
    fTo.value = '';
    current = [...pedidos];
    sortState = { key: null, asc: true };
    document.body.classList.remove('black-theme');
    clearSortIcons();
    render(current);
  });

  // Input bindings (debounce small)
  let timer;
  [fPedido, fCliente, fCnpj, fFrom, fTo].forEach(el => {
    el.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(applyFilters, 180); });
  });
  fStatus.addEventListener('change', applyFilters);

  exportCsv.addEventListener('click', exportToCsv);
  printBtn.addEventListener('click', doPrint);

  // Particles toggle (dynamic load of library)
  toggleParticles.addEventListener('click', () => {
    particlesOn = !particlesOn;
    if (particlesOn) {
      // load library dynamically then init
      if (!window.pJSDom) {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        s.onload = initParticles;
        document.body.appendChild(s);
      } else initParticles();
    } else {
      // remove canvas
      const el = document.getElementById('particles-js');
      if (el) el.remove();
    }
  });

  function initParticles() {
    if (!document.getElementById('particles-js')) {
      const cont = document.createElement('div');
      cont.id = 'particles-js';
      cont.style.position = 'fixed';
      cont.style.inset = '0';
      cont.style.zIndex = '0';
      cont.style.pointerEvents = 'none';
      cont.style.opacity = '0.12';
      document.body.appendChild(cont);
    }
    if (typeof particlesJS === 'function') {
      particlesJS('particles-js', {
        particles: {
          number: { value: 50 },
          color: { value: '#ffffff' },
          shape: { type: 'circle' },
          opacity: { value: 0.06 },
          size: { value: 3 },
          line_linked: { enable: true, distance: 140, color: '#ffffff', opacity: 0.06 },
          move: { enable: true, speed: 2 }
        },
        interactivity: { events: { onhover: { enable: true, mode: 'repulse' } } },
        retina_detect: true
      });
    }
  }

  // Inicialização
  render(current);
})();
