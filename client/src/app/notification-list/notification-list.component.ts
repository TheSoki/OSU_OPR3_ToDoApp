import { Component } from '@angular/core'
import { NotificationService } from '../services/notification.service'
import { Notification } from '../services/types'
import { CommonModule } from '@angular/common'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.css'],
    standalone: true,
    imports: [CommonModule],
})
export class NotificationListComponent {
    notifications: Notification[] = []
    timeout: any = null
    private subscription = new Subscription()

    constructor(private notificationService: NotificationService) {}

    ngOnInit() {
        this.subscription.add(
            this.notificationService.notification$.subscribe((data) => {
                if (!data) {
                    return
                }

                const notifications = this.notifications
                notifications.push(data)
                this.notifications = notifications
                this.setupNotificationCleanup()
            })
        )
    }

    ngOnDestroy() {
        if (this.timeout) {
            clearTimeout(this.timeout)
        }
        this.subscription.unsubscribe()
    }

    setupNotificationCleanup() {
        if (this.timeout) {
            clearTimeout(this.timeout)
        }

        if (this.notifications.length === 0) {
            return
        }

        this.timeout = setTimeout(() => {
            const notifications = this.notifications
            notifications.shift()
            this.notifications = notifications
            this.setupNotificationCleanup()
        }, 5000)
    }
}
