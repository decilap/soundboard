import { Soundboard } from './functions';
//import moment from 'moment' 


const sounds = [
    {
        id: null,
        key: 'a',
        link: '/sounds/Batterie_de_blague.mp3',
    },
    {
        id: null,
        key: 'z',
        link: '/sounds/Baguettes_de_batterie_3.mp3',
    },
    {
        id: null,
        key: 'e',
        link: '/sounds/Caisse_claire_1.mp3',
    },
    {
        id: null,
        key: 'r',
        link: '/sounds/Charleston_4.mp3',
    },
    {
        id: null,
        key: 't',
        link: '/sounds/Charleston_fermee_3.mp3',
    },
    {
        id: null,
        key: 'y',
        link: '/sounds/Cymbale_ride_4.mp3',
    },
    {
        id: null,
        key: 'u',
        link: '/sounds/Tom_aigu_1.mp3',
    },
    {
        id: null,
        key: 'i',
        link: '/sounds/Tom_grave_1.mp3',
    },
    {
        id: null,
        key: 'o',
        link: '/sounds/Tom_grave_4.mp3',
    }
];
(new Soundboard(sounds)).createListSounds();
