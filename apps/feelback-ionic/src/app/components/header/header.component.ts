import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'feelback-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() showNavButton = false;
  @Input() showBackButton = false;

  constructor() {}

  ngOnInit() {}
}
