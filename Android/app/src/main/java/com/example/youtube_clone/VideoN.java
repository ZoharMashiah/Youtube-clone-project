package com.example.youtube_clone;

import java.util.Date;
import java.util.List;

public class VideoN {
    String _id;

    SmallUser user;
    String title;
    String description;
    String category;
    Date publication_date;
    int views;
    int like;
    int dislike;
    List<String> comments;
    String icon;
    String video;

    public VideoN(String _id, SmallUser user, String title, String description, String category, Date publication_date, int views, int like, int dislike, List<String> comments, String icon, String video) {
        this._id = _id;
        this.user = user;
        this.title = title;
        this.description = description;
        this.category = category;
        this.publication_date = publication_date;
        this.views = views;
        this.like = like;
        this.dislike = dislike;
        this.comments = comments;
        this.icon = icon;
        this.video = video;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public SmallUser getUser() {
        return user;
    }

    public void setUser(SmallUser user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Date getPublication_date() {
        return publication_date;
    }

    public void setPublication_date(Date publication_date) {
        this.publication_date = publication_date;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public int getLike() {
        return like;
    }

    public void setLike(int like) {
        this.like = like;
    }

    public int getDislike() {
        return dislike;
    }

    public void setDislike(int dislike) {
        this.dislike = dislike;
    }

    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }
}
