import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
   private cliente: Cliente = new Cliente();
   private titulo = 'Registrar cliente';
  constructor() { }

  ngOnInit() {
  }

  create(): void {
   console.log('Click');
   console.log(this.cliente);
  }

}
