import { deliveryClient } from '@/lib/kontent'
import type { HelpPage } from '@/lib/types'

export default async function HelpPageRoute() {
  let help: HelpPage | null = null

  try {
    const res = await deliveryClient.items<HelpPage>().type('help_page').toPromise()
    help = res.data.items[0] ?? null
  } catch {
    // Content not yet available
  }

  const formId = help?.elements.formspree_form_id.value
  const sectionTitle = help?.elements.section_title.value || 'Pomozte nám'

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-forest mb-2">{sectionTitle}</h1>
      <p className="text-stone-500 mb-10">Hledáme rodiče, kteří se chtějí zapojit do přípravy tábora</p>

      {help?.elements.intro_text.value && (
        <div
          className="rich-text text-stone-700 mb-8"
          dangerouslySetInnerHTML={{ __html: help.elements.intro_text.value }}
        />
      )}

      {help?.elements.what_we_need.value && (
        <div className="bg-earth/10 border-2 border-earth/30 rounded-2xl p-6 mb-10">
          <h2 className="text-xl font-heading font-semibold text-earth-dark mb-4">Co potřebujeme</h2>
          <div
            className="rich-text text-stone-700"
            dangerouslySetInnerHTML={{ __html: help.elements.what_we_need.value }}
          />
        </div>
      )}

      {/* Contact / signup form */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
        <h2 className="text-xl font-heading font-semibold text-forest mb-6">Přihlaste se jako pomocník</h2>

        {formId ? (
          <form
            action={`https://formspree.io/f/${formId}`}
            method="POST"
            className="space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                Jméno a příjmení <span className="text-fire">*</span>
              </label>
              <input
                id="name" name="name" type="text" required autoComplete="name"
                className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                E-mail <span className="text-fire">*</span>
              </label>
              <input
                id="email" name="email" type="email" required autoComplete="email"
                className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
                Telefon
              </label>
              <input
                id="phone" name="phone" type="tel" autoComplete="tel"
                className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                Jak chcete pomoci? <span className="text-fire">*</span>
              </label>
              <textarea
                id="message" name="message" rows={4} required
                placeholder="Napište, s čím byste mohli pomoci…"
                className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-forest text-white font-semibold px-8 py-3 rounded-lg hover:bg-forest-light transition-colors shadow-sm"
            >
              Odeslat přihlášku
            </button>
          </form>
        ) : (
          <p className="text-stone-400 italic">
            Formulář bude brzy k dispozici. Mezitím nás prosím kontaktujte e-mailem.
          </p>
        )}
      </div>

      {help?.elements.thank_you_message.value && (
        <p className="mt-8 text-center text-stone-500 italic text-sm">
          {help.elements.thank_you_message.value}
        </p>
      )}
    </div>
  )
}
