package com.osu.notepad.service;

import com.osu.notepad.dto.CreateCommentDto;
import com.osu.notepad.model.Comment;
import com.osu.notepad.repository.CommentRepository;
import com.osu.notepad.repository.NoteRepository;
import com.osu.notepad.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final NoteRepository noteRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(NoteRepository noteRepository, UserRepository userRepository, CommentRepository commentRepository) {
        this.noteRepository = noteRepository;
        this.commentRepository = commentRepository;
    }

    public List<Comment> getAllComments(Long noteId) throws Exception {
        return commentRepository.findByNote(noteRepository.findById(noteId).orElseThrow(() -> new Exception("Note not found")));
    }

    public Comment createComment(Long noteId, CreateCommentDto commentDto) throws Exception {
        Comment comment = new Comment();
        comment.setContent(commentDto.getContent());
        comment.setNote(noteRepository.findById(noteId).orElseThrow(() -> new Exception("Note not found")));
        return commentRepository.save(comment);
    }

}
