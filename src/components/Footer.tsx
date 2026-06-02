export default function Footer() {
  const elements = [
    { label: 'Oheň', color: 'bg-fire' },
    { label: 'Voda',  color: 'bg-water' },
    { label: 'Země',  color: 'bg-earth' },
    { label: 'Vzduch', color: 'bg-air' },
  ]

  return (
    <footer className="bg-forest text-white mt-16">
      <div className="flex h-1">
        {elements.map(e => <div key={e.label} className={`flex-1 ${e.color}`}/>)}
      </div>
      <div className="max-w-5xl mx-auto px-4 py-10 text-center">
        <div className="flex justify-center gap-3 mb-4">
          {elements.map(e => (
            <span key={e.label} className={`${e.color} text-white text-xs font-medium px-3 py-1 rounded-full`}>
              {e.label}
            </span>
          ))}
        </div>
        <p className="text-white/70 text-sm">Skautský letní tábor · 20.–24. července 2026</p>
        <p className="text-white/40 text-xs mt-2">© 2026 Skautský oddíl</p>
      </div>
    </footer>
  )
}
