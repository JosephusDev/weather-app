import { NextRequest, NextResponse } from 'next/server'
import { WeatherParams } from '@/types'

export async function POST(request: NextRequest) {
  const body: WeatherParams = await request.json()

  if (!body.lat || !body.lon) {
    return NextResponse.json(
      { error: 'Latitude e longitude são obrigatórios' },
      { status: 400 },
    )
  }
  return NextResponse.json({
    success: true,
    message: 'Cache revalidado com sucesso!',
  })
}
