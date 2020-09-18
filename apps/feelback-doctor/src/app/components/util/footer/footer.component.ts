import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feelback-doctor-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  public date: Date = new Date();

  ngOnInit(): void {}
}
