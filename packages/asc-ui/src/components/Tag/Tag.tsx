import React from 'react'
import TagStyle, { Props as TagStyleProps } from './TagStyle'

export type Props = TagStyleProps & React.HTMLAttributes<HTMLSpanElement>

const Tag: React.FC<Props> = ({ children, as, ...otherProps }) => (
  <TagStyle forwardedAs={as} {...otherProps}>
    {children}
  </TagStyle>
)

Tag.defaultProps = {
  as: 'span',
  colorType: 'primary',
  colorSubtype: 'main',
}

export default Tag
