import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Flex } from '../Box'
import MenuItem from './MenuItem'
import { MenuItemProps } from './types'

export default {
  title: 'Components/Menu/MenuItem',
  component: MenuItem,
}

export const Template: React.FC<MenuItemProps> = ({ children, ...args }) => {
  return (
    <BrowserRouter>
      <Flex>
        <MenuItem {...args}>{children}</MenuItem>
      </Flex>
    </BrowserRouter>
  )
}
