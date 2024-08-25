import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AirportService } from '../../../services/airport.service';
import { Airport } from '../../../models/airport';
import { UpdateAirportDialogComponent } from '../../../dialogs/update-airport-dialog/update-airport-dialog.component';
import { AddAirportDialogComponent } from '../../../dialogs/add-airport-dialog/add-airport-dialog.component';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.scss'],
})
export class AirportsComponent implements OnInit {
  airports: Airport[] = [];
  filteredAirports: Airport[] = [];
  searchTerm: string = '';
  displayedColumns: string[] = ['name', 'city', 'country'];
  dataSource = new MatTableDataSource<Airport>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private airportService: AirportService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAirports();
  }

  getAirports(): void {
    this.airportService.getAllAirports().subscribe((airports: Airport[]) => {
      this.airports = airports;
      this.filteredAirports = airports;
      this.dataSource.data = airports;
      this.dataSource.paginator = this.paginator;

    });
  }

  search(): void {
    if (this.searchTerm) {
      this.filteredAirports = this.airports.filter(
        (airport) =>
          airport.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          airport.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          airport.country.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredAirports = this.airports;
    }

    this.dataSource.data = this.filteredAirports;
    this.dataSource.paginator = this.paginator;
  }

  onCreatingNewAirport(): void {
    const dialogRef = this.dialog.open(AddAirportDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.airportService.addAirport(result).subscribe(() => {
          this.getAirports();
        });
      }
    });
  }

  onUpdate(airport: any): void {
    const dialogRef = this.dialog.open(UpdateAirportDialogComponent, {
      data: airport,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.airportService
          .updateAirport(airport.airport_id, result)
          .subscribe(() => {
            this.getAirports();
          });
      }
    });
  }

  onDelete(airport: Airport): void {
    if (
      confirm(`Are you sure you want to delete the airport "${airport.name}"?`)
    ) {
      this.airportService.deleteAirport(airport.airport_id).subscribe(() => {
        this.getAirports();
      });
    }
  }
}
