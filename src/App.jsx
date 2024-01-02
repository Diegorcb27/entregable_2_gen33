
import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import WeatherCard from './Components.jsx/WeatherCard';

function App() {


 

  const [coords, setCoords] = useState() //este estado es para las coordenadas
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState(true)
  const [isLoading, setisLoading] = useState(true)



  const succes = pos =>{
    const obj={
      lat: pos.coords.latitude ,  //como pos es un objeto de 2 propiedades me interesa la propiedad coords
      lon: pos.coords.longitude
    }
    setCoords(obj)
  }
  // console.log(coords);
  
 //Primer UseEffect para los datos de coords
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes);  //envia la informacion del navegador y lo guarda en succes en el parametro pos como un objeto de 2 propiedades
    
  }, []) //se coloca dentro de un useEffect para que solo se ejecute una vez.

  //Segundo UseEffect para los datos de weather y usar axios

  useEffect(() => {

    setisLoading(true)
   if(coords){
    const API_KEY="93c23fcc51f200eb2913a22731d8a885"
    // const url= `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${API_KEY}` //lo podemos hacer asi o desestructurando
    const{lat, lon}=coords //desestructuramos
    const url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    axios.get(url)
      .then(res => {
        setWeather(res.data)
        console.log(res.data)
        const obj={
          celsius: (res.data.main.temp-273.15).toFixed(1),
          fahrenheit: ((res.data.main.temp-273.15)*9 / 5 + 32).toFixed(1)
        }
        setTemp(obj)
        // console.log(obj.celsius);

      })
      .catch(err => console.log(err))
      .finally(()=>{
          setTimeout(()=>{
            setisLoading(false)
          }, 2000)
      })
     
   }
  }, [coords])
  
  return (
  <div className='app'>

    {isLoading
      ? <h2>Loading...</h2>
      : (<WeatherCard weather={weather} setTemp={setTemp} temp={temp}/>)}

  </div>
  )
}

export default App
