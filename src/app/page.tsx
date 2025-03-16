"use client";
import React, { useEffect, useState } from 'react';
import { WeatherCard } from '@/components/WeatherCard';
import { WeatherData } from '@/types';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';

const cities = [
    { name: 'Uíge', lat: -7.6117323, lon: 15.0563515 },
    { name: 'Negage', lat: -7.756449954932059, lon: 15.272969749921609 },
    { name: 'Damba', lat: -6.69199219698794, lon: 15.139439293107937 },
    { name: 'Maquela do Zombo', lat: -6.053409067403904, lon: 15.106882787623066 },
    { name: 'Buengas', lat: -6.578177492387895, lon: 15.81781058263296 },
];

function Home() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState(cities[0]); // Estado para a cidade selecionada

    const fetchWeatherData = async (lat: number, lon: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API}`
            );

            console.log(response.data);

            const formattedData: WeatherData = {
                coord: response.data.coord,
                weather: response.data.weather,
                base: response.data.base,
                main: response.data.main,
                visibility: response.data.visibility,
                wind: response.data.wind,
                rain: response.data.rain || { "1h": 0 },
                clouds: response.data.clouds,
                dt: response.data.dt,
                sys: response.data.sys,
                timezone: response.data.timezone,
                id: response.data.id,
                name: response.data.name,
                cod: response.data.cod,
            };

            setWeatherData(formattedData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Failed to fetch weather data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Carregar os dados da cidade selecionada por padrão
        fetchWeatherData(selectedCity.lat, selectedCity.lon);
    }, [selectedCity]); // Executar sempre que a cidade selecionada mudar

    const handleCityChange = (lat: number, lon: number) => {
        const city = cities.find(city => city.lat === lat && city.lon === lon);
        if (city) {
            setSelectedCity(city); // Atualizar a cidade selecionada
        }
    };

    if (loading || error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-400 text-white font-[family-name:var(--font-geist-sans)]">
                {loading ? <LoaderCircle className="animate-spin" size={30} /> : 'Erro ao carregar. Tente novamente...'}
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-400 text-white font-[family-name:var(--font-geist-sans)] p-4">
            {weatherData && (
                <WeatherCard
                    data={weatherData}
                    cities={cities}
                    selectedCity={selectedCity.name}
                    onCityChange={handleCityChange}
                />
            )}
        </div>
    );
}

export default Home;