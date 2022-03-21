import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboardv2Component } from './dashboardv2.component';

describe('Dashboardv2Component', () => {
  let component: Dashboardv2Component;
  let fixture: ComponentFixture<Dashboardv2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dashboardv2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboardv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
