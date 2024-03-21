import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';

// Services
import { JwtHelperService } from '@auth0/angular-jwt';
import { User, UserToken } from '../models/user-model';

// Posso criar uma funcao para as informações do meu passe

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://kiosk.rcsangola.co.ao/api';

  constructor(private http: HttpClient, private router: Router) {}

  public sign(payload: {
    email: string;
    password: string;
  }): Observable<UserToken> {
    return this.http
      .post<UserToken>(`${this.url}/login/docuware`, payload)
      .pipe(
        map((res: UserToken) => {
          this.clearLocalStorage();
          this.saveToLocalStorage('access_token', res.access_token);
          this.saveToLocalStorage('name', res.user.name);
          this.saveToLocalStorage('occupation', res.user.occupation);
          this.saveToLocalStorage('matricula', res.user.id);
          this.saveToLocalStorage('hire_date', res.user.hire_date);
          this.saveToLocalStorage('photo', res.user.photo);
          this.navigateToAdmin();
          return res;
        }),
        catchError((error) => this.handleError(error))
      );
  }

  private clearLocalStorage(): void {
    localStorage.clear();
  }

  private saveToLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  private navigateToAdmin(): void {
    this.router.navigate(['admin']);
  }

  private handleError(error: any): Observable<never> {
    if (error.error.message) {
      return throwError(() => error.error.message);
    }

    return throwError(
      () =>
        'No momento não estamos conseguindo validar estes dados, tente novamente mais tarde!'
    );
  }

  // Função Sair
  public logout() {
    localStorage.removeItem('access_token');
    return this.router.navigate(['']);
  }

  // Função que verifica se esta autenticado, foi passado no guard
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if (!token) return false;

    // Importa
    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }

  public wizaPagamento(token: string): Observable<string> {
    const url = `${this.url}/payments/pay-card`;
    const access_token = token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${access_token}`,
    });

    return this.http.post<any>(url, null, { headers }).pipe(
      map((response: any) => {
        //console.log('Resposta API', response);
        return response.payment_link;
      }),
      catchError((error) => {
        console.error('Erro ao processar pagamento:', error);
        throw new Error(`Erro ao processar pagamento: ${error}`);
      })
    );
  }
}

// public sign(payload: { email: string; password: string }): Observable<any> {
//   return this.http
//     .post<{ access_token: string }>(`${this.url}/login/docuware`, payload)
//     .pipe(
//       map((res) => {
//         // Este localStorage vai remover os dados
//         localStorage.removeItem('');
//         // localStorage.setItem(
//         //   'access_token',
//         //   JSON.stringify(res.access_token)
//         // );

//         // Vai salvar os dados
//         localStorage.setItem('access_token', res.access_token);
//         localStorage.setItem('username', res.username);
//         return this.router.navigate(['admin']);
//       }),
//       catchError((e) => {
//         if (e.error.message) return throwError(() => e.error.message);

//         return throwError(
//           () =>
//             'No momento não estamos conseguido validar este dados, tente novamente mais tarde!'
//         );
//       })
//     );
// }
