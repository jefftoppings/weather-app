import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

const API_KEY = 'de7b16f34b9f680ac6a33c5f8ec8cc03';
const WIND_CONVERSION = 3.6;

interface WeatherApiData {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  wind: {
    speed: number;
  };
}

export interface WeatherData {
  temp: number;
  minTemp: number;
  maxTemp: number;
  wind: number;
  sunrise: string;
  sunset: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  static convertUnixTimestamp(timestamp: number) {
    const date: Date = new Date(timestamp * 1000);
    const hours: string = date.getHours() + '';
    const minutes: string = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + '';
    return hours + ':' + minutes;
  }

  getWeatherByCity(city: string): Observable<WeatherData> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;
    return this.http.get(url).pipe(
      map((data: WeatherApiData) => {
        const weather: WeatherData = {
          temp: data.main.temp,
          minTemp: data.main.temp_min,
          maxTemp: data.main.temp_max,
          wind: data.wind.speed * WIND_CONVERSION,
          sunrise: WeatherService.convertUnixTimestamp(data.sys.sunrise),
          sunset: WeatherService.convertUnixTimestamp(data.sys.sunset),
        };
        return weather;
      })
    );
  }
}
