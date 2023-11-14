import React from 'react'
import { BsTwitter } from 'react-icons/bs'

type Props = React.CSSProperties

function TwitterIcon({ fontSize = "3.2rem", ...rest }: Props) {
  return (
    <BsTwitter style={{ color: "#1D9BF0", fontSize, ...rest }} />
  )
}

export default TwitterIcon