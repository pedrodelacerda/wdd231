document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open'); 
});

const url = 'data/members.json';
const container = document.getElementById('directory-container');

async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching members:', error);
        container.innerHTML = `<p class="error">Failed to load directory data.</p>`;
    }
}

function displayMembers(members) {
    container.innerHTML = '';

    members.forEach(member => {
        const section = document.createElement('section');
        section.classList.add('member-card');
        const levels = { 1: 'Member', 2: 'Silver', 3: 'Gold' };

        section.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <h3>${member.name}</h3>
            <p class="tagline">"${member.tagline}"</p>
            <hr>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            <span class="badge level-${member.membershipLevel}">${levels[member.membershipLevel]}</span>
        `;
        container.appendChild(section);
    });
}

const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

gridBtn.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

getMembers();