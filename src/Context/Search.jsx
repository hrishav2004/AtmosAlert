import React, {createContext, useEffect, useState} from "react";

export const WeatherContext = createContext(null);

export const WeatherContextProvider = (props) => {
    const [city, setCity] = useState(null);
    const [navError, setNavError] = useState(null);
    const [coordinates, setCoordinates] = useState({latitude: null, longitude: null});

    useEffect(()=>{
       if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                const { latitude, longitude } = position.coords;
                setCoordinates({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            (error)=>{
                setNavError("Access denied - Unable to retrieve your current location.")
            }
        );
       } 
       else{
            setNavError("Geolocation is not supported by this browser.")
       }
    }, [])

    return (
        <WeatherContext.Provider value = {{ city, setCity, navError, setNavError, coordinates, setCoordinates }}>
            { props.children }
        </WeatherContext.Provider>
    );
}
