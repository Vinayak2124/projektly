package com.vinayak.project_management_system.repository;

import com.vinayak.project_management_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {


    public User findByEmail(String email);
}
