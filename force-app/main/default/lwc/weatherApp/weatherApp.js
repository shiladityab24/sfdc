import { LightningElement } from 'lwc';
const API_KEY = 'fd386428ac134167f8cdd28236c54310'
import WEATHER_ICON from '@salesforce/resourceUrl/weatherAppIcons'
export default class WeatherApp extends LightningElement {
  clearIcon = WEATHER_ICON + '/weatherAppIcons/clear.svg'
  cloudIcon = WEATHER_ICON + '/weatherAppIcons/cloud.svg'
  dropletIcon = WEATHER_ICON + '/weatherAppIcons/droplet.svg'
  hazeIcon = WEATHER_ICON + '/weatherAppIcons/haze.svg'
  mapIcon = WEATHER_ICON + '/weatherAppIcons/map.svg'
  rainIcon = WEATHER_ICON + '/weatherAppIcons/rain.svg'
  snowIcon = WEATHER_ICON + '/weatherAppIcons/snow.svg'
  stormIcon = WEATHER_ICON + '/weatherAppIcons/storm.svg'
  thermometerIcon = WEATHER_ICON + '/weatherAppIcons/thermometer.svg'
  arrowBackIcon = WEATHER_ICON + '/weatherAppIcons/arrow-back.svg'
  




  cityName = ''
  loadingText = ''
  isError = false

  get loadingClasses(){
    return this.isError ? 'error-msg':'success-msg';
  } 

  searchHandler(event){
    this.cityName = event.target.value
  }

  submitHandler(event){
    event.preventDefault()
    this.fetchData()
  }

  fetchData(){
    this.isError = false
    this.loadingText = 'Fetching weather details...'
    console.log("cityName", this.cityName)
    //inside this will call our api

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${API_KEY}`
    fetch(URL).then(res=>res.json()).then(result=>{
        console.log(JSON.stringify(result))
        this.weatherDetails(result)
    }).catch((error)=>{
        console.error(error)
        this.loadingText = "Something went wrong"
        this.isError = true
    })
  }

  weatherDetails(info){
    if(info.cod === "404"){
      this.isError = true
      this.loadingText = `${this.cityName} isn't a valid city name`
    } else {
      this.loadingText = ''
    }
  }
}