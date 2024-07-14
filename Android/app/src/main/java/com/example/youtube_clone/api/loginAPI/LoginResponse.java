package com.example.youtube_clone.api.loginAPI;


import com.example.youtube_clone.UserN;

public class LoginResponse {
    private final UserN user;
    private final String token;


    public LoginResponse(UserN user, String token) {
        this.token = token;
        this.user = user;
    }

    public UserN getUser() {
        return user;
    }

    public String getToken() {
        return token;
    }
}
