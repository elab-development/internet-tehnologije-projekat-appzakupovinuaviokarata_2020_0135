import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  // airports: any[]= [];
  // constructor(private searchService: SearchService){}
  // ngOnInit(){
  //   this.loadAirports();
  // }
  // loadAirports(){
  //   this.searchService.getAllAirport().subscribe((res:any=>{
  //     this.airports = res.data;
  //   }))
  // }
}
