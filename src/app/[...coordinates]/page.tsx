export const revalidate = 60 // Revalida a cada 60 segundos

import { WeatherCard } from '@/components/WeatherCard'
import { fetchWeatherData, fetchWeatherForecast } from '@/services/api'
import { WeatherData } from '@/types'

const cities = [
  { name: 'Uíge', lat: -7.6117323, lon: 15.0563515 },
  { name: 'Bembe', lat: -7.032648017304998, lon: 14.29674820182225 },
  { name: 'Bungo', lat: -7.436525981499463, lon: 15.391911280071882 },
  { name: 'Buengas', lat: -6.578177492387895, lon: 15.81781058263296 },
  { name: 'Damba', lat: -6.688930174977665, lon: 15.231392655577384 },
  { name: 'Macocola', lat: -7.010713067729179, lon: 16.258614223936732 },
  { name: 'Maquela do Zombo', lat: -6.04473818547958, lon: 15.313790086747998 },
  { name: 'Negage', lat: -7.762473217164058, lon: 15.473091827295704 },
  { name: 'Quimbele', lat: -6.516504732458214, lon: 16.21629226615331 },
  { name: 'Quitexe', lat: -7.943119162500933, lon: 15.057965715478044 },
  { name: 'Songo', lat: -7.352433829153458, lon: 14.857027089728163 },
]

interface CoordinatesPageProps {
  params: Promise<{
    coordinates: string[]
  }>
}

export default async function CoordinatesPage({
  params,
}: CoordinatesPageProps) {
  // Extrai lat e lon dos parâmetros da URL
  const { coordinates } = await params

  // Converte para números
  const latitude = parseFloat(coordinates[0])
  const longitude = parseFloat(coordinates[1])

  // Define a cidade selecionada com base nos parâmetros da URL ou usa a primeira cidade como padrão
  const selectedCity =
    cities.find(city => city.lat === latitude && city.lon === longitude) ||
    cities[0]

  const data = await fetchWeatherData(selectedCity.lat, selectedCity.lon)
  const forecasts = await fetchWeatherForecast(
    selectedCity.lat,
    selectedCity.lon,
  )

  const weatherData: WeatherData = {
    coord: data.coord,
    weather: data.weather,
    base: data.base,
    main: data.main,
    visibility: data.visibility,
    wind: data.wind,
    rain: data.rain || { '1h': 0 },
    clouds: data.clouds,
    dt: data.dt,
    sys: data.sys,
    timezone: data.timezone,
    id: data.id,
    name: data.name,
    cod: data.cod,
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-400 text-white font-[family-name:var(--font-geist-sans)] p-4'>
      <WeatherCard
        data={weatherData}
        forecasts={forecasts.list}
        cities={cities}
        selectedCity={selectedCity.name}
      />
    </div>
  )
}
