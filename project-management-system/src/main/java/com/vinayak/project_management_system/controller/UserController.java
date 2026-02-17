package com.vinayak.project_management_system.controller;

import com.vinayak.project_management_system.model.User;
import com.vinayak.project_management_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt)throws Exception{

        User user = userService.findUserProfileByJwt(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/id/{userId}")
    public ResponseEntity<User> getUserById(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long userId
    )throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        User requestedUser = userService.findUserById(userId);

       return new ResponseEntity<>(requestedUser,HttpStatus.OK);

    }
}
