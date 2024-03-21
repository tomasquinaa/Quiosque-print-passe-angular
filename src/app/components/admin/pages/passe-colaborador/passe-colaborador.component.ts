import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-passe-colaborador',
  templateUrl: './passe-colaborador.component.html',
  styleUrls: ['./passe-colaborador.component.css'],
})
export class PasseColaboradorComponent implements OnInit {
  public username: string = '';
  public occupation: string = '';
  public matricula: string = '';
  public hire_date: string = '';
  public photo: string = '';
  // occupation: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getPasseColaborador();
  }

  public getPasseColaborador() {
    this.username = localStorage.getItem('name') || '';
    this.occupation = localStorage.getItem('occupation') || '';
    this.matricula = localStorage.getItem('matricula') || '';
    this.hire_date = localStorage.getItem('hire_date') || '';
    this.photo = localStorage.getItem('photo') || '';
  }

  public fazerPagamentoViaWiza() {
    const token = localStorage.getItem('access_token') || '';

    try {
      this.authService.wizaPagamento(token).subscribe(
        (paymentLink: string) => {
          // window.open(paymentLink); // Abre o link em uma nova aba
          window.location.href = paymentLink;
        },
        (error) => {
          console.error('Erro ao fazer pagamento via WIZA:', error);
          // Lógica para tratamento de erro, se necessário
        }
      );
    } catch (error) {
      console.error('Erro ao fazer pagamento via WIZA:', error);
      // Lógica para tratamento de erro, se necessário
    }
  }
}
