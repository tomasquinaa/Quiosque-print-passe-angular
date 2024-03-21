import { Component, OnInit } from '@angular/core';

// Services
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserName();
  }

  public getUserName() {
    // Recuperar o nome do usuário ao inicializar a página

    this.username = localStorage.getItem('name') || '';
    // console.log(this.username); // Verifique se está imprimindo o nome corretamente no console
  }

  public logout() {
    this.authService.logout();
  }
}
