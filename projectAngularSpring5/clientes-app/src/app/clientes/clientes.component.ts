import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

const swalWithBootstrapButtons = swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );

  }

  delete(cliente: Cliente): void {
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si desea eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).
          subscribe( response => {
             this.clientes = this.clientes.filter(cli => cli != cliente)
              swal.fire(
                'Cliente Eliminado!',
                `Cliente ${cliente.nombre} ${cliente.apellido} eliminado con éxito .`,
                'success'
              )
          })

        swalWithBootstrapButtons.fire(
          'Cliente Eliminado!',
          `Cliente ${cliente.nombre} ${cliente.apellido} eliminado con éxito .`,
          'success'
        )
      }
    })
  }



}
