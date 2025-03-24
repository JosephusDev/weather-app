import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { fetchWeatherData, fetchWeatherForecast } from '@/services/api'
import { WeatherParams } from '@/types'

// Armazenamento temporário para controle da última atualização
const lastUpdatedCache: Record<string, number> = {} // Exemplo: { 'lat_lon': timestamp }

// Rota GET — Busca os dados da API de clima
/* 
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 })
  }

  const weather = await fetchWeatherData(Number(lat), Number(lon))
  const forecasts = await fetchWeatherForecast(Number(lat), Number(lon))
  const data = {
    weather,
    forecasts,
  }

  return NextResponse.json(data)
} */

// Rota POST — Verifica se já passou 5 minutos antes de revalidar
export async function POST(request: NextRequest) {
  const body: WeatherParams = await request.json()

  if (!body.lat || !body.lon) {
    return NextResponse.json(
      { error: 'Latitude e longitude são obrigatórios' },
      { status: 400 },
    )
  }

  const cacheKey = `${body.lat}_${body.lon}`
  const currentTime = Date.now()

  if (
    lastUpdatedCache[cacheKey] &&
    currentTime - lastUpdatedCache[cacheKey] < 120_000
  ) {
    return NextResponse.json({
      success: false,
      message: 'Cache ainda válido, não foi revalidado.',
    })
  }

  // Atualiza o tempo da última revalidação
  lastUpdatedCache[cacheKey] = currentTime

  // Força a revalidação do cache
  await revalidatePath(`/${body.lat}/${body.lon}`)

  return NextResponse.json({
    success: true,
    message: 'Cache revalidado com sucesso!',
  })
}
