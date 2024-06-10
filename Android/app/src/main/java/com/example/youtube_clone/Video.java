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

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setUser_image(Uri user_image) {
        this.user_image = user_image;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setPublication_date(long publication_date) {
        this.publication_date = publication_date;
    }

    public void setIcon(Uri icon) {
        this.icon = icon;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public void setLike(int like) {
        this.like = like;
    }

    public void setDislike(int dislike) {
        this.dislike = dislike;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public void setVideo(Uri video) {
        this.video = video;
    }
}
