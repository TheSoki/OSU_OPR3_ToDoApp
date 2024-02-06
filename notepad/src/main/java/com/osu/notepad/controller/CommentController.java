package com.osu.notepad.controller;

import com.osu.notepad.dto.CreateCommentDto;
import com.osu.notepad.model.Comment;
import com.osu.notepad.service.CommentService;
import com.osu.notepad.service.NoteService;
import com.osu.notepad.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes/{noteId}/comments")
public class CommentController {

    private final CommentService commentService;
    private final NoteService noteService;

    public CommentController(CommentService commentService, NoteService noteService) {
        this.commentService = commentService;
        this.noteService = noteService;
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments(@RequestHeader("Authorization") String token, @PathVariable Long noteId) {
        Long userId;
        try {
            userId = JwtUtil.extractId(token);
            if (!noteService.validateUserNote(userId, noteId)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            return ResponseEntity.ok(commentService.getAllComments(noteId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestHeader("Authorization") String token, @RequestBody CreateCommentDto createCommentDto, @PathVariable Long noteId) {
        Long userId;
        try {
            userId = JwtUtil.extractId(token);
            if (!noteService.validateUserNote(userId, noteId)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            return ResponseEntity.ok(commentService.createComment(noteId, createCommentDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
