import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: 'create',
        loadComponent: () => import('./create-note/create-note.component').then((m) => m.CreateNoteComponent),
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then((m) => m.RegisterComponent),
    },
    {
        path: 'note/:id',
        loadComponent: () => import('./note/note.component').then((m) => m.NoteComponent),
    },
    {
        path: 'note/:id/update',
        loadComponent: () => import('./update-note/update-note.component').then((m) => m.UpdateNoteComponent),
    },
    {
        path: '**',
        loadComponent: () => import('./note-table/note-table.component').then((m) => m.NoteTableComponent),
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
