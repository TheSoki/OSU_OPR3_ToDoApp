import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { NotificationStatus, Notification, NotificationInput } from './types'

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private notificationSubject = new BehaviorSubject<Notification | null>(null)
    readonly notification$ = this.notificationSubject.asObservable()

    show(notification: NotificationInput): void {
        this.notificationSubject.next({
            message: notification.message,
            type: notification.type,
            createdAt: new Date(),
        })
    }

    hide(): void {
        this.notificationSubject.next(null)
    }
}
