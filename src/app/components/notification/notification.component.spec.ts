import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NotificationComponent} from './notification.component';
import {By} from '@angular/platform-browser';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be empty if no notification provided', async () => {
    fixture.componentRef.setInput('notification', undefined);
    await fixture.whenStable();
    expect(fixture.debugElement.query(By.css('.notification'))).toBeNull();
  });

  it('should show if notification is provided', async () => {
    fixture.componentRef.setInput('notification', {
      type: 'success',
      message: 'success message'
    });
    await fixture.whenStable();
    expect(fixture.debugElement.query(By.css('.notification')).classes).toEqual({
      'is-success': true,
      'notification': true
    });
  });

  it('should emit onClose when onCloseClick is called and clears notification', () => {
    fixture.componentRef.setInput('notification', {
      type: 'success',
      message: 'success message'
    });

    component.onCloseClick = spyOn(component, 'onCloseClick').and.callThrough();

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.notification'))).not.toBeNull();

    fixture.debugElement.query(By.css('.delete')).triggerEventHandler('click');

    fixture.detectChanges();

    expect(component.onCloseClick).toHaveBeenCalled();
    expect(fixture.debugElement.query(By.css('.notification'))).toBeNull();
  })
});
