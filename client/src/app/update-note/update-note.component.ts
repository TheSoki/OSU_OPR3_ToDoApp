import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Comment, Note, NotificationStatus } from '../services/types'
import { NgFor, NgIf } from '@angular/common'
import { NotificationService } from '../services/notification.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-update-note',
    templateUrl: './update-note.component.html',
    styleUrls: ['./update-note.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, NgIf, NgFor],
})
export class UpdateNoteComponent {
    note: Note | null = null
    comments: Comment[] = []
    private subscription = new Subscription()

    constructor(
        route: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private notificationService: NotificationService
    ) {
        route.params.subscribe((params) => {
            this.fetchInitialData(params['id'])
        })
    }

    fetchInitialData(noteId: string) {
        this.subscription.add(
            this.http
                .get<Note>(`http://localhost:8080/api/notes/${noteId}`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                })
                .subscribe((data) => {
                    this.note = data
                    this.updateNoteFormGroup.setValue({ content: data.content })
                })
        )

        this.subscription.add(
            this.http
                .get<Comment[]>(`http://localhost:8080/api/notes/${noteId}/comments`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                })
                .subscribe((data) => {
                    this.comments = data
                })
        )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

    isSubmitting = false

    updateNoteFormGroup: FormGroup = new FormGroup({
        content: new FormControl('', [Validators.required, Validators.minLength(3)]),
    })

    onSubmit = async () => {
        this.isSubmitting = true

        this.http
            .put(
                `http://localhost:8080/api/notes/${this.note?.id}`,
                {
                    content: String(this.updateNoteFormGroup.value.content),
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
                        message: 'Note updated successfuly',
                        type: NotificationStatus.Success,
                    })

                    this.router.navigate(['/'])
                },
                error: (error) => {
                    this.isSubmitting = false

                    this.notificationService.show({
                        message: 'Note update failed',
                        type: NotificationStatus.Error,
                    })
                },
            })
    }
}
