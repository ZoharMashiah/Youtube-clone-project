package com.example.youtube_clone;

import android.net.Uri;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class LocalVideo {

    private int id;
    private String title;
    private String description;
    private String user;
    private String user_image;
    private String category;
    private long publication_date;
    private String icon;
    private String video;
    private int views;
    private ArrayList<String> like;
    private ArrayList<String> dislike;
    private ArrayList<LocalComment> comments;
    public LocalVideo(int id, String title, String description, String user, String user_image, String category, long publication_date,
                 String icon, int views, ArrayList<String> like, ArrayList<String> dislike, ArrayList<LocalComment> comments, String video) {
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

    public String getUser_image() {
        return user_image;
    }

    public String getCategory() {
        return category;
    }

    public long getPublication_date() {
        return publication_date;
    }

    public String getIcon() {
        return icon;
    }

    public int getViews() {
        return views;
    }

    public ArrayList<String> getLike() {
        return like;
    }

    public ArrayList<String> getDislike() {
        return dislike;
    }

    public ArrayList<LocalComment> getComments() {
        return comments;
    }

    public String getVideo() {
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

    public void setUser_image(String user_image) {
        this.user_image = user_image;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setPublication_date(long publication_date) {
        this.publication_date = publication_date;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public void setLike(ArrayList<String> like) {
        this.like = like;
    }

    public void setDislike(ArrayList<String> dislike) {
        this.dislike = dislike;
    }

    public void setComments(ArrayList<LocalComment> comments) {
        this.comments = comments;
    }
}
