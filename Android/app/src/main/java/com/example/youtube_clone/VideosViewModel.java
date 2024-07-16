package com.example.youtube_clone;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.youtube_clone.reposetories.VideoRepository;

import java.util.List;

public class VideosViewModel extends ViewModel {
    private VideoRepository repository;
    private LiveData<List<VideoN>> videos;
    private LiveData<List<VideoN>> videosFiltered;
    private MutableLiveData<Boolean> isFiltered;
    private MutableLiveData<VideoN> currentVideo;

    public VideosViewModel() {
        repository = new VideoRepository();
        repository.reload();
        videos = repository.getFeed();
        videosFiltered = repository.getVideoListFilteredData();
        isFiltered = new MutableLiveData<>(false);
        currentVideo = new MutableLiveData<>(null);
    }


    public LiveData<List<VideoN>> getFeed() {
        if (Boolean.TRUE.equals(isFiltered.getValue()))
            return videosFiltered;
        return videos;
    }

    public void add(String uid, VideoN videoN) {
        repository.add(uid, videoN);
    }

    public void delete(String uid, String vid) {
        repository.deleteVideo(uid, vid);
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

    public LiveData<List<VideoN>> filterVideos(Boolean search, String text) {
        videosFiltered = repository.filterVideos(search, text);
        if (!search && "All".equals(text))
            isFiltered.setValue(false);
        else
            isFiltered.setValue(true);
        return videosFiltered;
    }

    public LiveData<Boolean> getIsFiltered() {
        return isFiltered;
    }

    public LiveData<List<VideoN>> getVideosFiltered() {
        return videosFiltered;
    }

    public void editVideo(String uid, String vid, VideoN newVid) {
        repository.editVideo(uid, vid, newVid);
    }

    public LiveData<VideoN> getCurrentVideo() {
        return currentVideo;
    }

    public void setCurrentVideo(VideoN video) {
        currentVideo.setValue(video);
    }
}
