package com.example.youtube_clone;

import android.net.Uri;

import java.io.Serializable;
import java.util.ArrayList;

public class Video implements Serializable {
    private int id;
    private String title;
    private String description;

    private String user;

    private Uri user_image;

    private String category;
    private long publication_date;
    private Uri icon;
    private int views;
    private ArrayList<String> like;

    private ArrayList<String> dislike;
    private ArrayList<Comment> comments;

    private Uri video;

    public Video(int id, String title, String description, String user, Uri user_image, String category, long publication_date,
                 Uri icon, int views, ArrayList<String> like, ArrayList<String> dislike, ArrayList<Comment> comments, Uri video) {
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

    public ArrayList<String> getLike() {
        return like;
    }

    public ArrayList<String> getDislike() {
        return dislike;
    }

    public ArrayList<Comment> getComments() {
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

    public void setLike(ArrayList<String> like) {
        this.like = like;
    }

    public void setDislike(ArrayList<String> dislike) {
        this.dislike = dislike;
    }

    public void setComments(ArrayList<Comment> comments) {
        this.comments = comments;
    }

    public void setVideo(Uri video) {
        this.video = video;
    }

    public int getNextId() {
        int id = 0;
        for (Comment c : this.comments) {
            if (id < c.getId()) {
                id = c.getId();
            }
        }
        return id + 1;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }

    public void addLike(String username) {
        if (!like.contains(username)) {
            if (!dislike.contains(username)) {
                like.add(username);
            } else {
                dislike.remove(username);
                like.add(username);
            }
        }
    }

    public void addDislike(String username) {
        if (!dislike.contains(username)) {
            if (!like.contains(username)) {
                dislike.add(username);
            } else {
                like.remove(username);
                dislike.add(username);
            }
        }
    }

}
