import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NgPipesModule } from 'ngx-pipes';
import { OrganizationCardComponent } from './organization-card.component';

describe('OrganizationCardComponent', () => {
  let component: OrganizationCardComponent;
  let fixture: ComponentFixture<OrganizationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationCardComponent],
      imports: [IonicModule.forRoot(), NgPipesModule],
    }).compileComponents();
  }));

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
