import { ClienteService } from './cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import swal from 'sweetalert2';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente() {
    this.clienteService
    .getClientes()
    .subscribe(clientes => this.clientes = clientes);
  }


  constructor(private clienteService: ClienteService) {
   }

   delete(id) {
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar al cliente ${id} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(id).subscribe(response => {
          this.clientes = this.clientes.filter(cliente => cliente.id !== id);
          swal(
            'Cliente eliminado!',
            'Cliente eliminado con exito.',
            'success'
          );
        });
      }
    });
  }


}
