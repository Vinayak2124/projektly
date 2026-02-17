package com.vinayak.project_management_system.controller;

import com.vinayak.project_management_system.model.Chat;
import com.vinayak.project_management_system.model.Message;
import com.vinayak.project_management_system.model.User;
import com.vinayak.project_management_system.request.CreateMessage;
import com.vinayak.project_management_system.service.MessageService;
import com.vinayak.project_management_system.service.ProjectService;
import com.vinayak.project_management_system.service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody CreateMessage req,
                                               @RequestHeader("Authorization") String jwt
                                               )throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        if(user == null) throw new Exception("Invalid User");
        Chat chats = projectService.getProjectById(req.getProjectId()).getChat();
        if(chats==null) throw new Exception("Chat not found");

        Message sentMessage =messageService.sendMessage(req.getSenderId(), req.getProjectId(), req.getContent());

        return ResponseEntity.ok(sentMessage);


    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessageByProjectId(@PathVariable Long projectId) throws Exception{
        List<Message> messages=messageService.getMessagesByProjectId(projectId);

        return ResponseEntity.ok(messages);
    }
}
