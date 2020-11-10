import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
import { OrganizationCardComponent } from './organization-card.component';

describe('OrganizationCardComponent', () => {
  let component: OrganizationCardComponent;
  let fixture: ComponentFixture<OrganizationCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrganizationCardComponent],
        imports: [
          IonicModule.forRoot(),
          NgPipesModule,
          TranslateModule.forRoot(),
        ],
        providers: [TranslatePipe],
      }).compileComponents();
    }),
  );

  it('should create', () => {
    fixture = TestBed.createComponent(OrganizationCardComponent);
    component = fixture.componentInstance;
    component.organization = {
      id: '',
      name: '',
      type: '',
      address: '',
      description: '',
      email: '',
      logo: '',
      phone: '',
      url: '',
    };

    expect(component).toBeTruthy();
  });
});
