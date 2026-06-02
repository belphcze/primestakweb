import { deliveryClient } from '@/lib/kontent'
import type { ScheduleDay } from '@/lib/types'
import { elementColors, type ElementName } from '@/lib/types'

const dayOrder: Record<string, number> = {
  monday: 0, tuesday: 1, wednesday: 2, thursday: 3, friday: 4,
}

export default async function SchedulePage() {
  let days: ScheduleDay[] = []

  try {
    const res = await deliveryClient.items<ScheduleDay>().type('schedule_day').toPromise()
    days = res.data.items.sort((a, b) => {
      const aKey = a.elements.day_of_week.value[0]?.codename ?? ''
      const bKey = b.elements.day_of_week.value[0]?.codename ?? ''
      return (dayOrder[aKey] ?? 99) - (dayOrder[bKey] ?? 99)
    })
  } catch {
    // Content not yet available
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-forest mb-2">Program tábora</h1>
      <p className="text-stone-500 mb-10">20. – 24. července 2026</p>

      {days.length === 0 ? (
        <div className="text-center py-16 text-stone-400 italic">
          Program bude zveřejněn před začátkem tábora.
        </div>
      ) : (
        <div className="space-y-6">
          {days.map(day => {
            const dayName = day.elements.day_of_week.value[0]?.name ?? ''
            const elementCodename = day.elements.element_theme.value[0]?.codename as ElementName | undefined
            const color = elementCodename ? elementColors[elementCodename] : null

            const dateStr = day.elements.date.value
              ? new Date(day.elements.date.value).toLocaleDateString('cs-CZ', {
                  weekday: 'long', day: 'numeric', month: 'long',
                })
              : null

            return (
              <article key={day.system.id} className={`rounded-2xl border-2 overflow-hidden ${color ? color.border : 'border-stone-200'}`}>
                {/* Day header */}
                <header className={`px-6 py-4 flex flex-wrap items-center gap-4 ${color ? color.bg : 'bg-stone-50'}`}>
                  <div>
                    <h2 className={`text-2xl font-heading font-bold ${color ? color.text : 'text-stone-700'}`}>
                      {dayName}
                    </h2>
                    {dateStr && <p className="text-stone-500 text-sm capitalize">{dateStr}</p>}
                  </div>
                  {color && elementCodename && (
                    <span className={`ml-auto text-sm font-semibold px-4 py-1.5 rounded-full border ${color.bg} ${color.text} ${color.border}`}>
                      {color.label}
                    </span>
                  )}
                </header>

                {/* Day body */}
                <div className="bg-white p-6">
                  {day.elements.topic.value && (
                    <p className="text-lg font-semibold text-stone-800 mb-5">
                      Téma dne: <span className={color ? color.text : ''}>{day.elements.topic.value}</span>
                    </p>
                  )}

                  {/* Start / End */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                      <div className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">Začátek</div>
                      {day.elements.start_time.value && (
                        <div className="text-2xl font-bold text-forest">{day.elements.start_time.value}</div>
                      )}
                      {day.elements.start_location.value && (
                        <div className="text-stone-600 text-sm mt-1">
                          <span className="mr-1">📍</span>{day.elements.start_location.value}
                        </div>
                      )}
                    </div>
                    <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                      <div className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">Konec</div>
                      {day.elements.end_time.value && (
                        <div className="text-2xl font-bold text-forest">{day.elements.end_time.value}</div>
                      )}
                      {day.elements.end_location.value && (
                        <div className="text-stone-600 text-sm mt-1">
                          <span className="mr-1">📍</span>{day.elements.end_location.value}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {day.elements.day_description.value && (
                    <div
                      className="rich-text text-stone-600 text-sm"
                      dangerouslySetInnerHTML={{ __html: day.elements.day_description.value }}
                    />
                  )}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
