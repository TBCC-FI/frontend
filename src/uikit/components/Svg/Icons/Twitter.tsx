import * as React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps & { fillColor?: string }> = ({ ...props }) => {
  return (
    <Svg width={props.width || "16"} height={props.height || "14"} viewBox="0 0 16 14" fill="none" {...props}>
      <path d="M16 1.70599C15.405 1.96699 14.771 2.13999 14.11 2.22399C14.79 1.81799 15.309 1.17999 15.553 0.410992C14.919 0.788992 14.219 1.05599 13.473 1.20499C12.871 0.563992 12.013 0.166992 11.077 0.166992C9.261 0.166992 7.799 1.64099 7.799 3.44799C7.799 3.70799 7.821 3.95799 7.875 4.19599C5.148 4.06299 2.735 2.75599 1.114 0.764992C0.831 1.25599 0.665 1.81799 0.665 2.42299C0.665 3.55899 1.25 4.56599 2.122 5.14899C1.595 5.13899 1.078 4.98599 0.64 4.74499C0.64 4.75499 0.64 4.76799 0.64 4.78099C0.64 6.37499 1.777 7.69899 3.268 8.00399C3.001 8.07699 2.71 8.11199 2.408 8.11199C2.198 8.11199 1.986 8.09999 1.787 8.05599C2.212 9.35499 3.418 10.31 4.852 10.341C3.736 11.214 2.319 11.74 0.785 11.74C0.516 11.74 0.258 11.728 0 11.695C1.453 12.632 3.175 13.167 5.032 13.167C11.068 13.167 14.368 8.16699 14.368 3.83299C14.368 3.68799 14.363 3.54799 14.356 3.40899C15.007 2.94699 15.554 2.36999 16 1.70599Z" fill={props.fill || "#757591"}/>
    </Svg>
  )
}

export default Icon