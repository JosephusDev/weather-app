import { WeatherCard } from '@/components/WeatherCard'
import { fetchWeatherData, fetchWeatherForecast } from '@/services/api'
import { WeatherData } from '@/types'

const cities = [
  { name: 'Uíge', lat: -7.6117323, lon: 15.0563515 },
  { name: 'Negage', lat: -7.756449954932059, lon: 15.272969749921609 },
  { name: 'Damba', lat: -6.69199219698794, lon: 15.139439293107937 },
  { name: 'Maquela', lat: -6.053409067403904, lon: 15.106882787623066 },
  { name: 'Buengas', lat: -6.578177492387895, lon: 15.81781058263296 },
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
