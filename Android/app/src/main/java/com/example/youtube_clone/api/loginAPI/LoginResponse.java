package com.example.youtube_clone.api.loginAPI;


import com.example.youtube_clone.User;

public class LoginResponse {
    private final User user;
    private final String token;


    public LoginResponse(User user, String token) {
        this.token = token;
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public String getToken() {
        return token;
    }
}
