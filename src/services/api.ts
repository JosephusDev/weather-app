import axios from "axios";

export const api = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/`,
    params: {
        appid: process.env.NEXT_PUBLIC_OPENWEATHER_API,
        lang: "pt"
    }
});