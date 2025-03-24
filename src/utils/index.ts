import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const getBackgroundColor = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return 'bg-blue-500'
    case 'clouds':
      return 'bg-gray-500'
    case 'rain':
      return 'bg-blue-900'
    case 'snow':
      return 'bg-white text-black'
    case 'thunderstorm':
      return 'bg-purple-700'
    default:
      return 'bg-blue-300'
  }
}

export const translateCondition = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return 'Céu limpo'
    case 'clouds':
      return 'Nuvens'
    case 'rain':
      return 'Chuva'
    case 'snow':
      return 'Neve'
    case 'thunderstorm':
      return 'Tempestade'
    case 'drizzle':
      return 'Chuvisco'
    case 'mist':
      return 'Névoa'
    case 'smoke':
      return 'Neblina'
    case 'haze':
      return 'Neblina'
    case 'dust':
      return 'Poeira'
    case 'fog':
      return 'Nevoeiro'
    case 'sand':
      return 'Areia'
    case 'ash':
      return 'Cinzas'
    case 'squall':
      return 'Rajadas de vento'
    case 'tornado':
      return 'Tornado'
    default:
      return 'Condição desconhecida'
  }
}

export const DayOfWeek = (date: string) => {
  const dayOfWeek = format(date, 'EEEE', { locale: ptBR })
  return dayOfWeek
}

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15)
}

export const getHourAndMinute = (date: string) => {
  return date.split(' ')[1].slice(0, 5)
}
