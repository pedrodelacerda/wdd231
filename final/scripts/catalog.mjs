let hardwareData = [];

// Carregamento Assíncrono com Try...Catch (Requisito obrigatório do Vídeo)
async function fetchHardwareData() {
  try {
    const response = await fetch('data/printers.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    hardwareData = await response.json();
    displayCatalog(hardwareData);
  } catch (error) {
    console.error('Error fetching hardware catalog:', error);
    const container = document.getElementById('catalog-container');
    if (container) {
      container.innerHTML = `<p style="color: red;">Failed to load hardware catalog. Please try again later.</p>`;
    }
  }
}

// Renderização e manipulação do DOM usando Template Literals
function displayCatalog(items) {
  const container = document.getElementById('catalog-container');
  if (!container) return;

  container.innerHTML = ''; // Limpa container

  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'printer-card';
    
    // Uso de Template Literals com 4+ propriedades exibidas por item
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
      <h3>${item.name}</h3>
      <p><strong>Category:</strong> ${item.category}</p>
      <p><strong>Build Volume:</strong> ${item.buildVolume}</p>
      <p><strong>Max Temp:</strong> ${item.maxTemp}</p>
      <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
        <button class="btn-primary view-details-btn" data-id="${item.id}">Details</button>
        <button class="btn-primary bookmark-btn" data-id="${item.id}">Save</button>
      </div>
    `;

    container.appendChild(card);
  });

  attachEventListeners();
}

// Event Listeners e LocalStorage
function attachEventListeners() {
  const modal = document.getElementById('detail-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModal = document.getElementById('close-modal');

  // Modal display
  document.querySelectorAll('.view-details-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      const selected = hardwareData.find(item => item.id === id);
      
      if (selected && modalContent) {
        modalContent.innerHTML = `
          <h2>${selected.name}</h2>
          <p><strong>Category:</strong> ${selected.category}</p>
          <p><strong>Build Volume:</strong> ${selected.buildVolume}</p>
          <p><strong>Max Speed/Cure Rate:</strong> ${selected.speed}</p>
          <p><strong>Max Temperature:</strong> ${selected.maxTemp}</p>
        `;
        modal.showModal();
      }
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => modal.close());
  }

  // Salvar no LocalStorage
  document.querySelectorAll('.bookmark-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      let saved = JSON.parse(localStorage.getItem('printhub_bookmarks')) || [];
      if (!saved.includes(id)) {
        saved.push(id);
        localStorage.setItem('printhub_bookmarks', JSON.stringify(saved));
        alert('Item saved to bookmarks!');
      } else {
        alert('Item is already bookmarked.');
      }
    });
  });
}

// Filtros usando Array Methods (filter)
function setupFilters() {
  document.getElementById('filter-all')?.addEventListener('click', () => displayCatalog(hardwareData));
  document.getElementById('filter-fdm')?.addEventListener('click', () => {
    const fdmOnly = hardwareData.filter(item => item.category === 'FDM');
    displayCatalog(fdmOnly);
  });
  document.getElementById('filter-sla')?.addEventListener('click', () => {
    const slaOnly = hardwareData.filter(item => item.category === 'SLA');
    displayCatalog(slaOnly);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchHardwareData();
  setupFilters();
});