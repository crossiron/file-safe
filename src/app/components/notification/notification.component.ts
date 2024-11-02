import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Notification} from '../../models/notification.model';

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss'
})
export class NotificationComponent {
    @Input() notification?: Notification;
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    onCloseClick() {
        this.notification = undefined
        this.onClose.emit();
    }
}
