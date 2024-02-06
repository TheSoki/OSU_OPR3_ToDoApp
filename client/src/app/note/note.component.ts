import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Comment, Note, NotificationStatus } from '../services/types'
import { NgFor, NgIf } from '@angular/common'
import { CreateCommentComponent } from '../create-comment/create-comment.component'
import { NotificationService } from '../services/notification.service'
import { MatButtonModule } from '@angular/material/button'

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, CreateCommentComponent, MatButtonModule],
})
export class NoteComponent {
    note: Note | null = null
    comments: Comment[] = []
    private subscription = new Subscription()

    constructor(
        private http: HttpClient,
        route: ActivatedRoute,
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

    updateNote = () => {
        this.router.navigate([`/note/${this.note?.id}/update`])
    }

    deleteNote = () => {
        this.http
            .delete(`http://localhost:8080/api/notes/${this.note?.id}`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            })
            .subscribe({
                next: (response) => {
                    this.notificationService.show({
                        message: 'Note updated successfuly',
                        type: NotificationStatus.Success,
                    })

                    this.router.navigate(['/'])
                },
                error: (error) => {
                    this.notificationService.show({
                        message: 'Note update failed',
                        type: NotificationStatus.Error,
                    })
                },
            })
    }
}
