//Fem que es cridi la funció 'sona()' quan es faci click sobre un div de la classe 'boto'
$(".boto").on("click", sona);

//Fem que s'executi la funció soAcabat() cada cop que un audio acabi de sonar (classe 'so')
$(".so").on("ended", soAcabat);

function sona(event) {
    //Recuperem el número que hem emmagatzemat a cada botó (data-posicio el recuperem amb element.dataset.posicio)
    let posicio = this.dataset.posicio;

    //Fem que al div que ha estat clicat se li afegeixi la classe 'sonant' si no la tenia, o que se la tregui si ja la tenia amb 'element.classList.toggle("classe")
    this.classList.toggle("sonant");

    //Si el botó té la classe 'sonant', posem en marxa l'audio. Si no la té, el pausem
    if (this.classList.contains("sonant")) {
        document.getElementById("video" + posicio).play();
        document.getElementById("audio" + posicio).play();
    } else {
        document.getElementById("video" + posicio).pause();
        document.getElementById("audio" + posicio).pause();
    }
}


function soAcabat() {
    //Aquesta funció s'executarà quan un audio arribi al final. Fem que el seu element pare (parentElement) deixi de tenir la classe 'sonant' per què es vegi desactivat
    this.parentElement.classList.remove("sonant");
}

function windowResized() {
    midaAnterior = mida;
    mida = midaFinestra();
    resizeCanvas(mida, mida);
    this.camera.position.x = width / 2;
    this.camera.position.y = height / 2;
    creaPlataformes();
}

const media = document.querySelector('video');
const controls = document.querySelector('.controls');

const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');


media.removeAttribute('controls');
controls.style.visibility = 'visible';


play.addEventListener('click', playPauseMedia);

function playPauseMedia() {
  if(media.paused) {
    play.setAttribute('data-icon','u');
    media.play();
  } else {
    play.setAttribute('data-icon','P');
    media.pause();
  }
}
stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);
function stopMedia() {
  media.pause();
  media.currentTime = 0;
  play.setAttribute('data-icon','P');
}
rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);
let intervalFwd;
let intervalRwd;

function mediaBackward() {
  clearInterval(intervalFwd);
  fwd.classList.remove('active');

  if(rwd.classList.contains('active')) {
    rwd.classList.remove('active');
    clearInterval(intervalRwd);
    media.play();
  } else {
    rwd.classList.add('active');
    media.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}

function mediaForward() {
  clearInterval(intervalRwd);
  rwd.classList.remove('active');

  if(fwd.classList.contains('active')) {
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    media.play();
  } else {
    fwd.classList.add('active');
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}
function windBackward() {
  if(media.currentTime <= 3) {
    rwd.classList.remove('active');
    clearInterval(intervalRwd);
    stopMedia();
  } else {
    media.currentTime -= 3;
  }
}

function windForward() {
  if(media.currentTime >= media.duration - 3) {
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    stopMedia();
  } else {
    media.currentTime += 3;
  }
}
media.addEventListener('timeupdate', setTime);
function setTime() {
  let minutes = Math.floor(media.currentTime / 60);
  let seconds = Math.floor(media.currentTime - minutes * 60);
  let minuteValue;
  let secondValue;

  if (minutes < 10) {
    minuteValue = '0' + minutes;
  } else {
    minuteValue = minutes;
  }

  if (seconds < 10) {
    secondValue = '0' + seconds;
  } else {
    secondValue = seconds;
  }

  let mediaTime = minuteValue + ':' + secondValue;
  timer.textContent = mediaTime;

  let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
  timerBar.style.width = barLength + 'px';
}
rwd.classList.remove('active');
fwd.classList.remove('active');
clearInterval(intervalRwd);
clearInterval(intervalFwd);

document.onclick = function(e) {
  console.log(e.x) + ',' + console.log(e.y)
}

