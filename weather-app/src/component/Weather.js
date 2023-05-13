// https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=30c2da51076e9cae437aec5923654ec0

import React, { useEffect, useState } from 'react'

import "./Weather.css"
import WeatherCard from './WeatherCard';

function Weather() {
  const[searchValue,setSearchValue]=useState('karachi');
  const[tempInfo,setTempInfo]=useState({ });
  const getWeatherInfo=async() =>{
    try {
      let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=30c2da51076e9cae437aec5923654ec0`
       
      let res=await fetch(url)
      let data=await res.json();

      const{temp,humidity,pressure}=data.main
      const{main: weathermood}=data.weather[0]
      const{name}=data;
      const{speed}=data.wind;
      const{country,sunset}=data.sys;

      const myNewWeatherInfo={
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo)
    }

    catch (error) {
      console.log(error)
    
    }
  }


  useEffect(() =>{
    getWeatherInfo();
},[]);
  return (
    <>
      <div className="wrap">
        <div className="search">
        <input 
        type="search" 
        placeholder='search...'
        autoFocus
        className='searchTerm'
        id='search'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        />

        <button className="searchButton" 
        type='button'
        onClick={getWeatherInfo}
        >
          Search
          </button>
      </div>
      </div>

      <WeatherCard  tempInfo={tempInfo}/>
    </>
  )
}

export default Weather
