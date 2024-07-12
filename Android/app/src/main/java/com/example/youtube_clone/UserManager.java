package com.example.youtube_clone;

public class UserManager {
    private volatile static UserManager instance;
    private UserN currentUser;
    private String token;

    private UserManager() {
    }

    public static UserManager getInstance() {
        if (instance == null) {
            synchronized (UserManager.class) {
                if (instance == null) {
                    instance = new UserManager();
                }
            }
        }
        return instance;
    }

    public void login(UserN user, String token) {
        this.currentUser = user;
        this.token = token;
    }

    public void logout() {
        currentUser = null;
        token = null;
    }

    public UserN getCurrentUser() {
        return currentUser;
    }

    public String getAuthToken() {
        return token;
    }

    public boolean isLoggedIn() {
        return currentUser != null && token != null;
    }
}
