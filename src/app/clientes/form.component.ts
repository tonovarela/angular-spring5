import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
   private cliente: Cliente = new Cliente();
   private titulo = 'Registrar cliente';
  constructor( private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.cargarCliente();
  }

   cargarCliente(): void {
    this.activatedRoute.params.subscribe( params => {
      const id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe(
          (cliente) =>  this.cliente = cliente);
      }
    });
   }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes']);
        swal('Nuevo cliente', `Cliente ${this.cliente.nombre} creado con exito`, 'success');
      }
    );
   console.log('Click');
   console.log(this.cliente);
  }

}
