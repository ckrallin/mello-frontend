var $boardContainer = document.querySelector('.container'); //selects the container div on the html

var board = new Board();

function handleListCreate() {
  var listTitle = prompt('New list title') || ''; //prompts the user to name the new list

  if (listTitle.trim()) {
    board.addList(listTitle); //adds tbe list with the entered prompt title
    renderBoard();
  }
}

function handleCardCreate(event) {
  var $listContainer = event.target.parentNode; //points to where the button was clicked and accesses the parent of that property in the DOM
  var listId = Number($listContainer.getAttribute('data-id')); //grabs the data ID from the listContainer

  var cardText = prompt('New card text') || '';

  if (cardText.trim()) {
    board.addCard(listId, cardText); //adds card under the appropriate list ID
    renderBoard();
  }
}

function handleListEdit(event) {
  var $listContainer = event.target.parentNode.parentNode; //calling parentNode twice becaust the header button is the child of the header and the header is the child of the list container
  var listId = Number($listContainer.getAttribute('data-id'));

  var listTitle = prompt('New list title') || '';

  if (listTitle.trim()) {
    board.editList(listId, listTitle);
    renderBoard();
  }
}

function handleCardEdit(event) {
  var cardId = Number(event.target.getAttribute('data-id'));

  var cardText = prompt('New card text') || '';

  if (cardText.trim()) {
    board.editCard(cardId, cardText);
    renderBoard();
  }
}

function renderBoard() {
  $boardContainer.innerHTML = '';     //empties the string whenever the method is called

  board.lists.forEach(function(list) {      //iterates through each list
    var $listContainer = document.createElement('div'); //creates a div for each list
    $listContainer.className = 'list';
    $listContainer.setAttribute('data-id', list.id);

    var $header = document.createElement('header');
    
    var $headerButton = document.createElement('button');
    $headerButton.textContent = list.title;
    $headerButton.addEventListener('click', handleListEdit);

    var $cardUl = document.createElement('ul');

    list.cards.forEach(function(card) {
      var $cardLi = document.createElement('li');

      var $cardButton = document.createElement('button');
      $cardButton.textContent = card.text;
      $cardButton.setAttribute('data-id', card.id)
      $cardButton.addEventListener('click', handleCardEdit);

      $cardLi.appendChild($cardButton);
      $cardUl.appendChild($cardLi);
    });
    
    var $addCardButton = document.createElement('button');
    $addCardButton.textContent = 'Add a card...';
    $addCardButton.addEventListener('click', handleCardCreate); //triggers Card creation when button is 'clicked'

    $header.appendChild($headerButton); //adds the list title under the header
    $listContainer.appendChild($header);  //adds the list container under the header
    $listContainer.appendChild($cardUl);
    $listContainer.appendChild($addCardButton); //adds card button under the list container
    $boardContainer.appendChild($listContainer); 

  });

  var $addListContainer = document.createElement('div'); //creates a div for each list container
  $addListContainer.className = 'list add';

  var $addListButton = document.createElement('button'); // creates a button to add lists
  $addListButton.textContent = '+ Add another list';
  $addListButton.addEventListener('click', handleListCreate);

  $addListContainer.appendChild($addListButton);
  $boardContainer.appendChild($addListContainer);
}

renderBoard();
