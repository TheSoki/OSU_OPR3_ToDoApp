import { Component, Input } from '@angular/core'
import { Comment, NotificationStatus } from '../services/types'
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
    selector: 'app-create-comment',
    templateUrl: './create-comment.component.html',
    styleUrls: ['./create-comment.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
})
export class CreateCommentComponent {
    @Input('noteId') noteId: number = 0

    constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) {}

    isSubmitting = false

    createCommentFormGroup: FormGroup = new FormGroup({
        content: new FormControl('', [Validators.required, Validators.minLength(3)]),
    })

    onSubmit = async () => {
        this.isSubmitting = true

        this.http
            .post(
                `http://localhost:8080/api/notes/${this.noteId}/comments`,
                {
                    content: String(this.createCommentFormGroup.value.content),
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
                    const comment = JSON.parse(response) as unknown as Comment

                    this.isSubmitting = false

                    this.notificationService.show({
                        message: 'Comment added successfuly',
                        type: NotificationStatus.Success,
                    })

                    this.router.navigate(['/notes'])
                },
                error: (error) => {
                    this.isSubmitting = false

                    this.notificationService.show({
                        message: 'Comment add failed',
                        type: NotificationStatus.Error,
                    })
                },
            })
    }
}
