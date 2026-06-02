import { deliveryClient } from '@/lib/kontent'
import type { StaffMember } from '@/lib/types'
import { elementColors, type ElementName } from '@/lib/types'
import Image from 'next/image'

export default async function StaffPage() {
  let staff: StaffMember[] = []

  try {
    const res = await deliveryClient.items<StaffMember>().type('staff_member').toPromise()
    staff = res.data.items
  } catch {
    // Content not yet available
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-forest mb-2">Vedoucí tábora</h1>
      <p className="text-stone-500 mb-10">Lidé, kteří se o vás postarají</p>

      {staff.length === 0 ? (
        <p className="text-stone-400 italic">Informace o vedoucích budou brzy k dispozici.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {staff.map(member => {
            const elementCodename = member.elements.element.value[0]?.codename as ElementName | undefined
            const color = elementCodename ? elementColors[elementCodename] : null
            const photo = member.elements.photo.value[0]

            return (
              <article key={member.system.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-stone-100 flex flex-col">
                {photo ? (
                  <Image
                    src={photo.url}
                    alt={member.elements.full_name.value}
                    width={400} height={280}
                    className="w-full h-52 object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-52 bg-stone-100 flex items-center justify-center text-6xl">
                    🧑‍🌾
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-heading font-bold text-stone-800">
                    {member.elements.full_name.value}
                  </h3>
                  <p className="text-stone-500 text-sm mb-3">{member.elements.role.value}</p>
                  {color && elementCodename && (
                    <span className={`inline-block self-start text-xs font-semibold px-3 py-1 rounded-full mb-4 ${color.bg} ${color.text} border ${color.border}`}>
                      {color.label}
                    </span>
                  )}
                  {member.elements.bio.value && (
                    <div
                      className="rich-text text-sm text-stone-600 flex-1"
                      dangerouslySetInnerHTML={{ __html: member.elements.bio.value }}
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
