export class CountdownTimer {
  constructor({
    selector,
    targetDate,
    daysField,
    hoursField,
    minutesField,
    secondsField,
  }) {
    this.timerId;
    this.selector = selector;
    this.targetDate = targetDate;
    this.daysField = daysField;
    this.hoursField = hoursField;
    this.minutesField = minutesField;
    this.secondsField = secondsField;
    this.timeRemain;
  }

  pad(number) {
    return String(number).padStart(2, '0');
  }

  padDays(days) {
    const stringDays = String(days);
    if (stringDays.length < 2) {
      return this.pad(days);
    }
    return stringDays;
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.padDays(Math.floor(ms / day));
    const hours = this.pad(Math.floor((ms % day) / hour));
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.pad(
      Math.floor((((ms % day) % hour) % minute) / second),
    );

    return { days, hours, minutes, seconds };
  }

  getTimeRemainMs() {
    const targetTime = new Date(this.targetDate).getTime();
    const currentTime = new Date().getTime();
    const diffTime = targetTime - currentTime;
    if (diffTime < 1) {
      return 0;
    }
    return diffTime;
  }

  getTimeRemain() {
    return this.convertMs(this.getTimeRemainMs());
  }

  renderCountdown() {
    this.timeRemain = this.getTimeRemain();
    this.daysField.textContent = this.timeRemain.days;
    this.hoursField.textContent = this.timeRemain.hours;
    this.minutesField.textContent = this.timeRemain.minutes;
    this.secondsField.textContent = this.timeRemain.seconds;
  }

  startCountdown() {
    this.renderCountdown();

    clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      if (this.getTimeRemainMs(this.targetDate) === 0) {
        clearInterval(this.timerId);
        this.isTimerOn = false;
        return;
      }
      this.renderCountdown();
    }, 1000);
  }
}
