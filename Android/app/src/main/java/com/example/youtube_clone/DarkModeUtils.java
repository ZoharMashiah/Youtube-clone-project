package com.example.youtube_clone;

import android.content.Context;
import android.content.SharedPreferences;

import androidx.appcompat.app.AppCompatDelegate;

public class DarkModeUtils {
    private static final String SETTINGS = "settings";
    private static final String IS_DARK_MODE = "isDarkMode";

    public static boolean isDarkMode() {
        SharedPreferences prefs = MyApplication.getAppContext().getSharedPreferences(SETTINGS, Context.MODE_PRIVATE);
        return prefs.getBoolean(IS_DARK_MODE, false); // false is the default value
    }

    public static void toggleDarkMode() {
        boolean currentMode = isDarkMode();
        applyDarkMode(!currentMode);
    }

    public static void applyDarkMode(boolean isDarkMode) {
        if (isDarkMode) {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
        } else {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        }

        SharedPreferences prefs = MyApplication.getAppContext().getSharedPreferences(SETTINGS, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putBoolean(IS_DARK_MODE, isDarkMode);
        editor.apply();
    }
}
