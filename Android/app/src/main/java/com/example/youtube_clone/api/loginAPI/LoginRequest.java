package com.example.youtube_clone.api.loginAPI;


public class LoginRequest {
    private String username;
    private String password;

    LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
