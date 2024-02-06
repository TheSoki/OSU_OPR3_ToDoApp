package com.osu.notepad.controller;

import com.osu.notepad.dto.CreateNoteDto;
import com.osu.notepad.dto.NoteDto;
import com.osu.notepad.model.Note;
import com.osu.notepad.service.NoteService;
import com.osu.notepad.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes(@RequestHeader("Authorization") String token) {
        Long userId;
        try {
            userId = JwtUtil.extractId(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            return ResponseEntity.ok(noteService.getAllNotes(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        Long userId;
        try {
            userId = JwtUtil.extractId(token);
            if (!noteService.validateUserNote(userId, id)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            return ResponseEntity.ok(noteService.getNoteById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestHeader("Authorization") String token, @RequestBody CreateNoteDto createNoteDto) {
        Long userId;
        try {
            userId = JwtUtil.extractId(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            return ResponseEntity.ok(noteService.createNote(createNoteDto, userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@RequestHeader("Authorization") String token, @PathVariable Long id, @RequestBody NoteDto noteDto) {
        noteDto.setId(id);

        Long userId;
        try {
            userId = JwtUtil.extractId(token);
            if (!noteService.validateUserNote(userId, noteDto.getId())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            return ResponseEntity.ok(noteService.updateNote(noteDto,userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        Long userId;
        try {
            userId = JwtUtil.extractId(token);
            if (!noteService.validateUserNote(userId, id)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            noteService.deleteNote(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
