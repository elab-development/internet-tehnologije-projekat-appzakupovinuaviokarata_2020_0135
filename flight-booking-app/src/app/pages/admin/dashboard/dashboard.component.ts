import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  user: any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }
}
