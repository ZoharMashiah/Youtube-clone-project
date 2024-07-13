package com.example.youtube_clone.db;

import androidx.room.TypeConverter;

import com.example.youtube_clone.UserN;
import com.google.gson.Gson;

public class UserSettingsConverter {
    @TypeConverter
    public static String fromUserSettings(UserN.UserSettings userSettings) {
        if (userSettings == null) {
            return null;
        }
        Gson gson = new Gson();
        return gson.toJson(userSettings);
    }

    @TypeConverter
    public static UserN.UserSettings toUserSettings(String userSettingsString) {
        if (userSettingsString == null) {
            return null;
        }
        Gson gson = new Gson();
        return gson.fromJson(userSettingsString, UserN.UserSettings.class);
    }
}