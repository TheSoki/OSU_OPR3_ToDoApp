import { Component } from '@angular/core'
import { Note, NotificationStatus } from '../services/types'
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
    selector: 'app-create-note',
    templateUrl: './create-note.component.html',
    styleUrls: ['./create-note.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
})
export class CreateNoteComponent {
    constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) {}

    isSubmitting = false

    createNoteFormGroup: FormGroup = new FormGroup({
        content: new FormControl('', [Validators.required, Validators.minLength(3)]),
    })

    onSubmit = async () => {
        this.isSubmitting = true

        this.http
            .post(
                'http://localhost:8080/api/notes',
                {
                    content: String(this.createNoteFormGroup.value.content),
                },
                {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                    responseType: 'text',
                }
            )
            .subscribe({
                next: (response) => {
                    const note = JSON.parse(response) as unknown as Note

                    this.isSubmitting = false

                    this.notificationService.show({
                        message: 'Note added successfuly',
                        type: NotificationStatus.Success,
                    })

                    this.router.navigate(['/'])
                },
                error: (error) => {
                    this.isSubmitting = false

                    this.notificationService.show({
                        message: 'Note add failed',
                        type: NotificationStatus.Error,
                    })
                },
            })
    }
}
