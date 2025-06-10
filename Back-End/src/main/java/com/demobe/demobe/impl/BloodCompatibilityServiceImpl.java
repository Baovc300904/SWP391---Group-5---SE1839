package com.demobe.demobe.impl;



import com.demobe.demobe.service.BloodCompatibilityService;
import com.demobe.demobe.util.BloodCompatibilityUtil;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class BloodCompatibilityServiceImpl implements BloodCompatibilityService {

    @Override
    public Set<String> findCompatibleBloodGroups(String recipientBloodGroup, String component) {
        return BloodCompatibilityUtil.getCompatibleDonors(recipientBloodGroup, component);
    }
}

