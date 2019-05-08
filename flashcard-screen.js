// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.restart = this.restart.bind(this);
  }

  show(detail) {
    console.log(detail);
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    this.card = new Flashcard(flashcardContainer, detail);
    flashcardContainer.addEventListener('end_The_Game', this.hide);
  }

  hide(event) {
    this.containerElement.classList.add('inactive');
    this.containerElement.dispatchEvent(new CustomEvent('result_Stage',{detail:event.detail}));
  }

  restart(){
    this.containerElement.classList.remove('inactive');
    this.card.restart();
  }


}
