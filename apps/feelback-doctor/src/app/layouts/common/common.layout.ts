import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feelback-doctor-common-layout',
  templateUrl: './common.layout.html',
  styleUrls: ['./common.layout.scss'],
})
export class CommonLayout implements OnInit {
  public date: Date = new Date();

  constructor() {}

  ngOnInit(): void {}
}
