import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'cancerlog-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage implements OnInit {
  constructor(private translatePipe: TranslatePipe) {}

  pseudonym: string;

  ngOnInit() {}

  async submitForm() {
    console.log(this.pseudonym);
  }
}
