import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { UpdateUserDialogComponent } from '../../../dialogs/update-user-dialog/update-user-dialog.component';
import { AddUserDialogComponent } from '../../../dialogs/add-user-dialog/add-user-dialog.component';
import {MatTableDataSource} from "@angular/material/table";
import {Airport} from "../../../models/airport";
import {MatPaginator} from "@angular/material/paginator";
import {User} from "../../../models/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  displayedColumns: string[] = ['username', 'email', 'role'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((data: any[]) => {
      this.users = data;
      this.filteredUsers = data;
      this.dataSource.data = this.users;
      this.dataSource.paginator = this.paginator;

    });
  }

  applyFilter(): void {
    this.filteredUsers = this.users.filter(
      (user) =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.dataSource.data = this.filteredUsers;
    this.dataSource.paginator = this.paginator;
  }

  onCreatingNewUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.createUser(result).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }

  onUpdate(user: any): void {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.updateUser(user.user_id, result).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }

  onDelete(user: any): void {
    if (confirm('Are you sure you want to delete this flight?')) {
      this.userService
        .deleteUser(user.user_id)
        .subscribe(() => this.loadUsers());
    }
  }
}
