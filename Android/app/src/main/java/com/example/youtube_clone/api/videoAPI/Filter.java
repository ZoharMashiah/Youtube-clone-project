package com.example.youtube_clone.api.videoAPI;

public class Filter {
    Boolean search;
    String text;

    public Filter(Boolean search, String text) {
        this.search = search;
        this.text = text;
    }

    public Boolean getSearch() {
        return search;
    }

    public void setSearch(Boolean search) {
        this.search = search;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
