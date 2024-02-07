package com.osu.notepad.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserDto {
    private Long id;

    @NotEmpty
    @Size(min = 3, message = "username should have at least 3 characters")
    private String username;

    @NotEmpty
    @Size(min = 3, message = "password should have at least 3 characters")
    private String password;
}
