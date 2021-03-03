export class Soundboard {
    sounds = [];

    constructor(sounds){
        this.sounds = sounds;
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleKeyDown(event){
        let code = event.keyCode;
        let isAudioExist = this.sounds.find(sound => sound.keyCode === code);
        if(isAudioExist){
            let audio = new Audio(isAudioExist.link);
            let buttonClassList = document.getElementById(code).classList;
            audio.currentTime = 0;
            buttonClassList.add('sound-active');
            audio.play();
            audio.addEventListener('ended', () => {
                buttonClassList.remove('sound-active');
            });
       }
    }

    handleClick(event){
        let code = event.target.getAttribute('id');
        let isAudioExist = this.sounds.find(sound => sound.keyCode == code);

        if(isAudioExist){
            let audio = new Audio(isAudioExist.link);
            let buttonClassList = document.getElementById(code).classList;
            audio.currentTime = 0;
            buttonClassList.add('sound-active');
            audio.play();
            audio.addEventListener('ended', () => {
                buttonClassList.remove('sound-active');
            });
       }
    }

    createListSound(){
        let btnSection = document.querySelector('#btn-section');
        this.sounds.map(drum => {
            let container = this.createContainerSound('div');
            let button = this.createButtonSound(drum);
            button.addEventListener('click', this.handleClick.bind(this));
            container.append(button);  
            btnSection.append(container);   
        });
    }

    createButtonSound(drum){
        let button = document.createElement('button');
            button.textContent = `Press ${drum.id.toLowerCase()}`;
            button.id = drum.keyCode;
        return button;
    }      

    createContainerSound(){
        let div = document.createElement('div');
            div.className = "btn-container";
            return div;
    }
}



