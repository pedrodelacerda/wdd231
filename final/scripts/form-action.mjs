document.addEventListener('DOMContentLoaded', () => {
  const displayContainer = document.getElementById('form-data-display');
  if (!displayContainer) return;

  const params = new URLSearchParams(window.location.search);

  if ([...params].length === 0) {
    displayContainer.innerHTML = '<p style="color: #e11d48;">No form submission data found in URL parameters.</p>';
    return;
  }

  let html = '<ul style="list-style: none; padding: 0; line-height: 2;">';
  params.forEach((value, key) => {
    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
    html += `<li style="border-bottom: 1px solid var(--border); padding: 0.5rem 0;">
      <strong>${formattedKey}:</strong> ${decodeURIComponent(value.replace(/\+/g, ' '))}
    </li>`;
  });
  html += '</ul>';

  displayContainer.innerHTML = html;
});