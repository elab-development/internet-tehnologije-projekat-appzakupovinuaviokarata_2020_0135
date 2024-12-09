import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAirportDialogComponent } from './add-airport-dialog.component';

describe('AddAirportDialogComponent', () => {
  let component: AddAirportDialogComponent;
  let fixture: ComponentFixture<AddAirportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAirportDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAirportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
