// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement, NextStageClass) {
    this.containerElement = containerElement;
    this.NextStageClass = NextStageClass;

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    //this.addItem = this.addItem.bind(this);

    this.addItem();
  }


  show(event) {
    this.containerElement.classList.remove('inactive');
  }

  hide(event) {
    //console.log('HIDE');
    //console.log("Chosen:"+event.target.innerText);
    this.containerElement.classList.add('inactive');
    this.NextStageClass.show();
  }

  addItem(){
    const choices = document.querySelector('#choices');

    for(let desk of FLASHCARD_DECKS)
    {
      let divTmp=document.createElement('div');
      divTmp.textContent=desk.title;
      divTmp.addEventListener('click',this.hide);
      choices.appendChild(divTmp);
    }
  }
}
