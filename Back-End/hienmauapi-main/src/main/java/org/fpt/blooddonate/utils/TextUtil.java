package org.fpt.blooddonate.utils;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class TextUtil {
    public static String removeVietNamese(String text) {
        if (text == null) return null;

        String normalized = Normalizer.normalize(text, Normalizer.Form.NFD);

        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String noAccent = pattern.matcher(normalized).replaceAll("");

        noAccent = noAccent.replaceAll("đ", "d").replaceAll("Đ", "D");

        return noAccent;
    }
}
