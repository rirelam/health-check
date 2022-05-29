import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'health-check-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FetchDataComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
