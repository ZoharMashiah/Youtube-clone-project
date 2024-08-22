package com.example.youtube_clone.api.loginAPI;


import com.example.youtube_clone.User;

public class TokenResponse {
    private final User user;
    private final String token;


    public TokenResponse(User user, String token) {
        this.user = user;
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public String getToken() {
        return token;
    }
}
