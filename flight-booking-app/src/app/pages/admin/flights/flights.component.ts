import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FlightsService } from '../../../services/flights.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../../../dialogs/update-flight-dialog/update-dialog.component';
import { AddFlightDialogComponent } from '../../../dialogs/add-flight-dialog/add-flight-dialog.component';
import {MatPaginator} from "@angular/material/paginator";
import {Flight} from "../../../models/flight";
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent implements OnInit {
  flights: any[] = [];
  displayedColumns: string[] = [
    'flight_id',
    'airline',
    'origin',
    'destination',
    'departure_date',
    'arrival_date',
    'capacity',
    'price',
  ];
  filteredFlights: MatTableDataSource<any>;
  searchTerm: string = '';
  dataSource = new MatTableDataSource<Flight>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private flightsService: FlightsService,
    private dialog: MatDialog
  ) {}

  onCreatingNewFlight(): void {
    const dialogRef = this.dialog.open(AddFlightDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.flightsService.createFlight(result).subscribe(() => {
          console.log('Flight created successfully');
          this.fetchFlights();
        });
      } else {
        console.log('Creating new flight canceled');
      }
    });
  }

  ngOnInit(): void {
    this.fetchFlights();
  }

  fetchFlights() {
    this.flightsService.getAllFlights().subscribe((data) => {
      this.flights = data;
      this.filteredFlights = new MatTableDataSource(this.flights);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(): void {
    this.filteredFlights.filter = this.searchTerm.trim().toLowerCase();
    this.dataSource = this.filteredFlights;
    this.dataSource.paginator = this.paginator;
  }
  onUpdate(flight: any): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      autoFocus: false,
      data: { ...flight },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.flightsService
          .updateFlight(flight.flight_id, result)
          .subscribe(() => {
            this.fetchFlights();
          });
      }
    });
  }

  onDelete(flight: any): void {
    if (confirm('Are you sure you want to delete this flight?')) {
      this.flightsService
        .checkFlight(flight.flight_id)
        .subscribe((response) => {
          if (response.exists) {
            this.flightsService.deleteFlight(flight.flight_id).subscribe(() => {
              this.fetchFlights();
            });
          } else {
            this.fetchFlights();
          }
        });
    }
  }
}
