package com.example.youtube_clone;

import android.net.Uri;

import java.util.Date;
import java.util.List;

public class Video {
    private int id;
    private String title;
    private String description;

    private String user;

    private Uri user_image;

    private String category;
    private long publication_date;
    private Uri icon;
    private int views;
    private int like;

    private int dislike;
    private List<Comment> comments;

    private Uri video;
    public Video(int id, String title, String description, String user, Uri user_image, String category, long publication_date,
                 Uri icon, int views, int like, int dislike, List<Comment> comments, Uri video) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.user = user;
        this.user_image = user_image;
        this.category = category;
        this.publication_date = publication_date;
        this.icon = icon;
        this.views = views;
        this.like = like;
        this.dislike = dislike;
        this.comments = comments;
        this.video = video;

    }
    public String getUser() {
        return user;
    }

    public Uri getUser_image() {
        return user_image;
    }

    public String getCategory() {
        return category;
    }

    public long getPublication_date() {
        return publication_date;
    }

    public Uri getIcon() {
        return icon;
    }

    public int getViews() {
        return views;
    }

    public int getLike() {
        return like;
    }

    public int getDislike() {
        return dislike;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public Uri getVideo() {
        return video;
    }



    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

}
