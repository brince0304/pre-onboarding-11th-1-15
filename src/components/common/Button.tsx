import React from 'react'
import { Sbutton } from './Button.style'


export interface IButton extends Omit<React.HTMLProps<HTMLButtonElement>, 'size'> {
    size: 'small' | 'medium' | 'large'
}

function Button({size, name, ...props}:IButton) {
  return (
    <Sbutton size={size} {...props}>{name}</Sbutton>
  )
}

export default Button
