import { NextResponse } from 'next/server'

const SAFE_DESTINATIONS = [
  'https://www.weather.com/',
  'https://www.accuweather.com/',
  'https://www.bbc.com/news',
  'https://www.npr.org/',
  'https://www.nationalgeographic.com/',
] as const

export async function GET() {
  const randomIndex = Math.floor(Math.random() * SAFE_DESTINATIONS.length)
  const destination = SAFE_DESTINATIONS[randomIndex]

  return NextResponse.redirect(new URL(destination))
}
