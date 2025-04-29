import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ConfigurationSidebarComponent } from './configuration-sidebar.component';

describe('ConfigurationSidebarComponent', () => {
  let component: ConfigurationSidebarComponent;
  let fixture: ComponentFixture<ConfigurationSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationSidebarComponent],
      providers: [provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
