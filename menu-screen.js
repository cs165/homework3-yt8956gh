// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen{
  constructor(containerElement) {
    this.containerElement = containerElement;

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);

    this.addItem();
  }


  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide(event) {

    let words = FLASHCARD_DECKS.find(function(item, index, array){
      return item.title===event.currentTarget.textContent;
    });

    this.containerElement.classList.add('inactive');
    this.containerElement.dispatchEvent(new CustomEvent('flashcard_Stage',{'detail':words}));
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
