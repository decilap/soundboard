import { Soundboard } from './functions';
//import moment from 'moment' 




const audios = [
    {
        id: 'A',
        keyCode: 65,
        link: '/sounds/Batterie_de_blague.mp3',
    },
    {
        id: 'Z',
        keyCode: 90,
        link: '/sounds/Baguettes_de_batterie_3.mp3',
    },
    {
        id: 'E',
        keyCode: 69,
        link: '/sounds/Caisse_claire_1.mp3',
    },
    {
        id: 'R',
        keyCode: 82,
        link: '/sounds/Charleston_4.mp3',
    },
    {
        id: 'T',
        keyCode: 84,
        link: '/sounds/Charleston_fermee_3.mp3',
    },
    {
        id: 'Y',
        keyCode: 89,
        link: '/sounds/Cymbale_ride_4.mp3',
    },
    {
        id: 'U',
        keyCode: 85,
        link: '/sounds/Tom_aigu_1.mp3',
    },
    {
        id: 'I',
        keyCode: 73,
        link: '/sounds/Tom_grave_1.mp3',
    },
    {
        id: 'O',
        keyCode: 79,
        link: '/sounds/Tom_grave_4.mp3',
    }
];
(new Soundboard(audios)).createListSound();
