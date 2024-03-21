import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importei o HttpClientModule
import { HttpClientModule } from '@angular/common/http';

// Routing
import { AdminRoutingModule } from './admin-routing.module';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { PasseColaboradorComponent } from './pages/passe-colaborador/passe-colaborador.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PasseColaboradorComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, HttpClientModule],
})
export class AdminModule {}
