import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
showAlert(title: string, icon: 'success' | 'error' | 'info' | 'warning'): void {
    Swal.fire({
      title: title,
      icon: icon,
      position: 'top-right',
      showConfirmButton: false,
      showCloseButton: true,
      closeButtonAriaLabel: 'Fechar',
      timer: 1500,
      toast: true,
      timerProgressBar: true,
      customClass: {
        popup: 'custom-alert-size'
      },
      didOpen: () => {
        Swal.getPopup()?.classList.add('animate__animated', 'animate__fadeInRight');
      },
      willClose: () => {
        Swal.getPopup()?.classList.add('animate__animated', 'animate__fadeOutRight'); 
      }
    });
  }
}
