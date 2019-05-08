
class Flashcard {
  constructor(containerElement, detail) {
    this.containerElement = containerElement;
    this.haveAnswer=false;
    this.originX = null;
    this.originY = null;
    this.dragStarted = false;
    this.wordCount=0;
    this.fontWord = Object.keys(detail.words);
    this.backWord = Object.values(detail.words);
    this.wordLength = this.backWord.length;
    console.log(this.wordLength);

    this._flipCard = this._flipCard.bind(this);
    this._onDragStart = this._onDragStart.bind(this);
    this._onDragMove = this._onDragMove.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);

    this.flashcardElement = this._createFlashcardDOM(
        this.fontWord[this.wordCount], this.backWord[this.wordCount]);

    this.containerElement.append(this.flashcardElement);

    this.makeCardMove(this.flashcardElement);
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');
    cardContainer.addEventListener('pointerup', this._flipCard);

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);

    return cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
  }

  makeCardMove(element){
    element.addEventListener('pointerdown', this._onDragStart);
    element.addEventListener('pointerup', this._onDragEnd);
    element.addEventListener('pointermove', this._onDragMove);
  }

  _onDragStart(event) {

    this.originX = event.clientX;
    this.originY = event.clientY;
    this.dragStarted = true;

    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.transitionDuration='0s';
  }

  _onDragMove(event) {
    if (!this.dragStarted) {
      return;
    }
    event.preventDefault();
    const deltaX = event.clientX - this.originX;
    const deltaY = event.clientY - this.originY;

    event.currentTarget.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px) ';
    event.currentTarget.style.transform += 'rotate('+deltaX*0.2 +'deg)';

    let body = document.querySelector('body');

    if(deltaX > 120 || deltaX < -120)
    {
      body.style.backgroundColor='#97b7b7';
      this.haveAnswer=true;
    }
    else
    {

      body.style.backgroundColor='#d0e6df';
      this.haveAnswer=false;
    }
  }

  _onDragEnd(event) {

    this.dragStarted = false;
    this.originX = null;
    this.originY = null;

    if(!this.haveAnswer)
    { //還沒有答案
      event.currentTarget.style.transform = 'translate(0px, 0px)';
      event.currentTarget.style.transitionDuration="0.6s";
    }
    else if(this.wordLength<=(this.wordCount+1))//遊戲結束
    {
      console.log('Game_end');
      this.containerElement.dispatchEvent(new CustomEvent('end_The_Game'));
    }
    else
    {
      //移除舊的flashcard
      this.containerElement.removeChild(this.flashcardElement);
      console.log('remove flashcardElement');

      this.wordCount++;

      //增加新的flashcard
      this.flashcardElement = this._createFlashcardDOM(
          this.fontWord[this.wordCount], this.backWord[this.wordCount]);

      console.log(this.wordCount);
      this.containerElement.append(this.flashcardElement);
      this.makeCardMove(this.flashcardElement);
      this.haveAnswer = false;
      this.dragStarted = false;
      let body = document.querySelector('body');
      body.style.backgroundColor='#d0e6df';
    }

  }

}
