package com.osu.notepad.service;

import com.osu.notepad.dto.CreateNoteDto;
import com.osu.notepad.dto.UpdateNoteDto;
import com.osu.notepad.model.Comment;
import com.osu.notepad.model.Note;
import com.osu.notepad.repository.CommentRepository;
import com.osu.notepad.repository.NoteRepository;
import com.osu.notepad.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public NoteService(NoteRepository noteRepository, UserRepository userRepository, CommentRepository commentRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    public List<Note> getAllNotes(Long userId) throws Exception {
        return noteRepository.findByUser(userRepository.findById(userId).orElseThrow(() -> new Exception("User not found")));
    }

    public Note createNote(CreateNoteDto noteDto, Long userId) throws Exception {
        Note note = new Note();
        note.setContent(noteDto.getContent());
        note.setUser(userRepository.findById(userId).orElseThrow(() -> new Exception("User not found")));
        return noteRepository.save(note);
    }

    public Note getNoteById(Long id) throws Exception {
        return noteRepository.findById(id).orElseThrow(() -> new Exception("Note not found"));
    }

    public Note updateNote(UpdateNoteDto noteDto, Long userId) throws Exception {
        Note note = new Note();
        note.setId(noteDto.getId());
        note.setContent(noteDto.getContent());
        note.setUser(userRepository.findById(userId).orElseThrow(() -> new Exception("User not found")));
        return noteRepository.save(note);
    }

    public void deleteNote(Long id) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));
        List<Comment> comments = commentRepository.findByNote(note);
        if (comments != null && !comments.isEmpty()) {
            commentRepository.deleteAll(comments);
        }
        noteRepository.deleteById(id);
    }

    public boolean validateUserNote(Long userId, Long noteId) {
        Note note = noteRepository.findById(noteId).orElse(null);
        if (note == null) {
            return false;
        }
        return note.getUser().getId().equals(userId);
    }

}
