import { Component } from '@angular/core'
import { Note } from '../services/types'
import { MatTableModule } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Component({
    selector: 'app-note-table',
    templateUrl: './note-table.component.html',
    styleUrls: ['./note-table.component.css'],
    standalone: true,
    imports: [MatTableModule],
})
export class NoteTableComponent {
    items: Note[] = []
    private subscription = new Subscription()

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
                    this.items = data
                })
        )
    }

    ngOnInit() {
        this.fetchInitialData()
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

    displayedColumns: string[] = ['id', 'content']
}
