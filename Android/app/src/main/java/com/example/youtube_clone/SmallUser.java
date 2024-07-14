package com.example.youtube_clone;

public class SmallUser {
    String _id;
    String username;
    String photo;

    public SmallUser(String _id, String username, String photo) {
        this._id = _id;
        this.username = username;
        this.photo = photo;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}