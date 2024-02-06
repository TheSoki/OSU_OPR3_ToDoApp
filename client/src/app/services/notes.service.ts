import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, Subscription } from 'rxjs'
import { Note } from './types'

@Injectable({
    providedIn: 'root',
})
export class NotesService {
    private notes: Note[] = []
    private notesSubject = new Subject<Note[]>()
    private subscription = new Subscription()

    readonly notes$: Observable<Note[]> = this.notesSubject.asObservable()

    constructor(private http: HttpClient) {}

    fetchInitialData() {
        this.subscription.add(
            this.http
                .get<Note[]>('http://localhost:8080/api/notes', {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                })
                .subscribe((data) => {
                    this.notes = data
                    this.notesSubject.next(this.notes)
                })
        )
    }

    clearData() {
        this.notes = []
        this.notesSubject.next(this.notes)
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

    getInitialData() {
        return this.notes
    }

    addNote(note: Note) {
        this.notes.push(note)
        this.notesSubject.next(this.notes)
    }
}
