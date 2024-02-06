package com.osu.notepad.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;


import java.security.Key;
import java.util.Date;

public class JwtUtil {
    private static final Key SECRET = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    private static final int EXPIRATION_TIME = 86_400_000; // a day

    public static String generateToken(Long id, String username) {
        try {
            String token = Jwts.builder()
                    .setSubject(username)
                    .setId(String.valueOf(id))
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .signWith(SignatureAlgorithm.HS512, SECRET)
                    .compact();
            return token;
        } catch (Exception e) {
            return null;
        }
    }

    public static String extractUsername(String token) throws Exception {
        try {
            String username = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
            return username;
        } catch (Exception e) {
            throw new Exception("Invalid token");
        }
    }

    public static Long extractId(String token) throws Exception {
        try {
            String id = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token)
                    .getBody()
                    .getId();

            return Long.parseLong(id);
        } catch (Exception e) {
            throw new Exception("Invalid token");
        }
    }
}