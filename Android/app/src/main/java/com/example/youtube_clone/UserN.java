package com.example.youtube_clone;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import com.google.gson.annotations.SerializedName;

import java.util.List;

@Entity
public class UserN {
    @SerializedName("_id")
    @PrimaryKey
    @NonNull
    private String _id;

    @SerializedName("username")
    private String username;

    @SerializedName("password")
    private String password;

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

    @SerializedName("darkMode")
    private boolean darkMode;

    // Constructor
    public UserN() {
    }


    public UserN(String username, String password, String firstName, String middleName, String lastName, String birthDate, String profilePicture, boolean darkMode) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.profilePicture = profilePicture;
        this.darkMode = darkMode;
    }

    public String getUsername() {
        return username;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public List<String> getVideos() {
        return videos;
    }

    public void setVideos(List<String> videos) {
        this.videos = videos;
    }

    public List<String> getLikedVideos() {
        return likedVideos;
    }

    public void setLikedVideos(List<String> likedVideos) {
        this.likedVideos = likedVideos;
    }

    public List<String> getDislikedVideos() {
        return dislikedVideos;
    }

    public void setDislikedVideos(List<String> dislikedVideos) {
        this.dislikedVideos = dislikedVideos;
    }

    public boolean isDarkMode() {
        return darkMode;
    }

    public void setDarkMode(boolean darkMode) {
        this.darkMode = darkMode;
    }

    public void toggleDarkMode(boolean darkMode) {
        this.darkMode = !this.darkMode;
    }
}