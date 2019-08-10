import styled from '@datapunt/asc-core'
import { color } from '../../../utils'
import ButtonStyle, { Props as ButtonProps } from '../ButtonStyle'

export type Props = {
  open?: boolean
  size?: number
} & ButtonProps

export default styled(ButtonStyle)<Props>`
  background-color: ${({ open, theme }) =>
    color('tint', open ? 'level2' : 'level1')({ theme })};

  &:hover,
  &:focus {
    background-color: ${({ theme, open }) =>
      color('tint', open ? 'level3' : 'level2')({ theme })};
  }
`