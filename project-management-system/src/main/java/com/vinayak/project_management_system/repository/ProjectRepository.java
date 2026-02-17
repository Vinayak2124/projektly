package com.vinayak.project_management_system.repository;

import com.vinayak.project_management_system.model.Project;
import com.vinayak.project_management_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project,Long> {

List<Project> findByOwner(User owner);

 List<Project>   findByOwnerId(Long id);

    List<Project> findProjectsContainingByNameAndOwner(String name,User owner);

    List<Project> findByTeamContainingOrOwner(User user,User owner);

}
