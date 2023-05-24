const ticketElement = document.getElementById('current-ticket');
const countdownElement = document.getElementById('countdown');
const newTicketButton = document.getElementById('new-ticket-button');
const tick = document.querySelector(".wrapper");

let ticketNumber = 0;
let totalTimeLeft = 0;

btn.onclick = function () {
	if (tick.style.top == "10px") {
		tick.style.display = "none";
		tick.style.top = "-720px";
		btn.style.animationPlayState = "running";
		btn.innerHTML = "PRINT TICKET";
	} else {
		tick.style.display = "block";
		setTimeout(continueFunction, 100);
	}
};
function continueFunction() {
	tick.style.top = "10px";
	btn.style.animationPlayState = "paused";
	btn.innerHTML = "WAIT...";
	setTimeout(restartAnimation, 1000); //correspond au temps pendant lequel le message 'wait...' sera affiché. À changer si le temps de descente du ticket est changée aussi.
}
function restartAnimation() {
	btn.style.animationPlayState = "running";
	btn.innerHTML = "TAKE TICKET";
}

newTicketButton.addEventListener('click', () => {
  ticketNumber++;
  calculateTotalTimeLeft();
  const timer = 10 + totalTimeLeft;

  const currentTicket = document.createElement('div');
  currentTicket.classList.add('ticket');
  ticketElement.appendChild(currentTicket);

  const currentCountdown = document.createElement('div');
  currentCountdown.classList.add('countdown');
  currentCountdown.dataset.timeLeft = timer;
  countdownElement.appendChild(currentCountdown);

  const countdown = startCountdown(timer, currentCountdown, null, currentTicket);

  totalTimeLeft = timer;
});

function calculateTotalTimeLeft() {
  totalTimeLeft = 0;
  const countdownElements = document.querySelectorAll('#countdown .countdown');
  countdownElements.forEach((countdownElement) => {
    const timeLeft = parseInt(countdownElement.dataset.timeLeft, 10);
    totalTimeLeft = timeLeft;
  });
}

function startCountdown(duration, displayElement, timeLeftElement, currentTicket) {
  let timer = duration,
    minutes,
    seconds;

  const countdownInterval = setInterval(function() {
    minutes = Math.floor(timer / 60);
    seconds = Math.floor(timer % 60);
    displayElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    displayElement.dataset.timeLeft = timer;

    if (--timer < 0) {
      clearInterval(countdownInterval);
      if (timeLeftElement) {
        const timeLeft = parseInt(timeLeftElement.dataset.timeLeft, 10);
        totalTimeLeft -= timeLeft;
        timeLeftElement.parentNode.removeChild(timeLeftElement);
      }

      currentTicket.parentNode.removeChild(currentTicket);
      displayElement.parentNode.removeChild(displayElement);
    }
  }, 1000);

  return countdownInterval;
}
