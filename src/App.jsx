import { useState } from 'react'
import { Card } from './components/Card'
import { WeatherAPI } from './context/WeatherAPI'


function App() {

  return (
    <>
      <WeatherAPI>
        <Card />

      </WeatherAPI>
    </>
  )
}

export default App
