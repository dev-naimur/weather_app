import "./App.css";
import WeatherApp from "./assets/components/WeatherApp";


function App() {
  return (
  
    <div className="app">
      <h1 className="title">Weather App</h1>
      <WeatherApp/>
      <div className="footer_name">
        <h1>Developed By Naimur Rahman</h1>
      </div>
     
    </div>
  );
}

export default App;
