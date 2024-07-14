package com.example.youtube_clone;

import android.net.Uri;

import java.io.Serializable;

public class User implements Serializable {
    private String username;
    private String password;
    private String firstName;
    private String middleName;
    private String lastName;
    private String birthDate;
    private Uri profileImage;   // to remove
    private String profilePicture;

    private boolean darkMode;


    public User(String username, String firstName, String middleName, String lastName,
                String password, String birthDate, Uri profileImage) {
        this.username = username;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.password = password;
        this.birthDate = birthDate;
        this.profileImage = profileImage;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPassword() {
        return password;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public Uri getProfileImage() {
        return profileImage;
    }

    public boolean checkPassword(String password) {
        return this.password.equals(password);
    }
}
