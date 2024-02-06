package com.osu.notepad.seed;

import com.osu.notepad.model.User;
import com.osu.notepad.model.Note;
import com.osu.notepad.repository.UserRepository;
import com.osu.notepad.repository.NoteRepository;
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
        User user1 = new User();
        user1.setUsername("john");
        user1.setPassword("123");
        userRepository.save(user1);

        User user2 = new User();
        user2.setUsername("jane");
        user2.setPassword("123");
        userRepository.save(user2);

        // Seed Notes
        Note note1 = new Note();
        note1.setContent("Hello World!");
        note1.setUser(user1);
        noteRepository.save(note1);

        Note note2 = new Note();
        note2.setContent("Hello World!");
        note2.setUser(user1);
        noteRepository.save(note2);

        Note note3 = new Note();
        note3.setContent("Hello World!");
        note3.setUser(user2);
        noteRepository.save(note3);

    }
}
