import { createDeliveryClient } from '@kontent-ai/delivery-sdk'

export const deliveryClient = createDeliveryClient({
  environmentId: process.env.NEXT_PUBLIC_KONTENT_PROJECT_ID!,
})
