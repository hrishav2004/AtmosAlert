import React from 'react';
import './App.css';
import './style.css';
import Typed from 'typed.js';
import Searchbar from './Components/Searchbar';
import WeatherCard from './Components/WeatherCard';

function MyComponent() {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Enter a location to get the latest weather updates!'],
      typeSpeed: 45,
      backSpeed: 45,
      looped: false
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <p className="App">
      <span ref={el} />
    </p>
  );
}

function App() {
  return (
      <div className='appBody'>
        <h2>Weather Forecast</h2>
        <div className='message'>{MyComponent()}</div>
        <Searchbar/>
        <WeatherCard/>
      </div>
  );
}

export default App;
