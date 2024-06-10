package com.example.youtube_clone;

import java.util.ArrayList;
import java.util.List;

public class Videos {
    private static Videos single_instance = null;
    public List<Video> videos;
    public Video currentVideo;

    private Videos() {
        this.videos = new ArrayList<>();
        this.currentVideo = null;
    }

    public static Videos getInstance() {
        if(single_instance == null) {
            single_instance = new Videos();
        }
        return single_instance;
    }

    public Video getVideo(int id) {
        Video video = null;
        for (Video v: this.videos) {
            if (id == v.getId()){
                video = v;
                break;
            }
        }
        return video;
    }
}
