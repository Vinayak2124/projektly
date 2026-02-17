package com.vinayak.project_management_system.repository;

import com.vinayak.project_management_system.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {

    List<Comment> findCommentByIssueId(Long issueId);
}
