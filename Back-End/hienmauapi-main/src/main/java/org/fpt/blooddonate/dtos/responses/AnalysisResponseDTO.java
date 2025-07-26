package org.fpt.blooddonate.dtos.responses;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AnalysisResponseDTO {
    private long totalBloodReceiveRequest;

    private long totalBloodDonationRequest;

    private long totalBloodUnitWareHouse;

    private long totalBlood;

    private long totalEmployee;

    private long totalCustomer;

    private long totalBloodDonationActivity;

    private long totalBlog;
}
