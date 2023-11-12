import React from 'react'
import { BsTwitter } from 'react-icons/bs'

interface Props {
  fontSize?: string
}

function TwitterIcon({ fontSize = "3.2rem" }: Props) {
  return (
    <BsTwitter style={{ color: "#1D9BF0", fontSize }} />
  )
}

export default TwitterIcon