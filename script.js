// Allow the drop
function allowDrop(event) {
  event.preventDefault();
}

// Start dragging
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

// Drop card into new section
function drop(event) {
  event.preventDefault();
  const cardId = event.dataTransfer.getData("text");
  const card = document.getElementById(cardId);
  event.target.appendChild(card);
}

// Example cards for testing
const card1 = document.createElement('li');
card1.id = 'card1';
card1.draggable = true;
card1.ondragstart = drag;
card1.textContent = '4x Llanowar Elves';

const card2 = document.createElement('li');
card2.id = 'card2';
card2.draggable = true;
card2.ondragstart = drag;
card2.textContent = '4x Lightning Bolt';

document.getElementById('considering-list').appendChild(card1);
document.getElementById('considering-list').appendChild(card2);

// Save Deck to localStorage
function saveDeck() {
  const finalDeck = [...document.querySelectorAll('#final-deck-list li')].map(card => card.textContent);
  localStorage.setItem('finalDeck', JSON.stringify(finalDeck));
  alert('Deck Saved!');
}

// Load Deck from localStorage
function loadDeck() {
  const savedDeck = JSON.parse(localStorage.getItem('finalDeck')) || [];
  const finalDeckList = document.getElementById('final-deck-list');
  finalDeckList.innerHTML = ''; // Clear the list

  savedDeck.forEach(card => {
    const li = document.createElement('li');
    li.textContent = card;
    li.draggable = true;
    li.ondragstart = drag;
    finalDeckList.appendChild(li);
  });
}
