async function loadSavedBookmarks() {
  const container = document.getElementById('saved-container');
  if (!container) return;

  const savedIds = JSON.parse(localStorage.getItem('printhub_bookmarks')) || [];
  
  if (savedIds.length === 0) {
    container.innerHTML = '<p>No items bookmarked yet.</p>';
    return;
  }

  try {
    const response = await fetch('data/printers.json');
    const data = await response.json();
    const savedItems = data.filter(item => savedIds.includes(item.id));

    container.innerHTML = savedItems.map(item => `
      <article class="printer-card">
        <h3>${item.name}</h3>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Build Volume:</strong> ${item.buildVolume}</p>
        <p><strong>Speed:</strong> ${item.speed}</p>
      </article>
    `).join('');
  } catch (err) {
    console.error('Error loading saved bookmarks:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadSavedBookmarks);