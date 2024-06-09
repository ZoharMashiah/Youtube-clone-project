package com.example.youtube_clone;

import android.net.Uri;

import java.io.Serializable;
import java.util.Date;

public class User implements Serializable {
    private String username;
    private String firstName;
    private String middleName;
    private String lastName;
    private String password;
    private String birthDate;
    private Uri profileImage;

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
