package com.example.youtube_clone.utils;

import android.util.Base64;

public class Base64Utils {
    public static byte[] decodeBase64(String base64String) {
        if (base64String == null || base64String.isEmpty()) {
            throw new IllegalArgumentException("Base64 string is null or empty");
        }

        // Remove the prefix if it exists (e.g., "data:video/mp4;base64,")
        int commaIndex = base64String.indexOf(",");
        if (commaIndex != -1) {
            base64String = base64String.substring(commaIndex + 1);
        }

        return Base64.decode(base64String, Base64.DEFAULT);
    }
}
