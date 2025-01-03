export interface Store {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  phone?: string
  email?: string
  description?: string
  opening_hours?: {
    [key: string]: {
      open: string
      close: string
    }
  }
  created_at: string
  updated_at: string
}