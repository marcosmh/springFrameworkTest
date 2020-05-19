import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo:string = "Crear Cliente";

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargaCliente();
  }

  cargaCliente(): void {
    this.activatedRoute.params.subscribe(
      params => {
          let id = params['id']
          if(id){
            this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente )
          }
      })
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente',`Cliente ${cliente.nombre} ha sido creado con exito!`,'success')
      }

    );

  }

  update(): void {
    this.clienteService.update(this.cliente).
      subscribe(
        json => {
          console.log(json)
          this.router.navigate(['clientes'])
          swal.fire('Cliente Actualizado',`${json.mensaje}: ${json.cliente.nombre}`,'success')
        })
  }



}
