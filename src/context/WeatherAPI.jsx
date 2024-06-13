import { createContext, useState } from "react";
import React from 'react'

export const WeatherContext = createContext(null)

export const WeatherAPI = (props) => {
    const [searchInput, setSearchInput] = useState("")
    const [weatherInfo, setWeatherInfo] = useState("")
    const [weatherMood, setWeatherMood] = useState("")

    return (

        <WeatherContext.Provider value={{ searchInput, setSearchInput, weatherInfo, setWeatherInfo, weatherMood, setWeatherMood }}>
            {props.children}
        </WeatherContext.Provider>

    )
}
