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

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
})
export class RegisterComponent {
    constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) {}

    isSubmitting = false

    registerFormGroup: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    })

    onSubmit = async () => {
        this.isSubmitting = true

        this.http
            .post(
                'http://localhost:8080/api/auth/register',
                {
                    username: String(this.registerFormGroup.value.username),
                    password: String(this.registerFormGroup.value.password),
                },
                { responseType: 'text' }
            )
            .subscribe({
                next: (response) => {
                    this.isSubmitting = false

                    this.notificationService.show({
                        message: 'Register successful',
                        type: NotificationStatus.Success,
                    })

                    this.router.navigate(['/login'])
                },
                error: (error) => {
                    this.isSubmitting = false

                    this.notificationService.show({
                        message: 'Register failed',
                        type: NotificationStatus.Error,
                    })
                },
            })
    }
}
