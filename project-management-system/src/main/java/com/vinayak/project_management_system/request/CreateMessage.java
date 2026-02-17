package com.vinayak.project_management_system.request;

import lombok.Data;

@Data
public class CreateMessage {

    private Long senderId;
    private String content;
    private Long projectId;
}
