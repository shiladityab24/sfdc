import { LightningElement } from 'lwc';

export default class WeatherApp extends LightningElement {
    cityName = ''
    searchHandler(event){
        this.cityName = event.target.value;
    }

    submitHandler(event){
        event.preventDefault();
        this.fetchData();
    }

    fetchData(){
        console.log("cityName "+ this.cityName);

        //inside this will call our api
    }
}