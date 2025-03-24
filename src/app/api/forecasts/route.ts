import { NextRequest, NextResponse } from 'next/server'
import { fetchWeatherForecast } from '@/services/api'

// Rota GET — Busca os dados da API de clima
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 })
  }

  const data = await fetchWeatherForecast(Number(lat), Number(lon))

  return NextResponse.json(data)
}
