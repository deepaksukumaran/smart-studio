import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsPagesComponent } from './order-details-pages.component';

describe('OrderDetailsPagesComponent', () => {
  let component: OrderDetailsPagesComponent;
  let fixture: ComponentFixture<OrderDetailsPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailsPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
