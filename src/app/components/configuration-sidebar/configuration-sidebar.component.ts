import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import {faBox} from '@fortawesome/free-solid-svg-icons';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-configuration-sidebar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './configuration-sidebar.component.html',
  styleUrl: './configuration-sidebar.component.css'
})
export class ConfigurationSidebarComponent {
  @Output() selectedOption = new EventEmitter<string>()

  constructor(private loginService: LoginService) {
   
  }

  faRightFromBracket = faRightFromBracket
  faBell = faBell
  faPalette = faPalette
  faBox = faBox
  faDollarSign = faDollarSign
  faUser = faUser
  faList = faList

  selectOption(option: string) {
    this.selectedOption.emit(option)
  }

  logout() {
    this.loginService.logout()
  }
}
