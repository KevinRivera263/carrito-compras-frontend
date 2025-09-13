import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInput, MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';





@Component({
  selector: 'app-home',
  imports: [CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatInputModule, 
    FormsModule,
    MatFormFieldModule, 
    MatFormField, 
    MatIconModule, 
    MatSnackBarModule,
    MatProgressSpinnerModule, MatProgressBarModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  productos: any[] = [];
  loadingP = false;
  errorMsg = '';

constructor(
  private apiService: ApiService,
  private snackBar: MatSnackBar
) {}


ngOnInit() {
  this.loadingP = true;
  this.apiService.getProductos().subscribe({
    next: (data) => {
      // agregamos cantidad = 1 a cada producto
      this.productos = data.map((p: any) => ({
        ...p,
        cantidad: 1
      }));
      this.loadingP = false;
    },
    error: (err) => {
      console.error('Error al cargar productos', err);
      this.errorMsg = 'No pudimos cargar los productos. Intenta de nuevo.';
      this.loadingP = false;
    }
  });
}


  agregarAlCarrito(productoId: number, cantidad: number) {
    const cantidadFinal = cantidad && cantidad > 0 ? cantidad : 1;

    this.apiService.addToCarrito(productoId, cantidadFinal).subscribe({
      next: () => {
        this.snackBar.open(
          ` Agregaste ${cantidadFinal} productos al carrito! ✅ `,
          'Cerrar',
          { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' }
        );
      },
      error: (err) => {
        this.snackBar.open(
          `❌ Error al agregar al carrito`,
          'Cerrar',
          { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' }
        );
        console.error('Error al agregar al carrito', err);
      }
    });
  }

    ArreglarTexto(text: string): string {
    return decodeURIComponent(escape(text));
    }

    incrementar(p: any) {
    const actual = Number(p.cantidad ?? 1);
    const max = Number(p.stock ?? actual);
    p.cantidad = Math.min(max, actual + 1);
    }

     decrementar(p: any) {
    const actual = Number(p.cantidad ?? 1);
    p.cantidad = Math.max(1, actual - 1);
  }
}


