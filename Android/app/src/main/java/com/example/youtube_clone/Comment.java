package com.example.youtube_clone;

import java.util.Date;

public class Comment{
    private int id;
    private String title;
    private String user;
    private long date;
    private String icon;

    public Comment(int id, String title, String user, long date, String icon) {
        this.id = id;
        this.title = title;
        this.user = user;
        this.date = date;
        this.icon = icon;
    }


    public long getDate() {
        return date;
    }

    public String getIcon() {
        return icon;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getUser() {
        return user;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setDate(long date) {
        this.date = date;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
