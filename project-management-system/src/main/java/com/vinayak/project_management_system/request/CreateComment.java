package com.vinayak.project_management_system.request;

import lombok.Data;

@Data
public class CreateComment {

    private Long issueId;
    private String content;
}
