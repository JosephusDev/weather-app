"use client";
import React from 'react';
import { WeatherData } from '@/types';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from "date-fns/locale";
import { getBackgroundColor, translateCondition } from '@/utils';
import Image from 'next/image';

interface WeatherCardProps {
    data: WeatherData;
    cities: { name: string; lat: number; lon: number }[];
    selectedCity: string;
    onCityChange: (lat: number, lon: number) => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, cities, selectedCity, onCityChange }) => {
    const date = format(new Date(data.dt * 1000), "dd 'de' MMM ' de' yyyy", { locale: ptBR })
    const date_distance = formatDistanceToNow(new Date(data.dt * 1000), { addSuffix: true, locale: ptBR })
    const temperature = Math.round(data.main.temp - 273.15);
    const condition = data.weather[0].main;
    const description = data.weather[0].description;
    const maxTemp = Math.round(data.main.temp_max - 273.15);
    const minTemp = Math.round(data.main.temp_min - 273.15);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const iconCode = data.weather[0].icon;

    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const translatedCondition = translateCondition(condition);

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCity = cities.find(city => city.name === event.target.value);
        if (selectedCity) {
            onCityChange(selectedCity.lat, selectedCity.lon);
        }
    };

    return (
        <div className={`rounded-3xl p-6 w-full max-w-sm shadow-lg ${getBackgroundColor(condition)}`}>
            <div className="flex items-center justify-between mb-4">
                <div className='flex items-center'>
                    <Image className='w-5 h-5' alt='Map' src={require("@/assets/images/map.png")}/>
                    <select
                        value={selectedCity}
                        onChange={handleCityChange}
                        className="py-2 text-white focus:text-black focus:outline-none bg-transparent"
                        style={{ width: `${selectedCity.length + 3}ch` }}
                    >
                        {cities.map((city) => (
                            <option key={city.name} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-lg mr-2">{translatedCondition}</span>
                </div>
            </div>
            <div className="flex flex-col items-center text-center">
                {/*<Image
                    src={condition.toLowerCase() === 'rain' ? require('@/assets/images/chuva.png') : require('@/assets/images/sol.png')}
                    alt={condition}
                    className="w-50"
                />*/}
                <img src={iconUrl} alt={condition} />
                <p className="text-6xl font-bold">{temperature}°</p>
                <p className="text-sm">Max.: {maxTemp}° Min.: {minTemp}°</p>
                <p className="text-sm">{description}</p>
            </div>

            <div className="flex justify-around mt-4">
                <div className="text-center">
                    <p className="text-sm">Humidade</p>
                    <p className="text-lg font-bold">{humidity}%</p>
                </div>
                <div className="text-center">
                    <p className="text-sm">Vento</p>
                    <p className="text-lg font-bold">{windSpeed} m/s</p>
                </div>
            </div>

            <div className="mt-4 text-center">
                <span className="text-sm">Última atualização: {date_distance}</span>
                <h2 className="text-lg font-bold">{date}</h2>
            </div>
        </div>
    );
};