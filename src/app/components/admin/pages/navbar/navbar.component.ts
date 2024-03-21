import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUsername();
  }

  public getUsername() {
    this.username = localStorage.getItem('name') || '';
  }

  public logout() {
    this.authService.logout();
  }
}
