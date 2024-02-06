import { Component } from '@angular/core'
import { NotificationStatus } from '../services/types'
import { Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common'
import { NotificationService } from '../services/notification.service'
import { HttpClient } from '@angular/common/http'
import { CurrentUserService } from '../services/current-user.service'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
})
export class LoginComponent {
    constructor(
        private http: HttpClient,
        private router: Router,
        private notificationService: NotificationService,
        private currentUserService: CurrentUserService
    ) {}

    isSubmitting = false

    loginFormGroup: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    })

    onSubmit = async () => {
        this.isSubmitting = true

        this.http
            .post(
                'http://localhost:8080/api/auth/login',
                {
                    username: String(this.loginFormGroup.value.username),
                    password: String(this.loginFormGroup.value.password),
                },
                { responseType: 'text' }
            )
            .subscribe({
                next: (response) => {
                    this.currentUserService.login(response)

                    this.isSubmitting = false

                    this.notificationService.show({
                        message: 'Login successful',
                        type: NotificationStatus.Success,
                    })

                    this.router.navigate(['/'])
                },
                error: (error) => {
                    this.isSubmitting = false

                    this.notificationService.show({
                        message: 'Login failed',
                        type: NotificationStatus.Error,
                    })
                },
            })
    }
}
