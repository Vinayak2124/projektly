package com.vinayak.project_management_system.controller;

import com.vinayak.project_management_system.dto.IssueDTO;
import com.vinayak.project_management_system.model.Issue;
import com.vinayak.project_management_system.model.User;
import com.vinayak.project_management_system.request.IssueRequest;
import com.vinayak.project_management_system.response.AuthResponse;
import com.vinayak.project_management_system.response.MessageResponse;
import com.vinayak.project_management_system.service.IssueService;
import com.vinayak.project_management_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @Autowired
    private UserService userService;

    @GetMapping("/{issueId}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long issueId) throws Exception{
        return ResponseEntity.ok(issueService.getIssueById(issueId));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Issue>> getIssueByProjectId(@PathVariable Long projectId)throws Exception{
        return ResponseEntity.ok(issueService.getIssueByProjectId(projectId));
    }

    @PostMapping
    public ResponseEntity<IssueDTO> createIssue(@RequestBody IssueRequest issue, @RequestHeader("Authorization") String token)

    throws Exception{
        User userToken = userService.findUserProfileByJwt(token);
        User user = userService.findUserById(userToken.getId());

        Issue createdIssue = issueService.createIssue(issue,user);
        IssueDTO issueDTO = new IssueDTO();
        issueDTO.setId(createdIssue.getId());
        issueDTO.setDescription(createdIssue.getDescription());
issueDTO.setAssignee(createdIssue.getAssignee());
issueDTO.setProject(createdIssue.getProject());
issueDTO.setProjectid(createdIssue.getProjectID());
issueDTO.setPriority(createdIssue.getPriority());
issueDTO.setTitle(createdIssue.getTitle());
issueDTO.setStatus(createdIssue.getStatus());
issueDTO.setTags(createdIssue.getTags());
issueDTO.setDueDate(createdIssue.getDueDate());

return ResponseEntity.ok(issueDTO);

    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<MessageResponse> deleteIssue(@PathVariable Long issueId,
                                                                @RequestHeader("Authorization") String token
                                                    )throws Exception{

        User user = userService.findUserProfileByJwt(token);
        issueService.deleteIssue(issueId, user.getId());
        MessageResponse res = new MessageResponse();
        res.setMessage("Issue Deleted");
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{issueId}/assignee/{userId}")
    public ResponseEntity<Issue> addUserToIssue(@PathVariable Long issueId,
                                                @PathVariable Long userId)throws Exception{
        Issue issue = issueService.addUserToIssue(issueId,userId);

        return ResponseEntity.ok(issue);
    }

  @PutMapping("/{issueId}/status/{status}")
    public ResponseEntity<Issue> updateIssueStatus(@PathVariable String status,
                                                   @PathVariable Long issueId) throws Exception{
        Issue issue = issueService.updateStatus(issueId,status);
        return ResponseEntity.ok(issue);
  }


}
