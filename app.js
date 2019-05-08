// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {

    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    this.changeToFlashCard = this.changeToFlashCard.bind(this);
    this.changeToResult = this.changeToResult.bind(this);

    menuElement.addEventListener('flashcard_Stage', this.changeToFlashCard);
    mainElement.addEventListener('result_Stage', this.changeToResult);
    resultElement.addEventListener('menu_Stage',this.changeToMenu);
  }

  changeToFlashCard(event){
    this.flashcards.show(event.detail);
  }

  changeToResult(){
    console.log('End Game successfully');
    this.results.show();
  }

  changeToMenu(){
    this.menu.show();
  }
}
