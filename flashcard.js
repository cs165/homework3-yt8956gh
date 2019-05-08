
class Flashcard {
  constructor(containerElement, detail) {
    this.containerElement = containerElement;
    this.detail = detail;

    //for drag
    this.originX = null;
    this.originY = null;
    this.dragStarted = false;
    this.deltaX = null;
    this.deltaY = null;

    //for iterate word in desk
    this.wordCount=0;
    this.fontWord = Object.keys(this.detail.words);
    this.backWord = Object.values(this.detail.words);
    this.wordLength = this.backWord.length;
    console.log(this.wordLength);

    //for leaving the game
    this.haveAnswer=false;

    //for recording score
    this.correct=0;
    this.wrong=0;
    this.wrongFontwordSet = [];
    this.wrongBackwordSet = [];
    this.restartWithWrong=false;


    this._flipCard = this._flipCard.bind(this);
    this._onDragStart = this._onDragStart.bind(this);
    this._onDragMove = this._onDragMove.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);
    this.restart = this.restart.bind(this);
    this.makeFirstCard =this.makeFirstCard.bind(this);

    this.makeFirstCard();
  }

  restart(){

    if(this.wrong===0) {//全對
      this.fontWord = Object.keys(this.detail.words);
      this.backWord = Object.values(this.detail.words);
      this.wordLength = this.backWord.length;
      this.wordCount=0;
      this.correct=0;
      this.wrong=0;
      this.restartWithWrong=false;
    }
    else {
      this.fontWord = this.wrongFontwordSet;
      this.backWord = this.wrongBackwordSet;
      this.wordLength = this.backWord.length;
      this.wordCount=0;
      this.restartWithWrong=true;
    }

    this.wrongFontwordSet=[];
    this.wrongBackwordSet=[];

    this.makeFirstCard();
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

  _flipCard() {
    this.flashcardElement.classList.toggle('show-word');
  }

  makeFirstCard(){
    this.flashcardElement = this._createFlashcardDOM(
        this.fontWord[this.wordCount], this.backWord[this.wordCount]);

    this.makeCardMove(this.flashcardElement);

    this.containerElement.append(this.flashcardElement);
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
    this.deltaX = event.clientX - this.originX;
    this.deltaY = event.clientY - this.originY;

    event.currentTarget.style.transform = 'translate(' + this.deltaX + 'px, ' + this.deltaY + 'px) ';
    event.currentTarget.style.transform += 'rotate('+this.deltaX*0.2 +'deg)';

    let body = document.querySelector('body');

    if(this.deltaX > 120 || this.deltaX < -120)
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
    else
    {
      //移除舊的flashcard
      this.containerElement.removeChild(this.flashcardElement);
      console.log('remove flashcardElement');



      let correctSpan = document.querySelector('.correct');
      let wrongSpan = document.querySelector('.incorrect');

      if(this.deltaX>0){
        //正確
        this.correct++;
        if(this.restartWithWrong) this.wrong--;//重新開始後，如果有答對，之前答錯的題數要去除掉
      }
      else{
        //錯誤
        if(!this.restartWithWrong) this.wrong++;//重新開始後，如果有答錯，答錯的題數不變
        this.wrongFontwordSet.push(this.fontWord[this.wordCount]);
        this.wrongBackwordSet.push(this.backWord[this.wordCount]);
      }

      correctSpan.textContent=this.correct.toString();
      wrongSpan.textContent=this.wrong.toString();

      this.wordCount++;

      if(this.wordLength<=(this.wordCount))//遊戲結束
      {
        this.wordCount=0;
        correctSpan.textContent='';
        wrongSpan.textContent='';
        console.log('Correct:'+this.correct+'Wrong'+this.wrong);
        const score={'correct':this.correct,'incorrect':this.wrong};
        this.containerElement.dispatchEvent(new CustomEvent('end_The_Game',{detail:score}));
      }
      else
      {
        //增加新的flashcard
        this.flashcardElement = this._createFlashcardDOM(
            this.fontWord[this.wordCount], this.backWord[this.wordCount]);

        console.log(this.wordCount);
        this.containerElement.append(this.flashcardElement);
        this.makeCardMove(this.flashcardElement);
        this.haveAnswer = false;
        this.dragStarted = false;
      }

      let body = document.querySelector('body');
      body.style.backgroundColor='#d0e6df';
    }

  }

}
