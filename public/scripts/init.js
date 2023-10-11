let roundOn = false;
let nextRoundInterval;
const roomCode = (Number)(location.pathname.substring(11));

let time;
let timerId;
const timesList = [];

const socket = io();

const usersModal = document.getElementById('users-modal-body');
const timesModal = document.getElementById('times-modal-body');
const finishers = document.getElementById('finishers');
const scrambleElement = document.getElementById('scramble');
const winnersModal = document.getElementById('winners-modal');
const nextRoundTimer = document.getElementById('next-round-timer');
const resultsList = document.querySelector('#winners-modal .modal-body');
const timer = document.getElementById('timer');
