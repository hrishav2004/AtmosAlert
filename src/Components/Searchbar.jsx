import React, { useContext } from "react";
import { WeatherContext } from "../Context/Search";

const Searchbar = ()=>{
    const cityContext = useContext(WeatherContext);
    return (
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" onClick={(e)=>{
                e.preventDefault();
                if(document.querySelector(".form-control.me-2").value===""){
                  alert("Please enter the name of the city.")
                }
                cityContext.setCity(document.querySelector(".form-control.me-2").value);
                document.querySelector(".form-control.me-2").value="";
                }}>Search</button>
            </form>
          </div>
        </nav>
    );
}

export default Searchbar;
