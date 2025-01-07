import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomField } from '../../interfaces/customField';
import { AppearanceService } from '../../services/appearance.service';
import { LoginService } from '../../services/login.service';
import { AlertComponent } from '../alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appearance',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './appearance.component.html',
  styleUrl: './appearance.component.css'
})
export class AppearanceComponent {

  customFields: CustomField[] = []
  customFieldForm: FormGroup

  logoUrl: File | null = null;

  alert = new AlertComponent();

  constructor(private appearanceService: AppearanceService, private loginService: LoginService,private fb: FormBuilder) {
    this.customFieldForm = fb.group({
      'name': ['', Validators.required],
      'primary_color': ['', Validators.required],
      'secondary_color': ['', Validators.required],
      'font_name': ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getCustomFields()
  }

  getCustomFields() {
    const savedFields = JSON.parse(localStorage.getItem('customFields') || '[]')
    if (savedFields && savedFields.length > 0) {
      const customField = savedFields[0];
      this.customFieldForm.patchValue({
        name: customField.name,
        primary_color: customField.primary_color,
        secondary_color: customField.secondary_color,
        font_name: customField.font_name
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.logoUrl = file;
  }

  create() {
    const storeId = this.loginService.getStoreId()

    if (!storeId) {
      console.error('Store ID não encontrado!');
      return;
    }

    if (this.customFieldForm.invalid, !this.logoUrl) {
      return;
    }

    const formData = new FormData()
    formData.append('name', this.customFieldForm.get('name')?.value)
    formData.append('primary_color', this.customFieldForm.get('primary_color')?.value)
    formData.append('secondary_color', this.customFieldForm.get('secondary_color')?.value)
    formData.append('logoUrl', this.logoUrl)
    formData.append('font_name', this.customFieldForm.get('font_name')?.value)
    formData.append('storeId', storeId);
    this.appearanceService.create(formData)
    console.log('ola')
    this.alert.showAlert('Campo adicionado com sucesso', 'success')
  }
}
