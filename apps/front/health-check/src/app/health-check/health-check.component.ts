import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'health-check-health-check',
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthCheckComponent implements OnInit {
  public result: Result = {checks: [], totalStatus: '', totalResponseTime: 0 };
  public result$: Observable<Result>;

  constructor(private http: HttpClient) {
    this.result$ = this.http.get<Result>(environment.baseUrl + '/api/health');
  }

  ngOnInit() {
    this.result$.subscribe((result) => {
      this.result = result;
    });
    console.log(`Dato: ${JSON.stringify(this.result)}`);
 }

}

interface Result {
  checks: Check[];
  totalStatus: string;
  totalResponseTime: number;
}

interface Check {
  name: string;
  responseTime: number;
  status: string;
  description: string;
}
