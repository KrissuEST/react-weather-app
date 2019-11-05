import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

//My personal API key when I created an account at https://openweathermap.org/
const API_KEY = "f1bf2e8cd0a1dd06245d2fb440348e3a";

//React version 16 in use here!!! No constructors.
//Initialize the component.
class App extends React.Component {
  state = {    //State is an object what lives within the component.
    //Initial states here.
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    wind_speed: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {   //e - event object in JavaScript
    e.preventDefault();   //Because of that no full page refresh every time.
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();   //Converting api_call result to json.
    console.log(data);
    if (city && country) {    //Check if values are added.
      this.setState({    //Better practice with setState.
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        wind_speed: undefined,
        description: undefined,
        error: "Please enter the needed values."
      });
    }
  }
  //Render helps to display data what goes inside the component.
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                {/* We are using here 5 columns at left hand side. */}
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                {/* We are using here 7 columns at right hand side. Between 2 major components that we need. */}
                <div className="col-xs-7 form-container">
                  {/* Creating and setting up props and it's value to getWeather function.
                      Also, now it's possible to access getWeather in Form.js */}
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    wind_speed={this.state.wind_speed}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
//Export - Make App component available for other files to import it.
export default App;
