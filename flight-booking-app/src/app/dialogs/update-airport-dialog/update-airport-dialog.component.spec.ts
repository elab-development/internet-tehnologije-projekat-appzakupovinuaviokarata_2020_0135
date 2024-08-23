import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAirportDialogComponent } from './update-airport-dialog.component';

describe('UpdateAirportDialogComponent', () => {
  let component: UpdateAirportDialogComponent;
  let fixture: ComponentFixture<UpdateAirportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAirportDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAirportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
