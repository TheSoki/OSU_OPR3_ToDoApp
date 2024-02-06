package com.osu.notepad.seed;

import com.osu.notepad.model.Note;
import com.osu.notepad.model.User;
import com.osu.notepad.repository.NoteRepository;
import com.osu.notepad.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SeedDataLoader implements CommandLineRunner {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    @Autowired
    public SeedDataLoader(NoteRepository noteRepository, UserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        int totalNotes = noteRepository.findAll().size();
        int totalUsers = userRepository.findAll().size();

        if (totalNotes != 0 || totalUsers != 0) {
            return;
        }

        // Seed Users
        User user = new User();
        user.setUsername("sokol");
        user.setPassword("sokol");
        userRepository.save(user);

        // Seed Notes
        Note note1 = new Note();
        note1.setContent("First Note");
        note1.setUser(user);
        noteRepository.save(note1);

        Note note2 = new Note();
        note2.setContent("Second Note");
        note2.setUser(user);
        noteRepository.save(note2);

        Note note3 = new Note();
        note3.setContent("Third Note");
        note3.setUser(user);
        noteRepository.save(note3);

    }
}
