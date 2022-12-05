import React from 'react'
import { Box, BoxProps } from '../../uikit'

const Container: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box px={['16px', '24px']} mx="auto" maxWidth="1400px" {...props}>
    {children}
  </Box>
)

export default Container
