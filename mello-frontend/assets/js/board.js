class Card {    //defines a card
  constructor(text) {
    this.text = text;
    this.id = ++Card.lastId; //this adds one number to the last ID
  }
}

Card.lastId = 0; //sets the IDs to zero.

class List {
  constructor(title) {    // defines a list
    this.title = title;
    this.id = ++List.lastId;
    this.cards = []; //an array to store cards
  }

  addCard(text) { //defines the function to create a card
    var card = new Card(text);
    this.cards.push(card);    //puts the new card into the cards array
  }

  findCard(cardId) {
    return this.cards.find(function(card) {
      if (cardId == card.id) {
        return card; 
      }
    })
  }
}

List.lastId = 0;

class Board {   // defines the board
  constructor() {
    this.id = ++Board.lastId;
    this.lists= []; // creates an array to store the lists
  }

  addList(text) { //defines how to create a list
    var list = new List(text); 
    this.lists.push(list);  //pushes the new list to the board array
  }

  findList(listId) {
    return this.lists.find(function(list) { //goes through the lists to find the current list
      return listId === list.id;  //returns the listId that is equal to the list.id
    });
  }

  editList(listId, newTitle) {
    var list = this.findList(listId); 
    if (list) {                //if there is a list that was defined above the list.title will equal the new title
      list.title = newTitle;
    }
  }

  addCard(listId, cardText) {
    var list = this.findList(listId);
    if (list) {
      list.addCard(cardText);
    }
  }

  editCard(cardId, cardText) {
    this.lists.forEach(function(list) {
      var card = list.findCard(cardId);
      if (card) {
        card.text = cardText;
      }
    });
  }
}

Board.lastId = 0;