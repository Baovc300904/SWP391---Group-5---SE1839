package com.demobe.demobe.enums;

public enum BloodComponent {
    TOAN_PHAN("Toàn phần", 56),
    HONG_CAU("Hồng cầu", 84),
    HUYET_TUONG("Huyết tương", 28),
    TIEU_CAU("Tiểu cầu", 14);

    private final String displayName;
    private final int recoveryDays;

    BloodComponent(String displayName, int recoveryDays) {
        this.displayName = displayName;
        this.recoveryDays = recoveryDays;
    }

    public String getDisplayName() {
        return displayName;
    }

    public int getRecoveryDays() {
        return recoveryDays;
    }
}
