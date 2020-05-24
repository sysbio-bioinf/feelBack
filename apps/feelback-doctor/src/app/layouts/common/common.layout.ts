import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feelback-doctor-common-layout',
  templateUrl: './common.layout.html',
  styleUrls: ['./common.layout.scss']
})
export class CommonLayout implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public date: Date = new Date();

}
