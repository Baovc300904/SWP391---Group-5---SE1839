package com.demobe.demobe.util;

import java.util.*;

public class BloodCompatibilityUtil {

    private static final Map<String, Set<String>> WHOLE_BLOOD_COMPATIBILITY = Map.of(
            "O-", Set.of("O-"),
            "O+", Set.of("O-", "O+"),
            "A-", Set.of("O-", "A-"),
            "A+", Set.of("O-", "O+", "A-", "A+"),
            "B-", Set.of("O-", "B-"),
            "B+", Set.of("O-", "O+", "B-", "B+"),
            "AB-", Set.of("O-", "A-", "B-", "AB-"),
            "AB+", Set.of("O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+")
    );

    private static final Map<String, Set<String>> RED_CELL_COMPATIBILITY = Map.of(
            "O-", Set.of("O-"),
            "O+", Set.of("O-", "O+"),
            "A-", Set.of("O-", "A-"),
            "A+", Set.of("O-", "O+", "A-", "A+"),
            "B-", Set.of("O-", "B-"),
            "B+", Set.of("O-", "O+", "B-", "B+"),
            "AB-", Set.of("O-", "A-", "B-", "AB-"),
            "AB+", Set.of("O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+")
    );

    private static final Map<String, Set<String>> PLASMA_COMPATIBILITY = Map.of(
            "O-", Set.of("O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"),
            "O+", Set.of("O+", "A+", "B+", "AB+"),
            "A-", Set.of("A-", "A+", "AB-", "AB+"),
            "A+", Set.of("A+", "AB+"),
            "B-", Set.of("B-", "B+", "AB-", "AB+"),
            "B+", Set.of("B+", "AB+"),
            "AB-", Set.of("AB-", "AB+"),
            "AB+", Set.of("AB+")
    );

    private static final Map<String, Set<String>> PLATELET_COMPATIBILITY = RED_CELL_COMPATIBILITY;

    public static Set<String> getCompatibleDonors(String recipientBloodGroup, String component) {
        return switch (component.toLowerCase()) {
            case "toanphan", "whole" -> WHOLE_BLOOD_COMPATIBILITY.getOrDefault(recipientBloodGroup, Set.of());
            case "hongcau", "redcell" -> RED_CELL_COMPATIBILITY.getOrDefault(recipientBloodGroup, Set.of());
            case "huyettuong", "plasma" -> PLASMA_COMPATIBILITY.getOrDefault(recipientBloodGroup, Set.of());
            case "tieubau", "platelet" -> PLATELET_COMPATIBILITY.getOrDefault(recipientBloodGroup, Set.of());
            default -> Set.of();
        };
    }
}

