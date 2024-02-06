package com.osu.notepad.repository;

import com.osu.notepad.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long>  {
    @Query("SELECT u FROM User u WHERE u.username = ?1")
    User findUserByUsername(String username);
}
