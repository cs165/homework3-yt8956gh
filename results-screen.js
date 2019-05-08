// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {

  constructor(containerElement) {
    this.containerElement = containerElement;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.BackToFlashcard = this.BackToFlashcard.bind(this);

    let toContinue = document.querySelector('.continue');
    let toMenu = document.querySelector('.to-menu');

    toContinue.addEventListener('click', this.BackToFlashcard);
    toMenu.addEventListener('click', this.hide);
  }

  show(numberCorrect, numberWrong) {

    console.log('Correct '+numberCorrect+' Wrong '+numberWrong);
    this.containerElement.classList.remove('inactive');

    this.updateString(numberCorrect, numberWrong);


    let toContinue = document.querySelector('#results .continue');

    if(numberWrong===0) {
      toContinue.textContent='Start over?';
    }
    else {
      toContinue.textContent='Continue';
    }
  }

  updateString(numberCorrect, numberWrong){
    let correctSpan = document.querySelector('#results .correct');
    let wrongSpan = document.querySelector('#results .incorrect');
    let percent = document.querySelector('#results .percent');

    correctSpan.textContent = numberCorrect.toString();
    wrongSpan.textContent = numberWrong.toString();
    percent.textContent = Math.round(numberCorrect/(numberCorrect+numberWrong)*100).toString();
  }

  hide() {
    this.containerElement.classList.add('inactive');
    this.containerElement.dispatchEvent(new Event('menu_Stage'));
  }

  BackToFlashcard(){
    this.containerElement.classList.add('inactive');
    this.containerElement.dispatchEvent(new Event('restart_flashcard_Stage'));
  }
}
