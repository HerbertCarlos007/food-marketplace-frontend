import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [FontAwesomeModule, ModalComponent],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent {
  faPlus = faPlus
  faTrashCan = faTrashCan
  faPencil = faPencil
  faFilter = faFilter

  isModalOpen: boolean = false

  setOpenModal() {
    this.isModalOpen = !this.isModalOpen
  }
  
  setCloseModal(): void {
    this.isModalOpen = !this.isModalOpen
  }
}
