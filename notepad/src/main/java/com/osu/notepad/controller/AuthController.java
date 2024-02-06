package com.osu.notepad.controller;

import com.osu.notepad.dto.AuthDto;
import com.osu.notepad.model.User;
import com.osu.notepad.service.AuthService;
import com.osu.notepad.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody AuthDto authDto) {
        try {
            return ResponseEntity.ok(authService.register(authDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthDto authDto) {
        try {
            return ResponseEntity.ok(authService.login(authDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/me")
    public ResponseEntity<User> getProfile(@RequestHeader("Authorization") String token) {
        String username;
        try {
            username = JwtUtil.extractUsername(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(authService.me(username));
    }
}
