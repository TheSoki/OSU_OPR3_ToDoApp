package com.osu.notepad.repository;

import com.osu.notepad.model.Note;
import com.osu.notepad.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUser(User user);
}
