import React,{useState,useRef,useEffect} from 'react';
import search_icon from "../search.png";
import humidity_icon from "../humidity.png";
import wind_icon from '../wind.png';
import "./WeatherApp.css";



function WeatherApp() {

    const [weatherData , setWeatherData] = useState();
    const inputRef = useRef(null);

    const getWeatherData = async (city) => {
            console.log(city)
            if(city === ''){
                setWeatherData(false);
                alert('please enter a city name')
                return
            }
            const url = `http://api.weatherapi.com/v1/current.json?key=${
            import.meta.env.VITE_APP_ID}&q=${city}`;

            try{
                const res = await fetch (url);
                const data = await res.json();
                console.log(data);

                setWeatherData({
                    humidity: data.current.humidity,
                    wind: data.current.wind_kph,
                    location: data.location.name,
                    country: data.location.country,
                    condition: data.current.condition.text,
                    condition_icon: data.current.condition.icon,
                    temperature: data.current.temp_c,
                    feels_like: data.current.feelslike_c,
                    icon: "https" + data.current.condition.icon,
                })
            }catch(error){
                console.log(error);
            };
            
    }

    useEffect(() => {
        getWeatherData("Dhaka")
    },[]);


    return (
        <div className='weather'>

            <div className='search_bar'>
                <input ref={inputRef} 
                type='text'
                placeholder='Search For a City'/>
                <img src={search_icon}
                alt='search'
                onClick={() => getWeatherData(inputRef.current.value)}
                />
            </div>

            {weatherData ?(
                <>

                <img src={weatherData.condition_icon}
                alt='condition'
                className='weather_icon'
                />
                <p className='temperature'>{weatherData.temperature}°</p>
                <p className='location'>{weatherData.location} , {weatherData.country}</p>
                <p className='condition'>{weatherData.condition}</p>
                <p className='feel_like'>Feels Like {weatherData.feels_like}°</p>

                <div className="weather_data">
                    <div className="col">
                        <img src={humidity_icon}
                        alt='humidity'
                        />
                       <div>
                        <p>
                            {weatherData.humidity}% <span>Humidity</span>
                        </p>
                       </div>
                    </div>
                    <div className="col">
                        <img src={wind_icon}
                        alt=''
                        />
                          <div>
                        <p>
                            {weatherData.wind}Kmh<span>Wind Speed</span>
                        </p>
                       </div>
                    </div>
                </div>

                </>
            ):(
                <p>Loading..............</p>
            )

            }

        </div>
    );
}

export default WeatherApp;