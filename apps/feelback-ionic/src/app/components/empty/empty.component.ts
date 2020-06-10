import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../../core/components/abstract.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'feelback-ionic-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  providers: [TranslatePipe],
})
export class EmptyComponent extends AbstractComponent implements OnInit {
  constructor(readonly translatePipe: TranslatePipe) {
    super();
  }

  ngOnInit() {}
}
