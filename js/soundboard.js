import {
    _createElement,
    _addEventKeyDown,
    _addEventClick,
    _getSoundByLink,
    _getById,
    _find,
    _addClass,
    _addEventEnded,
    _removeClass,
} from './utils';

export class Soundboard {
    sounds = [];

    /*
        @param data: sounds[]
    */
    constructor(sounds) {
        this.sounds = sounds;
        _addEventKeyDown(document, this.handleKeyDown.bind(this));
    }

    /*
        Event keyboard 
    */
    handleKeyDown(event) {
        let key = event.key;
        this.play(key);
    }

    /*
        Event button click
    */
    handleClick(event) {
        let key = event.target.getAttribute('id');
        this.play(key);
    }

    /*
        Play sound
        @param code: string
    */
    play(key) {
        let soundByKey = this.sounds.find(sound => sound.key == key);
        if (soundByKey) {
            let audio = _getSoundByLink(soundByKey.link),
                button = _getById(key);
                audio.currentTime = 0;
                audio.play();
            _addClass(button, 'sound-active');
            _addEventEnded(audio, () => {
                _removeClass(button, 'sound-active');
            });
        }
    }

    /*
        Create sound list
    */
    createListSounds() {
        let btnSection = _find('#btn-section');
        this.sounds.map(sound => {
            let container = this.createContainer('div'),
                button = this.createButton(sound);
            _addEventClick(button, this.handleClick.bind(this));
            container.append(button);
            btnSection.append(container);
        });
    }

    /*
        Create button element 
        @param sound: sound{}
    */
    createButton(sound) {
        let button = _createElement('button');
        button.textContent = `Press "${sound.key}"`;
        button.id = sound.key;
        return button;
    }

    /*
        Create container element
    */
    createContainer() {
        let div = _createElement('div');
        div.className = "btn-container";
        return div;
    }
}


