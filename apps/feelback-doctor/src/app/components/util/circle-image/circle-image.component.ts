import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'feelback-doctor-circle-image',
  templateUrl: './circle-image.component.html',
  styleUrls: ['./circle-image.component.scss'],
})
export class CircleImageComponent implements OnInit {
  constructor() {}

  @Input() image: string;

  ngOnInit(): void {}
}
