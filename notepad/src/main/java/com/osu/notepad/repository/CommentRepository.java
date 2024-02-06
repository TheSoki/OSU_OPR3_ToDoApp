package com.osu.notepad.repository;

import com.osu.notepad.model.Comment;
import com.osu.notepad.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByNote(Note note);
}
