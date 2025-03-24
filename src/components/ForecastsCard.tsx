import { WeatherData } from '@/types'
import { DayOfWeek, getHourAndMinute, kelvinToCelsius } from '@/utils'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export function ForecastsCard({ data }: { data: WeatherData[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = data.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div>
      <div className='flex justify-between items-start mb-2'>
        <h1 className='font-bold'>Previsões</h1>
        <Calendar size={20} />
      </div>
      <div>
        {currentData.map((forecast, index) => (
          <div key={index} className='flex items-center justify-between gap-4'>
            <h1 className='text-sm'>
              {DayOfWeek(forecast.dt_txt!)} -{' '}
              {getHourAndMinute(forecast.dt_txt!)}
            </h1>
            <img
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              alt={forecast.weather[0].main}
            />
            <div>
              <p className='text-sm font-bold'>
                {kelvinToCelsius(forecast.main.temp)} ºc
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center gap-2 mt-4'>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50'
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50'
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
