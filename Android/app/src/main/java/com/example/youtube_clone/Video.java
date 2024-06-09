package com.example.youtube_clone;

import java.util.Date;
import java.util.List;

public class Video {
    private int id;
    private String title;
    private String description;

    private String user;

    private String user_image;

    private String category;
    private Date publication_date;
    private String icon;
    private int views;
    private int like;

    private int dislike;
    private List<Comment> comments;

    private String video;

    public Video(int id, String title, String description, String user, String user_image, String category, Date publication_date,
                  String icon, int views, int like, int dislike, List<Comment> comments, String video) {
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
