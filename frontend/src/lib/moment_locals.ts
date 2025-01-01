import moment from 'moment-timezone'
moment.tz.setDefault('Asia/Bishkek')
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
]
const monthsShort = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек"
]
const weekdays = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье"
]

const weekdaysShort = [
  "Пн",
  "Вт",
  "Ср",
  "Чт",
  "Пт",
  "Сб",
  "Вс"
]
const weekdaysMin = [
  "П",
  "В",
  "С",
  "Ч",
  "П",
  "С",
  "В"
]
const longDateFormat = {
  LT: 'HH:mm',
  LTS: 'HH:mm:ss',
  L: 'DD/MM/YYYY',
  LL: 'D MMMM YYYY',
  LLL: 'D MMMM YYYY HH:mm',
  LLLL: 'dddd D MMMM YYYY HH:mm',
}

const helpers = {
  dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
  ordinal: function (number: number) {
    return number + (number === 1 ? 'er' : 'e')
  },
  meridiemParse: /PD|MD/,
  isPM: function (input: string) {
    return input.charAt(0) === 'M'
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // Used to determine first week of the year.
  },
}

moment.updateLocale('ky', {
  months,
  monthsShort,
  monthsParseExact: true,
  weekdays,
  weekdaysShort,
  weekdaysMin,
  weekdaysParseExact: true,
  longDateFormat,
  calendar: {
    sameDay: '[Бүгүн] LT',
    nextDay: '[Эртең] LT',
    nextWeek: 'dddd [саат] LT',
    lastDay: '[Кечээ] LT',
    lastWeek: 'dddd [өткөн аптада саат] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'келерки %s',
    past: '%s мурун',
    s: 'нече секунд',
    m: 'минута',
    mm: '%d мүнөт',
    h: 'саат',
    hh: '%d саат',
    d: 'күн',
    dd: '%d күн',
    M: 'ай',
    MM: '%d ай',
    y: 'жыл',
    yy: '%d жыл'
  },
  ...helpers
})

moment.updateLocale('ru', {
  months,
  monthsShort,
  monthsParseExact: true,
  weekdays,
  weekdaysShort,
  weekdaysMin,
  weekdaysParseExact: true,
  longDateFormat,
  calendar: {
    sameDay: '[Сегодня в] LT',
    nextDay: '[Завтра в] LT',
    nextWeek: 'dddd [в] LT',
    lastDay: '[Вчера в] LT',
    lastWeek: 'dddd [на прошлой неделе в] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'через %s',
    past: '%s назад',
    s: 'несколько секунд',
    m: 'минута',
    mm: '%d минут',
    h: 'час',
    hh: '%d часов',
    d: 'день',
    dd: '%d дней',
    M: 'месяц',
    MM: '%d месяцев',
    y: 'год',
    yy: '%d лет'
  },
  ...helpers
})


moment.updateLocale('en', {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  monthsShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  monthsParseExact: true,
  weekdays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  weekdaysShort: [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
  ],
  weekdaysMin: [
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
    "S"
  ],
  weekdaysParseExact: true,
  longDateFormat,
  calendar: {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: 'dddd [last week at] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  },
  ...helpers
})