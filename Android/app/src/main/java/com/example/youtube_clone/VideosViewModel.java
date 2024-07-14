package com.example.youtube_clone;

import androidx.lifecycle.LiveData;

import com.example.youtube_clone.reposetories.VideoRepository;

import java.net.HttpCookie;
import java.util.List;

public class VideosViewModel extends ViewModel {
    private VideoRepository repository;
    private LiveData<List<VideoN>> videos;

    public VideosViewModel() {
        repository = new VideoRepository();
        repository.reload();
        videos = repository.getFeed();
    }


    public LiveData<List<VideoN>> getFeed() {
        return videos;
    }

    public void add(String uid, VideoN videoN) {
        repository.add(uid, videoN);
    }

    public void delete(VideoN videoN) {
        repository.delete(videoN);
    }

    public void reload() {
        repository.reload();
    }

    public LiveData<VideoN> getVideo(String uid, String vid) {
        return repository.getVideo(uid, vid);
    }

    public LiveData<List<VideoN>> getVideos() {
        return videos;
    }
}
