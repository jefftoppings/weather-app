import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherData, WeatherService} from '../weather.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  weather$: Observable<WeatherData>;
  subscriptions: Subscription[];

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weather$ = this.weatherService.getWeatherByCity('Saskatoon');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
