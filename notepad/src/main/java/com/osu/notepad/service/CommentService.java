package com.osu.notepad.service;

import com.osu.notepad.dto.CreateCommentDto;
import com.osu.notepad.dto.CreateNoteDto;
import com.osu.notepad.dto.NoteDto;
import com.osu.notepad.model.Comment;
import com.osu.notepad.model.Note;
import com.osu.notepad.model.User;
import com.osu.notepad.repository.CommentRepository;
import com.osu.notepad.repository.UserRepository;
import com.osu.notepad.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(NoteRepository noteRepository, UserRepository userRepository, CommentRepository commentRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    public List<Comment> getAllComments(Long noteId) throws Exception {
        return commentRepository.findByNote(noteRepository.findById(noteId).orElseThrow(() -> new Exception("Note not found")));
    }

    public Comment createComment(Long noteId, CreateCommentDto commentDto) throws Exception {
        Comment comment = new Comment();
        commentDto.setContent(commentDto.getContent());
        comment.setNote(noteRepository.findById(noteId).orElseThrow(() -> new Exception("Note not found")));
        return commentRepository.save(comment);
    }

}
