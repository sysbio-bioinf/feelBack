import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feelback-web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'feelback-web';
  year = new Date().getFullYear();

  constructor() {}

  ngOnInit() {}
}
