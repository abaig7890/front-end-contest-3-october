const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startTimerButton = document.getElementById('start-timer');
const activeTimersContainer = document.querySelector('.active-timers');
const timerEndContainer = document.querySelector('.timer-end');

const audio = new Audio('your-audio-file.mp3'); // Replace with your desired audio file

let timers = [];

startTimerButton.addEventListener('click', () => {
    const hours = parseInt(hoursInput.value);
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || hours < 0 || minutes < 0 || seconds < 0 || hours > 99 || minutes > 59 || seconds > 59) {
        alert('Please enter valid values for hours, minutes, and seconds.');
        return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const timerElement = document.createElement('div');
    timerElement.classList.add('active-timer');

    timerElement.innerHTML = `
        <p>Time Remaining: ${formatTime(totalSeconds)}</p>
        <button class="stop-timer">Stop Timer</button>
    `;

    activeTimersContainer.appendChild(timerElement);

    const stopButton = timerElement.querySelector('.stop-timer');
    stopButton.addEventListener('click', () => {
        clearInterval(timers[timers.length - 1].intervalId);
        activeTimersContainer.removeChild(timerElement);
        timers.pop();
    });

    const intervalId = setInterval(() => {
        totalSeconds--;

        if (totalSeconds < 0) {
            clearInterval(intervalId);
            timerElement.innerHTML = `
                <p>Timer Ended!</p>
            `;
            timerEndContainer.style.display = 'block';
            audio.play();
        } else {
            timerElement.querySelector('p').textContent = `Time Remaining: ${formatTime(totalSeconds)}`;
        }
    }, 1000);

    timers.push({ intervalId });
});

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemaining = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
}