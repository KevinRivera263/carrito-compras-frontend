import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { NumericLiteral } from 'typescript';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,MatButton,MatCard, MatCardActions, MatCardContent, MatSnackBarModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  carrito: any[] = [];
  productos: any[] = [];
  total: number = 0;
  finalizar = false;
  

  constructor(private apiService: ApiService, private snackbar:MatSnackBar) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    
    this.apiService.getCarrito().subscribe({
      next: (carritoData) => {
        this.apiService.getProductos().subscribe({
          next: (productosData) => {
            this.productos = productosData;

            // unir carrito con productos para que podamos cargar imagenes
    this.carrito = carritoData.map((item: any) => {
      const producto = this.productos.find(p => p.nombre === item.nombre);
      return {
        ...item,
        imagen: producto ? producto.imagen_url : 'assets/img/no-image.png' 
      };
    });


    this.calcularTotal();
          },
          error: (err) => console.error('Error al cargar productos', err)
        });
      },
      error: (err) => console.error('Error al cargar carrito', err)
    });
  }


  eliminarProducto(id: number, nombre:string) {
    this.apiService.removeFromCarrito(id).subscribe({
      next: () => {
        this.snackbar.open(
          ` El producto (${nombre}) ha sido eliminado correctamente! 🗑️ `,
          'Cerrar',
          { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' }
        );
        this.cargarCarrito(); // refresca carrito y total
      },
      error: (err) => {
      this.snackbar.open(
          ` Error al eliminar el producto! ⚠️ `,
          'Cerrar',
          { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' }
        );
        console.error('Error al eliminar producto del carrito', err);
      }
    });
  }

  private calcularTotal() {
    this.total = this.carrito.reduce(
      (acc, item) => acc + (item.precio * item.cantidad),
      0
    );
  }
   ArreglarTexto(text: string): string {
  return decodeURIComponent(escape(text));
  }
  finalizarCompra() {
    if (!this.carrito.length) {
      this.snackbar.open('Tu carrito está vacío, Fin de la demo', 'Cerrar', { duration: 2500 });
      return;
    }

    const totalCompra = this.total;
    this.finalizar = true;

    this.apiService.clearCarrito().subscribe({
      next: () => {
        this.finalizar = false;
        this.carrito = [];
        this.total = 0;
        this.snackbar.open(`✅ ¡Compra finalizada! Total: $${totalCompra} Demo finalizada!`, 'Cerrar', {
          duration: 3500,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      error: (err) => {
        this.finalizar = false;
        console.error(err);
        this.snackbar.open('❌ Ocurrió un error al finalizar la compra!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }
}
