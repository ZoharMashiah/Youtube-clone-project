package com.example.youtube_clone;

import android.content.Context;
import android.content.SharedPreferences;
import androidx.appcompat.app.AppCompatDelegate;

public class DarkModeUtils {
    private static final String PREF_NAME = "dark_mode_prefs";
    private static final String KEY_IS_DARK_MODE = "is_dark_mode";

    public static void applyDarkMode(Context context) {
        SharedPreferences preferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        boolean isDarkMode = preferences.getBoolean(KEY_IS_DARK_MODE, false);
        if (isDarkMode) {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
        } else {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        }
    }

    public static void toggleDarkMode(Context context) {
        SharedPreferences preferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        boolean isDarkMode = preferences.getBoolean(KEY_IS_DARK_MODE, false);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putBoolean(KEY_IS_DARK_MODE, !isDarkMode);
        editor.apply();
        applyDarkMode(context);
    }
}
