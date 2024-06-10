package com.example.youtube_clone;

import android.content.Context;
import android.util.Log;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class Utils {
    private static final String TAG = "Utils";

    public static String readRawResource(Context context, int resourceId) {
        InputStream inputStream = context.getResources().openRawResource(resourceId);
        try {
            byte[] buffer = new byte[inputStream.available()];
            inputStream.read(buffer);
            return new String(buffer, StandardCharsets.UTF_8);
        } catch (Exception e) {
            Log.e(TAG, "Error reading raw resource", e);
            return null;
        } finally {
            try {
                inputStream.close();
            } catch (Exception e) {
                Log.e(TAG, "Error closing input stream", e);
            }
        }
    }
}
