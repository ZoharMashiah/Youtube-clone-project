package com.example.youtube_clone;

import java.util.Date;

public class Comment{
    private int id;
    private String title;
    private String user;
    private Date date;
    private String icon;

    public Date getDate() {
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
}
