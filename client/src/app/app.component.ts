import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { CurrentUserService } from './services/current-user.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    isLogged = this.currentUserService.getInitialLoggedStatus()
    private subscription = new Subscription()

    constructor(private router: Router, private currentUserService: CurrentUserService) {}

    ngOnInit() {
        this.subscription.add(
            this.currentUserService.isLogged$.subscribe((data) => {
                this.isLogged = data
            })
        )
    }

    logout() {
        this.currentUserService.logout()
        this.router.navigate(['/login'])
    }
}
