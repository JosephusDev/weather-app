'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { WeatherData } from '@/types'
import Image from 'next/image'
import { getBackgroundColor, translateCondition } from '@/utils'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface WeatherCardProps {
  data: WeatherData
  cities: { name: string; lat: number; lon: number }[]
  selectedCity: string
}

export function WeatherCard({ data, cities, selectedCity }: WeatherCardProps) {
  const router = useRouter()

  const handleCityChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedCity = cities.find(city => city.name === event.target.value)
    if (selectedCity) {
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: selectedCity.lat,
          lon: selectedCity.lon,
        }),
      })

      router.push(`/${selectedCity.lat}/${selectedCity.lon}`)
    }
  }

  return (
    <div
      className={`rounded-3xl p-6 w-full max-w-sm shadow-lg ${getBackgroundColor(data.weather[0].main)}`}
    >
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <Image
            className='w-5 h-5'
            alt='Map'
            src={require('@/assets/images/map.png')}
          />
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className='py-2 text-white focus:text-black focus:outline-none bg-transparent'
            style={{ width: `${selectedCity.length + 3}ch` }}
          >
            {cities.map(city => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-col items-center'>
          <span className='text-lg mr-2'>
            {translateCondition(data.weather[0].main)}
          </span>
        </div>
      </div>
      <div className='flex flex-col items-center text-center'>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].main}
        />
        <p className='text-6xl font-bold'>
          {Math.round(data.main.temp - 273.15)}°
        </p>
        <p className='text-sm'>
          Max.: {Math.round(data.main.temp_max - 273.15)}° Min.:{' '}
          {Math.round(data.main.temp_min - 273.15)}°
        </p>
        <p className='text-sm'>{data.weather[0].description}</p>
      </div>
      <div className='flex justify-around mt-4'>
        <div className='text-center'>
          <p className='text-sm'>Humidade</p>
          <p className='text-lg font-bold'>{data.main.humidity}%</p>
        </div>
        <div className='text-center'>
          <p className='text-sm'>Vento</p>
          <p className='text-lg font-bold'>{data.wind.speed} m/s</p>
        </div>
      </div>
      <div className='mt-4 text-center'>
        <span className='text-sm'>
          Última atualização:{' '}
          {formatDistanceToNow(new Date(data.dt * 1000), {
            addSuffix: true,
            locale: ptBR,
          })}
        </span>
        <h2 className='text-lg font-bold'>
          {format(new Date(data.dt * 1000), "dd 'de' MMM ' de' yyyy", {
            locale: ptBR,
          })}
        </h2>
      </div>
    </div>
  )
}
