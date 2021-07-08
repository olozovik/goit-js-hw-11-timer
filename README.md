######################################### Таймер обратного отсчета - version 1 ####
#########################################

Создай плагин настраиваемого таймера, который ведет обратный отсчет до предварительно определенной
даты. Такой плагин может использоваться в блогах и интернет-магазинах, страницах регистрации
событий, во время технического обслуживания и т. д.

preview

Плагин ожидает следующую HTML-разметку и показывает четыре цифры: дни, часы, минуты и секунды в
формате XX:XX:XX:XX. Количество дней может состоять из более чем двух цифр.

<div class="timer" id="timer-1">
  <div class="field">
    <span class="value" data-value="days">11</span>
    <span class="label">Days</span>
  </div>

  <div class="field">
    <span class="value" data-value="hours">11</span>
    <span class="label">Hours</span>
  </div>

  <div class="field">
    <span class="value" data-value="mins">11</span>
    <span class="label">Minutes</span>
  </div>

  <div class="field">
    <span class="value" data-value="secs">11</span>
    <span class="label">Seconds</span>
  </div>
</div>
Плагин это класс CountdownTimer, экземпляр которого создает новый таймер с настройками.

new CountdownTimer({ selector: '#timer-1', targetDate: new Date('Jul 17, 2019'), }); Для подсчета
значений используй следующие готовые формулы, где time - разница между targetDate и текущей датой.

/\*

- Оставшиеся дни: делим значение UTC на 1000 _ 60 _ 60 \* 24, количество
- миллисекунд в одном дне (миллисекунды _ секунды _ минуты _ часы) _/ const days = Math.floor(time /
  (1000 _ 60 _ 60 \* 24));

/\*

- Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
- остатка % и делим его на количество миллисекунд в одном часе
- (1000 _ 60 _ 60 = миллисекунды _ минуты _ секунды) _/ const hours = Math.floor((time % (1000 _ 60
  _ 60 _ 24)) / (1000 _ 60 _ 60));

/\*

- Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
- миллисекунд в одной минуте (1000 _ 60 = миллисекунды _ секунды) _/ const mins = Math.floor((time %
  (1000 _ 60 _ 60)) / (1000 _ 60));

/\*

- Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
- миллисекунд в одной секунде (1000) _/ const secs = Math.floor((time % (1000 _ 60)) / 1000);

######################################### Таймер обратного отсчета - version 2 ####
#########################################

Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты. Такой таймер может
использоваться в блогах и интернет-магазинах, страницах регистрации событий, во время технического
обслуживания и т. д.

preview

В HTML есть готовая разметка таймера, поле для выбора конечной даты и кнопка, при клике по которой
таймер должен запускаться. Добавь минимальное оформление элементов интерфейса.

<input type="date" id="date-selector" />
<button type="button" data-start>Start countdown</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>11</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>11</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>11</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>11</span>
    <span class="label">Seconds</span>
  </div>
</div>
Если пользователь выбрал дату в прошлом, необходимо показать уведомление "Please choose a date in the future". Используй библиотеку sweetalert2.
Кнопка должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
Если выбрана валидная дата и пользователь нажал кнопку - начинается отсчет времени.
Скрипт должен вычислять раз в секунду сколько времени осталось до указанной даты и обновлять интерфейс, показывая четыре цифры: дни, часы, минуты и секунды в формате xx:xx:xx:xx. Количество дней может состоять из более чем двух цифр.

Для подсчета значений используй готовую функцию, где ms - разница между конечной и текущей датой в
миллисекундах.

function convertMs(ms) { // Number of milliseconds per unit of time const second = 1000; const
minute = second _ 60; const hour = minute _ 60; const day = hour \* 24;

// Remaining days const days = Math.floor(ms / day); // Remaining hours const hours = Math.floor((ms
% day) / hour); // Remaining minutes const minutes = Math.floor(((ms % day) % hour) / minute); //
Remaining seconds const seconds = Math.floor((((ms % day) % hour) % minute) / second);

return { days, hours, minutes, seconds }; }

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); //{days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}
