'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',         label: 'Domů' },
  { href: '/staff/',   label: 'Vedoucí' },
  { href: '/schedule/', label: 'Program' },
  { href: '/help/',    label: 'Pomozte nám' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-forest text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/logo.svg" alt="Logo tábora" width={44} height={44} className="rounded-full bg-white p-0.5 shrink-0"/>
          <div className="hidden sm:block">
            <div className="font-heading font-bold text-base leading-tight">Skautský tábor 2026</div>
            <div className="text-white/60 text-xs">4 živly</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.href
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setOpen(o => !o)}
          aria-label="Otevřít menu"
        >
          <span className={`block mx-auto w-5 h-0.5 bg-white transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}/>
          <span className={`block mx-auto w-5 h-0.5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`}/>
          <span className={`block mx-auto w-5 h-0.5 bg-white transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}/>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/10 px-4 py-3 flex flex-col gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.href ? 'bg-white/20' : 'hover:bg-white/10 text-white/80'
              }`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
