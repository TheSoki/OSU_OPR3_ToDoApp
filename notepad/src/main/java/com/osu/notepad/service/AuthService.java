package com.osu.notepad.service;

import com.osu.notepad.dto.AuthDto;
import com.osu.notepad.model.User;
import com.osu.notepad.repository.UserRepository;
import com.osu.notepad.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.osu.notepad.util.JwtUtil.generateToken;

@Service
public class AuthService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    @Autowired
    public AuthService(NoteRepository noteRepository, UserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    public User register(AuthDto userDto) throws Exception {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());

        User existingUser = userRepository.findUserByUsername(userDto.getUsername());

        if (existingUser != null) {
            throw new Exception("User already exists");
        }

        return userRepository.save(user);
    }

    public String login(AuthDto userDto) throws Exception {
        User user = userRepository.findUserByUsername(userDto.getUsername());

        if (user == null) {
            throw new Exception("User not found");
        }

        if (!user.getPassword().equals(userDto.getPassword())) {
            throw new Exception("Invalid password");
        }

        return generateToken(user.getId(), user.getUsername());
    }

    public User me(String username) {
        return userRepository.findUserByUsername(username);
    }

}
