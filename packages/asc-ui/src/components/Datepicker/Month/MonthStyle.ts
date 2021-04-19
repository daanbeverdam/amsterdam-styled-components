import styled from 'styled-components'
// import { themeColor, themeSpacing } from '../../../utils'
import Link from '../../Link'

export interface Props {
  date?: string
}

export default styled.div<Props>`
  width: 282px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid black;
`

export const Weekday = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 18px;
  font-size: 14px;
  width: 40px;
  height: 32px;
`

export const Header = styled.div`
  width: 282px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`

export const NextPrev = styled(Link)`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Title = styled.div`
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Day = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`

export const OutsideDay = styled.span`
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`
