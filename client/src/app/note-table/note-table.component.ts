import { Component } from '@angular/core'
import { Note } from '../services/types'
import { NotesService } from '../services/notes.service'
import { MatTableModule } from '@angular/material/table'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-note-table',
    templateUrl: './note-table.component.html',
    styleUrls: ['./note-table.component.css'],
    standalone: true,
    imports: [MatTableModule],
})
export class NoteTableComponent {
    items: Note[] = this.notesService.getInitialData()
    private subscription = new Subscription()

    constructor(private notesService: NotesService) {}

    ngOnInit() {
        this.subscription.add(
            this.notesService.notes$.subscribe((data) => {
                this.items = data
            })
        )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

    displayedColumns: string[] = ['id', 'content']
}
