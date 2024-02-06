import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { NotificationListComponent } from './notification-list/notification-list.component'
import { NotificationService } from './services/notification.service'
import { CurrentUserService } from './services/current-user.service'

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, NotificationListComponent],
    providers: [NotificationService, CurrentUserService],
    bootstrap: [AppComponent],
})
export class AppModule {}
