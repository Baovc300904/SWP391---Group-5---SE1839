package com.demobe.demobe.service;


import java.util.Set;

public interface BloodCompatibilityService {
    Set<String> findCompatibleBloodGroups(String recipientBloodGroup, String component);
}

