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
public class UpdateNoteDto {
    private Long id;

    @NotEmpty
    @Size(min = 3, message = "content should have at least 3 characters")
    private String content;
}
