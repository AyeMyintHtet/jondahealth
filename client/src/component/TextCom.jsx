import React from 'react'
import { StyledTextCom } from '../theme/TextCom'

const TextCom = ({ color, as, align, children, ...props }) => {
  return (
    <StyledTextCom fontfamily='Times New Roman' align={align} color={color} as={as}>{children}</StyledTextCom>
  )
}

export default TextCom