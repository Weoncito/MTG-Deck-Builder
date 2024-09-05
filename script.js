// Example deck structure
const deck = {
    creatures: [
        { quantity: 4, name: 'Baleful Strix', manaCost: 2 },
        { quantity: 3, name: 'Snapcaster Mage', manaCost: 2 }
    ],
    spells: [
        { quantity: 4, name: 'Brainstorm', manaCost: 1 },
        { quantity: 4, name: 'Force of Will', manaCost: 5 },
        { quantity: 3, name: 'Ponder', manaCost: 1 }
    ],
    lands: [
        { quantity: 4, name: 'Underground Sea', manaCost: 0 },
        { quantity: 3, name: 'Tundra', manaCost: 0 }
    ]
};

// Function to dynamically load deck onto the page
function loadDeck() {
    const creaturesList = document.getElementById('creatures-list');
    const spellsList = document.getElementById('spells-list');
    const landsList = document.getElementById('lands-list');
    let totalCards = 0;

    // Load creatures
    deck.creatures.forEach(card => {
        const li = document.createElement('li');
        li.innerHTML = `${card.quantity}x <a href="#">${card.name}</a>`;
        creaturesList.appendChild(li);
        totalCards += card.quantity;
    });

    // Load spells
    deck.spells.forEach(card => {
        const li = document.createElement('li');
        li.innerHTML = `${card.quantity}x <a href="#">${card.name}</a>`;
        spellsList.appendChild(li);
        totalCards += card.quantity;
    });

    // Load lands
    deck.lands.forEach(card => {
        const li = document.createElement('li');
        li.innerHTML = `${card.quantity}x <a href="#">${card.name}</a>`;
        landsList.appendChild(li);
        totalCards += card.quantity;
    });

    // Update total cards in the deck
    document.getElementById('total-cards').innerText = totalCards;

    // Call the function to render the mana curve chart
    renderManaCurveChart();
}

// Function to generate the mana curve chart using Chart.js
function renderManaCurveChart() {
    const manaCurveCtx = document.getElementById('mana-curve-chart').getContext('2d');
    const manaCosts = deck.creatures.concat(deck.spells).map(card => card.manaCost);

    // Count occurrences of each mana cost
    const manaCurveData = manaCosts.reduce((acc, manaCost) => {
        acc[manaCost] = (acc[manaCost] || 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(manaCurveData),
        datasets: [{
            label: 'Mana Curve',
            data: Object.values(manaCurveData),
            backgroundColor: 'rgba(0, 123, 255, 0.7)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        }]
    };

    new Chart(manaCurveCtx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Load the deck once the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', loadDeck);
