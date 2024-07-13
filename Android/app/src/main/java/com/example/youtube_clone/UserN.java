package com.example.youtube_clone;

import android.net.Uri;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

import com.google.gson.annotations.SerializedName;

import java.util.List;

@Entity
public class UserN {
    @SerializedName("_id")
    @PrimaryKey
    private String _id;

    @SerializedName("username")
    private String username;

    @SerializedName("firstName")
    private String firstName;

    @SerializedName("middleName")
    private String middleName;

    @SerializedName("lastName")
    private String lastName;

    @SerializedName("birthdate")
    private String birthDate;

    @SerializedName("photo")
    private String profilePicture;

    @SerializedName("videos")
    private List<String> videos;

    @SerializedName("likes")
    private List<String> likedVideos;

    @SerializedName("dislikes")
    private List<String> dislikedVideos;

    @SerializedName("settings")
    private UserSettings settings;

    // Constructor
    public UserN() {
    }

    public String getUsername() {
        return username;
    }

    public Uri getProfileImage() {
        return null;
    }


    public static class UserSettings {
        // Add fields for settings as needed
        // For example:
        @SerializedName("darkMode")
        private boolean darkMode;

    }
}