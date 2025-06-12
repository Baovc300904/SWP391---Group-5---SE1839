package com.demobe.demobe.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

public class DonationStats {
    private int totalDonations;
    private BigDecimal totalUnits;
    private LocalDate lastDonationDate;

    public DonationStats(int totalDonations, BigDecimal totalUnits, LocalDate lastDonationDate) {
        this.totalDonations = totalDonations;
        this.totalUnits = totalUnits;
        this.lastDonationDate = lastDonationDate;
    }

    // Getters và setters
}
