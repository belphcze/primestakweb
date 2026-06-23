'use client'

import { useState } from 'react'

type Props = {
  readonly value: string
  readonly type: 'email' | 'phone'
  readonly className?: string
}

export const RevealContact = ({ value, type, className }: Props) => {
  const [isRevealed, setIsRevealed] = useState(false)

  if (!isRevealed) {
    return (
      <button
        onClick={() => setIsRevealed(true)}
        className={className}
      >
        {type === 'email' ? 'Zobrazit e-mail' : 'Zobrazit telefon'}
      </button>
    )
  }

  const href = type === 'email' ? `mailto:${value}` : `tel:${value}`
  return (
    <a href={href} className={className}>
      {value}
    </a>
  )
}
