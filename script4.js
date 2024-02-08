const padreContainer = document.querySelector('.player');
const controls = document.querySelector('.controls');
const media = document.querySelector("video");
const button = document.querySelector(".play i");
const buttonMuted = document.querySelector('.muted i');
const timer = document.querySelector("span");
const timerWrapper = document.querySelector(".progress-timer");
const timerBar = document.querySelector(".progress-timer div");
const currentTime = document.getElementById('currentTimer');
const volumen = document.querySelector('#volumeRange');
const nextVideo = document.querySelector('#nextVideo');
const selectSpeed = document.querySelector('.selectSpeed');

padreContainer.addEventListener('mouseover', () => {
    if(media.play){
        controls.style.display = "flex";
    }
});

padreContainer.addEventListener('mouseleave', () => {
    if(media.paused){
        controls.style.display = "flex";
    } else {
        controls.style.display = "none";
    }
});


padreContainer.addEventListener('click', (e) => {
    if(e.target.className === "video" || 
    e.target.className === "fa-solid fa-play" || 
    e.target.className === "fa-solid fa-pause"){
        if (media.paused) {
            button.className = 'fa-solid fa-pause';
            media.play();
        } else {
            button.className = 'fa-solid fa-play';
            media.pause();
        }
    }

    if(e.target.className === 'fa-solid fa-forward-step'){
        const min = 1;
        const max = 5;
        const random = Math.floor(Math.random() * (max - min + 1)) + min;

        const href = `./video${random}.html`;

        nextVideo.setAttribute("href", href);
    }

    if(e.target.className === 'fa-solid fa-volume-low' ||
    e.target.className === 'fa-solid fa-volume-xmark'){
        media.muted = !media.muted;

        if (media.muted) {
            buttonMuted.className = 'fa-solid fa-volume-xmark'
        } else {
            buttonMuted.className = 'fa-solid fa-volume-low'
        }
    }

    if(e.target.className === 'fa-solid fa-expand'){
        if (!document.fullscreenElement) {
            if (padreContainer.requestFullscreen) {
                padreContainer.requestFullscreen();
                media.style.width = "100%";
                media.style.height = "100%";
            } else if (padreContainer.webkitRequestFullscreen) {
                padreContainer.webkitRequestFullscreen();
            } else if (padreContainer.msRequestFullscreen) {
                padreContainer.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    if(e.target.className === "barra" || 
    e.target.className === "progress-timer"){
        const rect = timerWrapper.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const percentage = offsetX / rect.width;
        const newTime = percentage * media.duration;
        media.currentTime = newTime;
    }
});


media.addEventListener("timeupdate", function () {
    const minutes = Math.floor(media.currentTime / 60);
    const seconds = Math.floor(media.currentTime - minutes * 60);

    const minuteValue = minutes.toString().padStart(1, "0");
    const secondValue = seconds.toString().padStart(2, "0");

    const mediaTime = `${minuteValue}:${secondValue}`;
    timer.textContent = mediaTime;
  
    const barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
    timerBar.style.width = `${barLength}px`;
});



media.addEventListener('loadedmetadata', function() {
    const totalTimeMinutes = Math.floor(media.duration / 60).toString().padStart(1, "0");
    const totalTimeSeconds = Math.floor(media.duration - totalTimeMinutes * 60).toString().padStart(2, "0");
    currentTime.textContent = `/ ${totalTimeMinutes}:${totalTimeSeconds}`;
});

volumen.addEventListener('input', function(e) {
    const newVolumen = e.target.value;

    media.volume = newVolumen;
    volumen(newVolumen);
});

selectSpeed.addEventListener('change', function(e) {
    const newPlaybackRate = e.target.value;

    media.playbackRate = newPlaybackRate;
    selectSpeed(newPlaybackRate);
});