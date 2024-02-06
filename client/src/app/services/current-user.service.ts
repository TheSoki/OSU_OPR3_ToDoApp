import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, Subject } from 'rxjs'
import { NotesService } from './notes.service'

@Injectable({
    providedIn: 'root',
})
export class CurrentUserService {
    private isLogged
    private isLoggedSubject = new Subject<boolean>()

    readonly isLogged$: Observable<boolean> = this.isLoggedSubject.asObservable()

    constructor(private router: Router, private notesService: NotesService) {
        const token = localStorage.getItem('token')
        const anonymousPaths = ['/login', '/register']

        if (token) {
            this.isLogged = true
            this.isLoggedSubject.next(true)
            this.notesService.fetchInitialData()
        } else {
            this.isLogged = false
            this.isLoggedSubject.next(false)
            if (!anonymousPaths.includes(document.location.pathname)) {
                this.router.navigate(['/login'])
            }
        }
    }

    login(token: string) {
        localStorage.setItem('token', token)
        this.isLogged = true
        this.isLoggedSubject.next(true)
        this.notesService.fetchInitialData()
    }

    logout() {
        localStorage.removeItem('token')
        this.isLogged = false
        this.isLoggedSubject.next(false)
        this.notesService.clearData()
    }

    getInitialLoggedStatus() {
        return this.isLogged
    }
}
