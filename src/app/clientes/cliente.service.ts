import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of , throwError} from 'rxjs';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

import { Router } from '@angular/router';






@Injectable({
  providedIn: 'root'
})
export class ClienteService {
   private urlEndPoint = 'http://localhost:8080/api/clientes';
   private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
       return this
       .http
       .get(this.urlEndPoint)
       .pipe(
            map( response => response as Cliente[])
          );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, { headers: this.httpHeaders})
          //  .pipe( map( response => response as Cliente ) );
          .pipe(
             map( response => response as Cliente ),
             catchError( e => {
              swal('Error al crear el cliente', ' ', 'error');
              return throwError(e);
            })
          );

  }

  getCliente(id): Observable<Cliente> {
     return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
       catchError( e => {
         this.router.navigate(['/clientes']);
         console.log(e.error);
         swal('Error al editar', e.error.Mensaje, 'error');
         return throwError(e);
       })
     );
  }

  update (cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        swal('Error al editar el cliente', ' ', 'error');
        return throwError(e);
      })
    );
  }

  delete (id) {
    console.log(`${this.urlEndPoint}/${id}`);
     return this.http.delete(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders}).pipe(
      catchError( e => {
        swal('Error al eliminar el cliente', e.error.Mensaje, 'error');
        return throwError(e);
      })
    );
  }

}
