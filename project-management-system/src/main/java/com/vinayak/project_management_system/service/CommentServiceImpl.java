package com.vinayak.project_management_system.service;

import com.vinayak.project_management_system.model.Comment;
import com.vinayak.project_management_system.model.Issue;
import com.vinayak.project_management_system.model.User;
import com.vinayak.project_management_system.repository.CommentRepository;
import com.vinayak.project_management_system.repository.IssueRepository;
import com.vinayak.project_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IssueRepository issueRepository;

    @Override
    public Comment createComment(Long issueId, Long userId, String content) throws Exception {
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        Optional<User> optionalUser = userRepository.findById(userId);

        if(optionalIssue.isEmpty()){
            throw new Exception("Issue not found with this id");
        }
        if(optionalUser.isEmpty()){
            throw new Exception("User not found with this id");
        }

        Issue issue = optionalIssue.get();
        User user = optionalUser.get();

        Comment comment = new Comment();
        comment.setUser(user);
        comment.setIssue(issue);
        comment.setContent(content);
        Comment savedComment = commentRepository.save(comment);

        issue.getComments().add(savedComment);

        return savedComment;
    }

    @Override
    public void deleteComment(Long commentId, Long userId) throws Exception {
    Optional<Comment> optionalComment =commentRepository.findById(commentId);
    Optional<User> optionalUser = userRepository.findById(userId);

    if(optionalComment.isEmpty()){
        throw new Exception("Comment not found with this Id");
    }
    if(optionalUser.isEmpty()){
        throw new Exception("User not found with this Id");


    }

    Comment comment = optionalComment.get();
    User user = optionalUser.get();

    if(comment.getUser().equals(user)){
        commentRepository.delete(comment);
    }else{
        throw new Exception("User does not have the permission to delete this comment!");
    }
    }

    @Override
    public List<Comment> findCommentByIssueId(Long issueId) {

        return commentRepository.findCommentByIssueId(issueId);
    }
}
