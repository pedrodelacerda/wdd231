const membersUrl = 'data/members.json';

async function loadSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const members = await response.json();
            
            // Filtra apenas Gold ou Silver (por string ou por nível numérico)
            const qualified = members.filter(m => {
                const level = String(m.membership || m.membershipLevel).toLowerCase();
                return level === 'gold' || level === 'silver' || level === '3' || level === '2';
            });

            // Embaralha aleatoriamente (Fisher-Yates / Array.sort)
            const shuffled = qualified.sort(() => 0.5 - Math.random());
            
            // Seleciona de 2 a 3 membros
            const selected = shuffled.slice(0, 3);
            
            renderSpotlights(selected);
        }
    } catch (error) {
        console.error('Erro ao carregar spotlights:', error);
    }
}

function renderSpotlights(members) {
    const container = document.getElementById('spotlight-container');
    if (!container) return;

    container.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';

        card.innerHTML = `
            <h3>${member.name}</h3>
            <p class="tagline">${member.tagline || 'Empresa Parceira'}</p>
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <p><strong>Nível:</strong> ${member.membership}</p>
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Acessar Site</a>
        `;

        container.appendChild(card);
    });
}

loadSpotlights();