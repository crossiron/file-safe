import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {SessionService} from '../../services/session.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let sessionService: SessionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{
        provide: SessionService,
        useValue: {
          logout: jasmine.createSpy('logout')
        }
      }],
    }).compileComponents();

    sessionService = TestBed.inject(SessionService);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout on SessionService when logout is called', () => {
    component.logout();
    expect(sessionService.logout).toHaveBeenCalled();
  });
});
