package com.vinayak.project_management_system.service;

import com.vinayak.project_management_system.model.PlanType;
import com.vinayak.project_management_system.model.Subscription;
import com.vinayak.project_management_system.model.User;

public interface SubscriptionService {

    Subscription createSubscription(User user);

    Subscription getUsersSubscription(Long userId) throws Exception;

    Subscription upgradeSubscription(Long userId, PlanType planType);

    boolean isValid(Subscription subscription);
}
