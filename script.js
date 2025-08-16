
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


function togglePlay() {
 
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
  console.log('Button updated:', icon);
}

function skip() {

  const skipTime = parseFloat(this.dataset.skip);
  video.currentTime += skipTime;
  console.log(`Skipped ${skipTime} seconds`);
}

function handleRangeUpdate() {

  video[this.name] = this.value;
  console.log(`Updated ${this.name} to:`, this.value);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}


function scrub(e) {
 
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log('Scrubbed to:', scrubTime);
}

function handleVideoError() {
  console.error('Video failed to load');
}

toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);


skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

video.addEventListener('error', handleVideoError);

video.addEventListener('click', togglePlay);

console.log('Video player initialized');

video.addEventListener('loadedmetadata', () => {
  console.log('Video loaded successfully');
  console.log('Duration:', video.duration);
});