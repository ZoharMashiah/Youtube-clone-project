package com.example.youtube_clone.api.videoAPI;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.youtube_clone.VideoN;

import java.util.List;

public class VideoWithSuggested {
    VideoN video;

    List<VideoN> suggestedVideos;

    public VideoWithSuggested(VideoN video, List<VideoN> suggestedVideos) {
        this.video = video;
        this.suggestedVideos = suggestedVideos;
    }

    // Getters and setters

    public VideoN getVideo() {
        return video;
    }

    public List<VideoN> getSuggestedVideos() {
        return suggestedVideos;
    }

    public void setSuggestedVideos(List<VideoN> suggestedVideos) {
        this.suggestedVideos = suggestedVideos;
    }
}
