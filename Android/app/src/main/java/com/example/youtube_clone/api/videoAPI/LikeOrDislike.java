package com.example.youtube_clone.api.videoAPI;

public class LikeOrDislike {
    String userId;
    String action;

    public LikeOrDislike(String userId, String action) {
        this.userId = userId;
        this.action = action;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
