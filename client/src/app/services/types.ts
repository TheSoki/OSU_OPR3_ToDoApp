export type Note = {
    id: number
    content: string
}

export type Comment = {
    id: number
    content: string
    noteId: number
}

export enum NotificationStatus {
    Success = 'Success',
    Error = 'Error',
    Info = 'Info',
}

export type Notification = {
    message: string
    type: NotificationStatus
    createdAt: Date
}

export type NotificationInput = { message: string; type: NotificationStatus }
