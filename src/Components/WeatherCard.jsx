import React, { useContext,useEffect, useState } from "react";
import { WeatherContext } from "../Context/Search";

let isLive=false;

const getWeatherData = async(city) => {
    try{
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=c37e52116afb4982a5295356241406&q=${city}&aqi=no`, {method: "GET"});
        if(!res.ok){
            throw new Error("The weather details for this location are currently not available.");
        }
        const weather = await res.json();
        return weather;
    }
    catch(error){
        throw error;
    }   
}

const getWeatherDataByLatLong = async(lat, long) => {
    try{
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=c37e52116afb4982a5295356241406&q=${lat},${long}&aqi=no`, {method: "GET"});
        if(!res.ok){
            throw new Error("Access denied - could not fetch live location.");
        }
        const weather = await res.json();
        return weather;
    }
    catch(error){
        throw error;
    }
}

export const handleSearch = (location, setWeather, setError) => {
    setError(null); // Reset error state before making a new search
    setWeather(null); // Optionally reset weather data to show a loading state
    getWeatherData(location)
    .then((weatherUpdates) => {
      setWeather(weatherUpdates);
      isLive=false;
    })
    .catch((error) => {
      setError(error.message);
    });
}

export const handleSearchByLatLong = (coordinates, setWeather, setError) => {
    setError(null);
    setWeather(null);
    if(!(coordinates.latitude===null && coordinates.longitude===null)){
        getWeatherDataByLatLong(coordinates.latitude, coordinates.longitude)
        .then((weatherUpdates) => {
        setWeather(weatherUpdates);
        isLive=true;
        })
        .catch((error) => {
        setError(error.message);
    })
    }
}

const WeatherCard = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const cityContext = useContext(WeatherContext);

    useEffect(()=>{
        if(!cityContext.city)
            handleSearchByLatLong(cityContext.coordinates, setWeather, setError);
        else
            handleSearch(cityContext.city, setWeather, setError);
    }, [cityContext.city, cityContext.coordinates])

    if(cityContext.navError && !cityContext.city){
        return (
            <>
                <big><span className="err">Error:</span> {cityContext.navError}</big>
                <br></br>
                <button className="liveloc-but" onClick={()=>{window.location.href="index.html"}}>Get Live Location</button>
            </>
        );
    }
    
    if(error){
        return (
            <>
                <big><span className="err">Error:</span> {error}</big>
                <br></br>
                <button className="liveloc-but" onClick={()=>{window.location.href="index.html"}}>Get Live Location</button>
            </>
        );
    }

    if(!weather){
        return (
            <big>Fetching weather details...</big>
        );
    }

    else{

        const url=weather.current.condition.icon;
        const tempC=weather.current.temp_c;
        const tempF=weather.current.temp_f;
        const realTempC=weather.current.feelslike_c;
        const realTempF=weather.current.feelslike_f;
        const weatherCond=weather.current.condition.text;
        const windSpeedKPH=weather.current.wind_kph;
        const windSpeedMPH=weather.current.wind_mph;
        const humidity=weather.current.humidity;
        const uv_index=weather.current.uv;
        let uv_condition="Low";
        if(uv_index>=3 && uv_index<=5)  uv_condition="Moderate";
        else if(uv_index===6 || uv_index===7)   uv_condition="High";
        else if(uv_index>=8 && uv_index<=10)    uv_condition="Very High";
        else if(uv_index>10)  uv_condition="Extreme";

        return (
            <div className="card">
                {isLive? <b className="liveloc-msg">Showing live location weather update.</b> : <></>}
                <img src={url} alt="weather"/>
                {weather.location.region ? <p>{weather.location.name}, {weather.location.region}, {weather.location.country}</p>
                : <p>{weather.location.name}, {weather.location.country}</p>}
                <p><b>Temperature:</b> {tempC}&deg;C ({tempF}&deg;F)</p>
                <p><b>Real Feel:</b> {realTempC}&deg;C ({realTempF}&deg;F)</p>
                <p><b>Weather:</b> {weatherCond}</p>
                <p><b>Humidity:</b> {humidity}%</p>
                <p><b>UV Index:</b> {uv_index} ({uv_condition})</p>
                <p><b>Wind Speed:</b> {windSpeedKPH} kmph ({windSpeedMPH} mph)</p>
                {isLive? <></> : <button className="liveloc-but" onClick={()=>{window.location.href="index.html"}}>Get Live Location</button>}
                {/* <button className="remove-button">Remove Card</button> */}
            </div>
        );
    }
}

export default WeatherCard;
