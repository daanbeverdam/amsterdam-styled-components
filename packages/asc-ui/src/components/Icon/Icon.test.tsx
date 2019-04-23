import * as React from 'react'
import { renderWithTheme } from 'asc-ui/src/utils/withTheme'
import Icon from './Icon'
import 'jest-styled-components'

describe('Icon', () => {
  it('should render the icon', () => {
    const component = renderWithTheme(
      <Icon inline size={24} padding={4}>
        icon-content
      </Icon>,
    )
    expect(component).toMatchSnapshot()
  })
})
