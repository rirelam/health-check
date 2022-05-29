import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'health-check-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FetchDataComponent implements OnInit {
  public forecasts$: Observable<WeatherForecast[]>;
  public forecasts?: WeatherForecast[];

  constructor(private http: HttpClient) {
    this.forecasts$ = this.http.get<WeatherForecast[]>(
      environment.baseUrl + '/api/weatherforecast'
    );
  }

  ngOnInit(): void {
    this.forecasts$.subscribe((result) => {
      this.forecasts = result;
      console.log(`cargado ${JSON.stringify(this.forecasts)}`);
      return this.forecasts;
    });
    // return;
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
