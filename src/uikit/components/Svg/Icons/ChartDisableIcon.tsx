import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 18 16" {...props} fill="transparent">
      <path d="M17.2727 14.3636H1.63636V0.181818C1.63636 0.0818182 1.55455 0 1.45455 0H0.181818C0.0818182 0 0 0.0818182 0 0.181818V15.8182C0 15.9182 0.0818182 16 0.181818 16H17.2727C17.3727 16 17.4545 15.9182 17.4545 15.8182V14.5455C17.4545 14.4455 17.3727 14.3636 17.2727 14.3636ZM4.04091 10.8568C4.11136 10.9273 4.225 10.9273 4.29773 10.8568L7.44091 7.72955L10.3409 10.6477C10.4114 10.7182 10.5273 10.7182 10.5977 10.6477L16.8568 4.39091C16.9273 4.32046 16.9273 4.20455 16.8568 4.13409L15.9568 3.23409C15.9226 3.20025 15.8765 3.18127 15.8284 3.18127C15.7803 3.18127 15.7342 3.20025 15.7 3.23409L10.4727 8.45909L7.57727 5.54545C7.5431 5.51162 7.49695 5.49264 7.44886 5.49264C7.40077 5.49264 7.35463 5.51162 7.32046 5.54545L3.14318 9.69773C3.10934 9.7319 3.09036 9.77805 3.09036 9.82614C3.09036 9.87423 3.10934 9.92037 3.14318 9.95455L4.04091 10.8568Z" fill="#CDEDFF"/>
    </Svg>
  )
}

export default Icon
