import { IContentItem, Elements } from '@kontent-ai/delivery-sdk'

export type SiteSettings = IContentItem<{
  camp_name: Elements.TextElement
  camp_dates: Elements.TextElement
  contact_email: Elements.TextElement
  camp_motto: Elements.TextElement
  facebook_url: Elements.TextElement
}>

export type Homepage = IContentItem<{
  logo: Elements.AssetsElement
  hero_title: Elements.TextElement
  hero_subtitle: Elements.TextElement
  welcome_text: Elements.RichTextElement
  registration_info: Elements.RichTextElement
  key_information: Elements.RichTextElement
}>

export type StaffMember = IContentItem<{
  full_name: Elements.TextElement
  role: Elements.TextElement
  photo: Elements.AssetsElement
  bio: Elements.RichTextElement
  element: Elements.TaxonomyElement
}>

export type ScheduleDay = IContentItem<{
  day_of_week: Elements.MultipleChoiceElement
  date: Elements.DateTimeElement
  start_time: Elements.TextElement
  start_location: Elements.TextElement
  topic: Elements.TextElement
  day_description: Elements.RichTextElement
  end_time: Elements.TextElement
  end_location: Elements.TextElement
  element_theme: Elements.TaxonomyElement
}>

export type HelpPage = IContentItem<{
  section_title: Elements.TextElement
  intro_text: Elements.RichTextElement
  what_we_need: Elements.RichTextElement
  formspree_form_id: Elements.TextElement
  thank_you_message: Elements.TextElement
}>

export type ElementName = 'fire' | 'water' | 'earth' | 'air'

export const elementColors: Record<ElementName, { bg: string; text: string; border: string; label: string }> = {
  fire:  { bg: 'bg-fire/10',  text: 'text-fire-dark',  border: 'border-fire',  label: 'Oheň'  },
  water: { bg: 'bg-water/10', text: 'text-water-dark', border: 'border-water', label: 'Voda'  },
  earth: { bg: 'bg-earth/10', text: 'text-earth-dark', border: 'border-earth', label: 'Země'  },
  air:   { bg: 'bg-air/10',   text: 'text-air-dark',   border: 'border-air',   label: 'Vzduch' },
}
