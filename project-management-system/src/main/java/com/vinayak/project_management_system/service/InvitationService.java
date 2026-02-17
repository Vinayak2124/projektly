package com.vinayak.project_management_system.service;

import com.vinayak.project_management_system.model.Invitation;

public interface InvitationService {

    public void sendInvitation(String email,Long projectId)throws Exception;

    public Invitation acceptInvitation(String token, Long userId)throws Exception;

    public String getTokenByUserMail(String userEmail);

    void deleteToken(String token);
}
