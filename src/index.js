import Swal from 'sweetalert2';
import { CountdownTimer } from './js/countdownTimer';
import './sass/main.scss';

const refs = {
  date: document.querySelector('#date-selector'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const errorDateSettingsSweetalert2 = {
  text: 'Please choose a date in the future',
  toast: true,
  position: 'top',
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: true,
  icon: 'warning',
  iconColor: 'tomato',
};

refs.startBtn.disabled = true;
let targetDate;

refs.date.addEventListener('change', checkDate);

function checkDate() {
  targetDate = new Date(refs.date.valueAsDate.setHours(0));
  console.log(targetDate);
  const currentDate = new Date();

  if (!refs.date.value) {
    Swal.fire(errorDateSettingsSweetalert2);
    return;
  }
  if (targetDate - currentDate < 1) {
    Swal.fire(errorDateSettingsSweetalert2);
    return;
  }
  refs.startBtn.disabled = false;
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: targetDate,
  daysField: refs.days,
  hoursField: refs.hours,
  minutesField: refs.minutes,
  secondsField: refs.seconds,
});

refs.startBtn.addEventListener('click', () => {
  timer.targetDate = targetDate;
  timer.startCountdown();
});
