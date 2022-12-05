import styled from 'styled-components'
import { StyledMenuItemProps } from './types'

export const StyledMenuItemContainer = styled.div<StyledMenuItemProps>`
  position: relative;

  ${({ $isActive, $variant, theme }) =>
    $isActive &&
    $variant === 'subMenu' &&
    `
      &:after{
        content: "";
        position: absolute;
        bottom: 0;
        height: 4px;
        width: 100%;
        background-color: ${theme.colors.primary};
        border-radius: 2px 2px 0 0;
      }
    `};
`

const StyledMenuItem = styled.a<StyledMenuItemProps>`
  position: relative;
  display: flex;
  align-items: center;

  color: ${({ $isActive }) => ($isActive ? '#4E89E3' : '#505050')};
  font-size: 15px;
  line-height: 15px;
  font-style: normal;
  font-weight: ${({ $isActive }) => ($isActive ? 'normal' : 'normal')};
  background-color: ${({ $isActive }) => ($isActive ? '#E7F7FF' : 'transparet')};
  border-radius: 4px;

  ${({ $statusColor, theme }) =>
    $statusColor &&
    `
    &:after {
      content: "";
      border-radius: 100%;
      background: ${theme.colors[$statusColor]};
      height: 8px;
      width: 8px;
      margin-left: 12px;
    }
  `}

  ${({ $variant }) =>
    $variant === 'default'
      ? `
    padding: 0 13px;
    height: 43px;
  `
      : `
    padding: 4px 4px 0px 4px;
    height: 42px;
  `}

  &:hover {
    color: #4E89E3;
  }
`

export default StyledMenuItem
