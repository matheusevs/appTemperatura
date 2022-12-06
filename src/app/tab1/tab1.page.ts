import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public cidade: any = "";

  constructor() {}

  ngOnInit(): void {
      
  }

  pesquisaClima() {
    this.mostraInformacao();

    var apiKey = '';
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cidade}&appid=${apiKey}&lang=pt_br&units=metric&`;

    const apiCountryURL = "https://countryflagsapi.com/png/";
    const apiUnsplash = "https://source.unsplash.com/1600x900/?";

    const cityElement = <HTMLFormElement>document.querySelector("#city");
    const tempElement = <HTMLFormElement>document.querySelector("#temperature span");
    const descElement = <HTMLFormElement>document.querySelector("#description");
    const weatherIconElement = <HTMLFormElement>document.querySelector("#weather-icon");
    const countryElement = <HTMLFormElement>document.querySelector("#country");
    const umidityElement = <HTMLFormElement>document.querySelector("#umidity span");
    const windElement = <HTMLFormElement>document.querySelector("#wind span");
    const weatherContainer = <HTMLFormElement>document.querySelector("#weather-data");
    const loader = <HTMLFormElement>document.querySelector("#loader");

    loader.classList.toggle("hide");

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        
        if(data.cod === "404"){
          this.exibeMensagemErro();
          loader.classList.toggle("hide");
          return;
        }
        console.log(data.main.temp)
        cityElement.innerText = data.name;
        const mainTemp = parseInt(data.main.temp);
        tempElement.innerText = `${mainTemp}`;
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        );

        countryElement.setAttribute("src", apiCountryURL + data.sys.country);
        umidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed}km/h`;

        document.body.style.backgroundImage = `url("${apiUnsplash + this.cidade}")`;
        loader.classList.toggle("hide");
        weatherContainer.classList.remove("hide");
    })
  }

  mostraInformacao(){
    const errorMessageContainer = <HTMLFormElement>document.querySelector("#error-message");
    const weatherContainer = <HTMLFormElement>document.querySelector("#weather-data");

    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
  }

  exibeMensagemErro(){
    const errorMessageContainer = <HTMLFormElement>document.querySelector("#error-message");
    errorMessageContainer.classList.remove("hide");
  }
}
