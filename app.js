// 最終出社日を定義する
const LAST_DATE = new Date('2018-08-17')

// 土日祝以外の休業日(有給取得などでの自主休業日など)を定義する
// 'YYYY-MM-DD'形式で列挙する
const EXCEPTIONAL_HOLIDAYS = [
  '2018-07-19',
  '2018-07-20'
]
.map(h => beginningOfDay(new Date(h)))


// 定義順を無視して呼びたいためfunction定義する
function beginningOfDay (date)  {
  const newDate = new Date(date)
  newDate.setHours(0)
  newDate.setMinutes(0)
  newDate.setSeconds(0, 0)

  return newDate
}

const isSameDate = (date1, date2) => date1.getTime() === date2.getTime()

const isExceptionalHoliday = date => EXCEPTIONAL_HOLIDAYS.some(h => isSameDate(h, date))

const isSundayOrSaturday = date => {
  const SUNDAY = 0
  const SATURDAY = 6

  return [SUNDAY, SATURDAY].includes(date.getDay())
}

const isWorkday = date => !isSundayOrSaturday(date) && !JapaneseHolidays.isHoliday(date) && !isExceptionalHoliday(date)

const generateDate = () => beginningOfDay(new Date())

const tomorrow = () => addDays(generateDate(), 1)

const addDays = (date, number) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + number)

  return newDate
}

const range = size => size > 0 ? Array.from(Array(size).keys()) : []

const daysTillDay = (beginDate, endDate) => {
  const diffMilliSeconds = endDate.getTime() - beginDate.getTime()

  return Math.ceil(diffMilliSeconds / (1000 * 60 * 60 * 24))
}

const dates = (beginDate, endDate) => {
  const days = daysTillDay(beginDate, endDate)

  return range(days).map(n => addDays(beginDate, n))
}

const render = () => {
  const workdays = dates(tomorrow(), LAST_DATE).filter(isWorkday).length

  const message = workdays > 0 ? `最終出社日まで残り${workdays}営業日です! (今日除く)` : '長い間お疲れ様でした!!'

  document.getElementById('message').textContent = message
}

window.onload = () => {
  render()

  const interval = 60 * 1000
  setInterval(render, interval)
}
