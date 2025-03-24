export async function fetchWeatherData(lat: number, lon: number) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API}&lang=pt`,
    {
      next: { revalidate: 120 }, // Cache de 2 minutos
    },
  )

  if (!response.ok) {
    throw new Error('Falha ao buscar dados do clima')
  }

  return response.json()
}

export async function fetchWeatherForecast(lat: number, lon: number) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API}&lang=pt`,
    { next: { revalidate: 120 } },
  )

  if (!response.ok) {
    throw new Error('Falha ao buscar previsões do clima')
  }

  return response.json()
}
