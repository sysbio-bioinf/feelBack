import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fileSaver from 'file-saver';
import { CommonService } from '../../../services/common.service';
import { Screening } from '../../../graphql/generated/feelback.graphql';
import { ScreeningService } from '../../../services/screening.service';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'feelback-doctor-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    public commonService: CommonService,
    public screeningService: ScreeningService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @Input() screening: Screening;
  @Input() patientId: string;
  @Input() instrumentId: string;
  @Output() printEvent = new EventEmitter<void>();

  ngOnInit(): void {}

  public downloadScreening(screening: Screening) {
    const blob = new Blob([JSON.stringify(screening, null, 3)], {
      type: 'text/json',
    });
    fileSaver.saveAs(
      blob,
      'jsonExport_' +
        this.commonService.transformDate(screening.collectedAt) +
        '.json',
    );
  }

  public printScreening() {
    this.printEvent.emit();
  }

  public copyURL() {
    const dummy = document.createElement('input'),
      text = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    this.snackBar.open('URL copied to clipboard', '×', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public changePage($event: PageEvent) {
    const screeningId = this.screeningService.paginateScreenings($event.pageIndex);
    this.router.navigate(['../' + screeningId], {
      relativeTo: this.route,
    });
  }
}
