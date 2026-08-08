import { items } from '../data/items.mjs';

document.addEventListener('DOMContentLoaded', () => {
    handleVisitMessage();
    renderDiscoverCards(items);
    setupFooterDates();
});

function handleVisitMessage() {
    const messageContainer = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisitDate');
    const now = Date.now(); 
    if (!lastVisit) {
        messageContainer.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const msPerDay = 1000 * 60 * 60 * 24;
        const timeDifference = now - parseInt(lastVisit, 10);
        const daysDifference = Math.floor(timeDifference / msPerDay);

        if (daysDifference < 1) {
            messageContainer.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            messageContainer.textContent = "You last visited 1 day ago.";
        } else {
            messageContainer.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    localStorage.setItem('lastVisitDate', now.toString());
}

function renderDiscoverCards(data) {
    const container = document.getElementById('discover-container');
    container.innerHTML = '';

    data.forEach((item, index) => {
        const card = document.createElement('article');
        card.classList.add('discover-card', `card-${index + 1}`);

        card.innerHTML = `
            <h2>${item.title}</h2> <!-- Deve ser h2 para vir após o h1 da página -->
            <figure>
                <img src="${item.photo}" alt="${item.title}" loading="lazy" width="300" height="200">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="btn-learn-more" type="button">Learn More</button>
        `;      

        container.appendChild(card);
    });
}

function setupFooterDates() {
    const yearSpan = document.getElementById('current-year');
    const lastModP = document.getElementById('last-modified');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastModP) lastModP.textContent = `Last Modified: ${document.lastModified}`;
}