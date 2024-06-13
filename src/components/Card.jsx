import React, { useEffect, useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherAPI";

export const Card = () => {
    const {
        searchInput,
        setSearchInput,
        weatherInfo,
        setWeatherInfo,
        weatherMood,
        setWeatherMood,
    } = useContext(WeatherContext);
    const [time, setTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    let [isError, setIsError] = useState(false);


    const getWeatherData = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=${import.meta.env.VITE_APP_API_KEY}`;
            let resp = await fetch(url);
            let data = await resp.json();
            const { temp, humidity } = data.main;
            const { name } = data;
            const { country } = data.sys;
            const { speed, deg } = data.wind;
            const { main, description } = data.weather[0];
            const dataFromApi = {
                temp,
                humidity,
                name,
                country,
                speed,
                deg,
                main,
                description,
            };
            setWeatherInfo(dataFromApi);
            setIsError(false);
        } catch (error) {
            setIsError(true);
        }
    };

    useEffect(() => {
        const getFormattedDate = () => {
            const date = new Date();
            const options = { weekday: "short", day: "2-digit", month: "short" };
            return date.toLocaleDateString("en-US", options);
        };

        setCurrentDate(getFormattedDate());

        const updateTime = () => {
            setTime(new Date().toLocaleTimeString());
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (weatherInfo.main) {
            switch (weatherInfo.main) {
                case "Clouds":
                    setWeatherMood("weather/sun-cloud.png");
                    break;
                case "Rain":
                    setWeatherMood("weather/rain2.png");
                    break;
                case "Haze":
                    setWeatherMood("weather/haze.png");
                    break;
                case "Snow":
                    setWeatherMood("weather/snow.png");
                    break;
                case "Thunderstorm":
                    setWeatherMood("weather/thunderstorm.png");
                    break;
                case "Clear":
                    setWeatherMood("weather/sun.png");
                    break;
                case "Drizzle":
                    setWeatherMood("weather/sun-rain2.png");
                    break;
                case "Smoke":
                    setWeatherMood("weather/smoke.png");
                    break;
                default:
                    setWeatherMood("weather/default.png");
                    break;
            }
        }
    }, [weatherInfo.main]);

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-tl from-gray-700 via-gray-900 to-black">
            <section className="min-h-[600px] w-full max-w-md rounded-2xl bg-gray-900 p-6">
                <div className="flex flex-col gap-y-5 text-violet-100">
                    <div className="relative flex items-center gap-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="absolute left-4 h-5 w-5 text-violet-800"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            className="w-full rounded-full bg-slate-200 py-3 pl-11 pr-4 text-gray-900 outline-none placeholder:text-violet-800/50"
                            placeholder="Search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button
                            className="h-12 w-12 flex justify-center items-center rounded-full bg-green-500 hover:bg-violet-500 transition-colors duration-200"
                            onClick={getWeatherData}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                    <header className="space-y-2 text-center">
                        <h1 className="text-xl font-medium">{currentDate}</h1>
                        <p className="text-5xl font-extrabold">
                            <time>{time}</time>
                        </p>
                    </header>
                    {isError ? (
                        <div className="text-center space-y-4 pt-5">
                            <h2 className="text-3xl font-bold">Data Not Found</h2>
                            <h2 className="text-sm font-bold">Please check the city</h2>
                        </div>
                    ) : (
                        <main className="flex-1 flex flex-col items-center justify-center">
                            <div id="weather" className="my-6 h-28 max-w-xs flex justify-center">
                                <img
                                    src={weatherMood}
                                    alt={weatherInfo.description}
                                    className="h-36"
                                />
                            </div>
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl font-bold relative top-2">
                                    {weatherInfo.name ? `${weatherInfo.name}, ${weatherInfo.country}` : "No Data"}
                                </h2>
                                <h2 className="text-sm font-bold relative top-2">
                                    {weatherInfo.description ? weatherInfo.description : "No Data"}
                                </h2>
                                <h3 className="text-5xl font-extrabold relative top-4">
                                    {weatherInfo.temp ? `${weatherInfo.temp}°C` : "0.00°C"}
                                </h3>
                            </div>
                            <div className="w-full grid grid-cols-2 border-t border-violet-500 pt-3 text-violet-300 mt-9">
                                <div className="flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-12 w-12"
                                    >
                                        <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                                        <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                                        <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-extrabold">
                                            {weatherInfo.humidity ? `${weatherInfo.humidity}%` : "0.00%"}
                                        </p>
                                        <p className="text-sm font-medium">Humidity</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 relative left-10">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-12 w-12"
                                    >
                                        <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                                        <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                                        <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-extrabold">
                                            {weatherInfo.speed ? `${weatherInfo.speed} km/h` : "0.00 km/h"}
                                        </p>
                                        <p className="text-sm font-medium">Wind Speed</p>
                                    </div>
                                </div>
                            </div>
                        </main>
                    )}
                </div>
            </section>
        </div>
    );
};
