import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {
  listaCurso: string[] = ['C#', 'Java', 'PHP'];
  habilitar = true;
  constructor() { }

   toogle() {
    this.habilitar = ! this.habilitar;
   }

  ngOnInit() {
  }

}
