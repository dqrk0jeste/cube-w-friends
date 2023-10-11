let roundOn = false;
let nextRoundInterval;
const roomCode = (Number)(location.pathname.substring(11));

let time;
let timerId;
const timesList = [];

let plusTwoPenalty = 0;
let dnfPenalty = false;
let timeSubmitted = false;
let timed = false;

const socket = io();

const usersModal = document.getElementById('users-modal-body');
const timesModal = document.getElementById('times-modal-body');
const myTimesModal = document.getElementById('my-times-modal-body');
const finishers = document.getElementById('finishers');
const scrambleElement = document.getElementById('scramble');
const winnersModal = document.getElementById('winners-modal');
const nextRoundTimer = document.getElementById('next-round-timer');
const resultsList = document.querySelector('#winners-modal .modal-body');
const timer = document.getElementById('timer');
const ao5Element = document.getElementById('ao5');
const ao12Element = document.getElementById('ao12');
const ao50Element = document.getElementById('ao50');
const ao100Element = document.getElementById('ao100');
const plusTwoButton = document.getElementById('plus-two-button');
const dnfButton = document.getElementById('dnf-button');
const submitModal = document.getElementById('submit-modal');
const submitButton = document.getElementById('submit-button');
const submitTime = document.getElementById('submit-time');
const timesListElement = document.querySelector('.times');
const usersTabElement = document.getElementById('users-tab');
