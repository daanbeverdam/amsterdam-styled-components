import { FunctionComponent, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from '@amsterdam/asc-assets'
import Icon from '../../Icon'
import MonthStyle, {
  Props,
  Weekday,
  Header,
  NextPrev,
  Title,
  Day,
  OutsideDay,
} from './MonthStyle'
import { weekDays, months, daysInMonth } from '../../shared/constants'

// @TODO add numbers of prev month
// @TODO add support for click events of Month days

const Month: FunctionComponent<Props> = ({ date }) => {
  const [firstDay, setFirstDay] = useState<any>(new Date())
  const [month, setMonth] = useState<number>(new Date().getMonth())
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [allDays, setAllDays] = useState<any>([])

  useEffect(() => {
    // const parts = '15-04-2021'.split('-')
    setFirstDay(new Date(new Date(`2021/4/1`)))
    setMonth(firstDay.getMonth() + 1)
    setYear(firstDay.getFullYear())
    renderDays(firstDay.getMonth() + 1, firstDay.getFullYear())
  }, [])

  useEffect(() => {
    setMonth(firstDay.getMonth() + 1)
    setYear(firstDay.getFullYear())
    renderDays(firstDay.getMonth() + 1, firstDay.getFullYear())
  }, [firstDay, setMonth, setYear])

  const onPrevious = (e: any) => {
    e.preventDefault()
    const newYear = year - (month === 1 ? 1 : 0)
    const newMonth = month - 1
    setFirstDay(new Date(`${newYear}/${month === 1 ? 12 : newMonth}/1`))
  }

  const onNext = (e: any) => {
    e.preventDefault()
    const newYear = year + (month === 12 ? 1 : 0)
    const newMonth = month + 1
    setFirstDay(new Date(`${newYear}/${month === 12 ? 1 : newMonth}/1`))
  }

  const numberOfDays = (mnth: number) => {
    if (mnth === 1 && year % 4 === 0) {
      return 29
    }
    return daysInMonth[mnth]
  }

  const renderDays = (thisMonth: number, thisYear: number) => {
    const days: any = []
    console.log('renderDays', thisMonth, thisYear)

    for (let i = 0; i < firstDay.getDay() - 1; i += 1) {
      days.push({ number: '*', outside: true, key: days.length })
    }

    for (let i = 1; i <= numberOfDays(thisMonth - 1); i += 1) {
      days.push({
        number: i,
        date: `${i}-${thisMonth}-${thisYear}`,
        outside: false,
        key: days.length,
      })
    }

    let emptyDays = 35
    const count = days.length
    if (count === 28) {
      emptyDays = 0
    }
    if (count > 35) {
      emptyDays = 42
    }
    if (emptyDays) {
      for (let i = 1; i < emptyDays - count + 1; i += 1) {
        days.push({
          number: i,
          date: `${i}-${thisMonth === 12 ? 1 : thisMonth + 1}-${
            thisMonth === 12 ? thisYear + 1 : thisYear
          }`,
          outside: true,
          key: days.length,
        })
      }
    }
    console.log('renderDays =', days)

    setAllDays(days)
  }

  // console.log('Month ', month, year, firstDay)

  return (
    <MonthStyle>
      <Header>
        <NextPrev href="/" variant="blank" onClick={(e: any) => onPrevious(e)}>
          <Icon>
            <ChevronLeft />
          </Icon>
        </NextPrev>
        <Title>
          {months[month - 1]} {year} {month}
        </Title>
        <NextPrev href="/" variant="blank" onClick={(e: any) => onNext(e)}>
          <Icon>
            <ChevronRight />
          </Icon>
        </NextPrev>
      </Header>

      {weekDays.map((day) => (
        <Weekday key={day}>{day}</Weekday>
      ))}

      {allDays.map((day: any) => (
        <>
          {day.outside && <OutsideDay key={day.key}>{day.number}</OutsideDay>}
          {!day.outside && <Day key={day.key}>{day.number}</Day>}
        </>
      ))}
    </MonthStyle>
  )
}

export default Month
