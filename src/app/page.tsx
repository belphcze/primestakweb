import { deliveryClient } from '@/lib/kontent'
import type { Homepage, SiteSettings } from '@/lib/types'
import Image from 'next/image'
import { RevealContact } from '@/components/RevealContact'

const elements = [
  { label: 'Oheň',   color: 'bg-fire',  icon: '🔥' },
  { label: 'Voda',   color: 'bg-water', icon: '💧' },
  { label: 'Země',   color: 'bg-earth', icon: '🌿' },
  { label: 'Vzduch', color: 'bg-air',   icon: '💨' },
]

export default async function HomePage() {
  let homepage: Homepage | null = null
  let settings: SiteSettings | null = null

  try {
    const [hRes, sRes] = await Promise.all([
      deliveryClient.items<Homepage>().type('homepage').toPromise(),
      deliveryClient.items<SiteSettings>().type('site_settings').toPromise(),
    ])
    homepage = hRes.data.items[0] ?? null
    settings = sRes.data.items[0] ?? null
  } catch {
    // Content not yet published — show placeholder layout
  }

  const logoUrl = homepage?.elements.logo.value[0]?.url ?? 'https://assets-eu-01.kc-usercontent.com/291ee9b8-9796-0118-6eff-e347bea0e0c7/8e3b85ba-a8a0-410f-aaae-a3208ad55ccb/SKAUT_znak.png'
  const campName = settings?.elements.camp_name.value || 'Primestak26'
  const campDates = settings?.elements.camp_dates.value || '20. – 24. července 2026'
  const campMotto = settings?.elements.camp_motto.value
  const contactEmail = settings?.elements.contact_email.value

  return (
    <>
      {/* Hero */}
      <section className="bg-forest text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Image src={logoUrl} alt="Logo tábora" width={160} height={160} className="object-contain drop-shadow-lg" unoptimized/>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
            {homepage?.elements.hero_title.value || campName}
          </h1>
          {homepage?.elements.hero_subtitle.value && (
            <p className="text-xl text-white/75 mb-6">{homepage.elements.hero_subtitle.value}</p>
          )}
          {campMotto && (
            <p className="italic text-white/60 mb-6 text-lg">&ldquo;{campMotto}&rdquo;</p>
          )}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {elements.map(e => (
              <span key={e.label} className={`${e.color} text-white px-5 py-2 rounded-full text-sm font-semibold shadow`}>
                {e.icon} {e.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="bg-cream-dark border-b border-stone-200 py-6 px-4">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-10 text-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-400 mb-1">Termín</div>
            <div className="font-semibold text-forest text-lg">{campDates}</div>
          </div>
          {contactEmail && (
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-400 mb-1">Kontakt</div>
              <RevealContact value={contactEmail} type="email" className="font-semibold text-forest text-lg hover:underline" />
            </div>
          )}
        </div>
      </section>

      {/* Content sections */}
      <div className="max-w-3xl mx-auto px-4 py-14 space-y-14">
        {homepage?.elements.welcome_text.value ? (
          <section>
            <h2 className="text-2xl font-heading font-bold text-forest mb-5 pb-2 border-b-2 border-forest/20">
              Vítejte
            </h2>
            <div
              className="rich-text text-stone-700"
              dangerouslySetInnerHTML={{ __html: homepage.elements.welcome_text.value }}
            />
          </section>
        ) : (
          <section className="text-center py-10 text-stone-400 italic">
            Obsah stránky bude brzy doplněn.
          </section>
        )}

        {homepage?.elements.registration_info.value && (
          <section>
            <h2 className="text-2xl font-heading font-bold text-forest mb-5 pb-2 border-b-2 border-fire/30">
              Registrace
            </h2>
            <div
              className="rich-text text-stone-700"
              dangerouslySetInnerHTML={{ __html: homepage.elements.registration_info.value }}
            />
          </section>
        )}

        {homepage?.elements.key_information.value && (
          <section>
            <h2 className="text-2xl font-heading font-bold text-forest mb-5 pb-2 border-b-2 border-earth/30">
              Důležité informace
            </h2>
            <div
              className="rich-text text-stone-700"
              dangerouslySetInnerHTML={{ __html: homepage.elements.key_information.value }}
            />
          </section>
        )}
      </div>
    </>
  )
}
