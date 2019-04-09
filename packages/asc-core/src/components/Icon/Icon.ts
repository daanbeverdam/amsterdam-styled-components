import { Theme } from '../../theme'
import styled from '../../styled-components'
import fillSVG from '../../utils/fillSVG'

type Props = {
  color?: Theme.TypeLevel
  iconUrl?: string
  size?: number
}

const Icon = styled.span<Props>`
  display: block;
  ${({ iconUrl }) => iconUrl && `background-image: ${iconUrl}`}
  ${({ size }) => `width: ${size}px; height: ${size}px;`}

  & > svg {
    width: inherit;
    height: inherit;
    ${({ color, theme }) => fillSVG(theme, color)};
`

Icon.defaultProps = {
  size: 20,
}

export default Icon
