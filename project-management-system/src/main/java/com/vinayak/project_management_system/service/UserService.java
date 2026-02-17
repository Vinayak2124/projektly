package com.vinayak.project_management_system.service;

import com.vinayak.project_management_system.model.User;

public interface UserService {


    User findUserProfileByJwt(String jwt) throws Exception;

    User findUserByEmail(String email) throws Exception;

    User findUserById(Long userId) throws Exception;

    User updateUserProjectSize(User user,int number);

}
