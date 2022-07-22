// [1] [start] [footer] [countdown__section]
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const newYear = "01 Jan 2023";

function countDown() {
  const endDate = new Date(newYear);
  const currentDate = new Date();
  console.log((endDate - currentDate) / 1000 / 3600);
  const totalSeconds = (endDate - currentDate) / 1000;
  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;
  daysEl.innerHTML = days;
  hoursEl.innerHTML = formatTime(hours);
  secondsEl.innerHTML = formatTime(seconds);
  minutesEl.innerHTML = formatTime(minutes);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}
countDown();
setInterval(countDown, 1000);
