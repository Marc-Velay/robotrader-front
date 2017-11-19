import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalDisplayComponent } from './historical-display.component';

describe('HistoricalDisplayComponent', () => {
  let component: HistoricalDisplayComponent;
  let fixture: ComponentFixture<HistoricalDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
