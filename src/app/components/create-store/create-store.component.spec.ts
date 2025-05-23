import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CreateStoreComponent } from './create-store.component';

describe('CreateStoreComponent', () => {
  let component: CreateStoreComponent;
  let fixture: ComponentFixture<CreateStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStoreComponent],
      providers: [provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
