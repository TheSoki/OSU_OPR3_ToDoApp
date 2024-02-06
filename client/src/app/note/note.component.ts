import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { Comment, Note } from '../services/types'
import { NgFor, NgIf } from '@angular/common'
import { CreateCommentComponent } from '../create-comment/create-comment.component'

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, CreateCommentComponent],
})
export class NoteComponent {
    note: Note | null = null
    comments: Comment[] = []
    private subscription = new Subscription()

    constructor(private http: HttpClient, route: ActivatedRoute) {
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
}
