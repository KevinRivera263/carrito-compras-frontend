import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { ApiService } from './services/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbar, MatButton, MatBadgeModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  carritoCount = 0;
  protected readonly title = signal('carrito-compras-frontend');
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.actualizarContador();
    this.apiService.carritoCount$.subscribe(count => this.carritoCount = count);
  }
  ArreglarTexto(text: string): string {
  return decodeURIComponent(escape(text));
  }
}
