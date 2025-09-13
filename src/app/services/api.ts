import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://carrito-compras-backend.onrender.com'; //Esta url padre tambien puede ser cambiada por el url Localhost 

  // 🔹 contador reactivo del carrito
  private carritoCount = new BehaviorSubject<number>(0);
  carritoCount$ = this.carritoCount.asObservable();

  constructor(private http: HttpClient) {}

  // Productos
  getProductos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/productos`);
  }

  // Carrito
  getCarrito(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/carrito`);
  }

  addToCarrito(productoId: number, cantidad: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/carrito`, { producto_id: productoId, cantidad }).pipe(
      tap(() => this.actualizarContador()) 
    );
  }

  removeFromCarrito(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/carrito/${id}`).pipe(
      tap(() => this.actualizarContador()) 
    );
  }

  // 🔹 recalcula cantidad total en carrito
  actualizarContador() {
    this.getCarrito().subscribe(items => {
      const total = items.reduce((acc: number, item: any) => acc + item.cantidad, 0);
      this.carritoCount.next(total);
    });
  }
    clearCarrito() {
    return this.getCarrito().pipe(
      switchMap((items: any[]) => {
        if (!items || items.length === 0) return of([]);          // nada que borrar
        // borra todos en paralelo
        return forkJoin(items.map(it => this.removeFromCarrito(it.id)));
      }),
      tap(() => this.actualizarContador())
    );
  }
}
