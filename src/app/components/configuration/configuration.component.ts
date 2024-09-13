import { Component } from '@angular/core';
import { ConfigurationSidebarComponent } from '../configuration-sidebar/configuration-sidebar.component';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [ConfigurationSidebarComponent],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {

}
