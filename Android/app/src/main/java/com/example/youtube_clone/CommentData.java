package com.example.youtube_clone;

public class CommentData {
    String _id;
    String videoId;
    String[] childrenId;
    SmallUser user;
    String title;
    long date;

    public CommentData(String _id, String videoId, String[] childrenId, SmallUser user, String title, long date) {
        this._id = _id;
        this.videoId = videoId;
        this.childrenId = childrenId;
        this.user = user;
        this.title = title;
        this.date = date;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getVideoId() {
        return videoId;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }

    public String[] getChildrenId() {
        return childrenId;
    }

    public void setChildrenId(String[] childrenId) {
        this.childrenId = childrenId;
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

    public long getDate() {
        return date;
    }

    public void setDate(long date) {
        this.date = date;
    }
}
