import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {

  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  private urlEndPoint: string = 'http://localhost:8090/api/clientes';

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let clientes = response as Cliente[];
          return clientes.map(cliente => {
            cliente.nombre = cliente.nombre.toUpperCase();
            return cliente;
          })
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post(this.urlEndPoint,cliente,{headers:this.httpHeaders}).pipe(
          map(
            (response: any) =>  response.cliente as Cliente
          ),
          catchError (e => {
                console.log(e.error.mensaje);
                swal.fire('Error al crear el cliente',e.error.mensaje,'error');
                return throwError(e);
          })
      );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
        catchError (e => {
              if(e.status == 400) {
                return throwError(e);
              }
              this.router.navigate(['/clientes']);
              console.log(e.error.mensaje);
              swal.fire('Error al consultar',e.error.mensaje,'error');
              return throwError(e);
        })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers:this.httpHeaders}).
      pipe(
        catchError (e => {
              if(e.status == 400) {
                return throwError(e);
              }
              console.log(e.error.mensaje);
              swal.fire('Error al actualizar el cliente',e.error.mensaje,'error');
              return throwError(e);
        })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
        catchError (e => {
              console.log(e.error.mensaje);
              swal.fire('Error al eliminar el cliente',e.error.mensaje,'error');
              return throwError(e);
        })
    );
  }

}
