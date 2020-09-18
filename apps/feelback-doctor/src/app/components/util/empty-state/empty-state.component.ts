import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'feelback-doctor-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent implements OnInit {
  constructor() {}

  @Input() entity: string;

  ngOnInit(): void {}
}
