package com.example.youtube_clone.reposetories;

import android.app.Application;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.room.Room;

import com.example.youtube_clone.AppDB;
import com.example.youtube_clone.Room.Video.VideoDao;
import com.example.youtube_clone.VideoN;
import com.example.youtube_clone.api.videoAPI.VideoApi;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class VideoRepository {
    private VideoDao dao;
    private VideoListData videoListData;
    private MutableLiveData<List<VideoN>> videoListFilteredData;
    private VideoApi api;

    public VideoRepository() {
        //AppDB db = Room.databaseBuilder(ApplicationPro.getApplicationContext(), AppDB.class,"database-name" ).build();
        videoListData = new VideoListData();
        api = new VideoApi(videoListData, dao);
        videoListFilteredData =  api.getVideoListFiltered();
    }

    public void add(String uid, VideoN videoN) {
        api.add(uid, videoN);
    }

    public void delete(VideoN videoN) {
    }


    class VideoListData extends MutableLiveData<List<VideoN>> {
        public VideoListData() {
            super();
            setValue(new ArrayList<>());
        }

        @Override
        protected void onActive() {
            super.onActive();

            new Thread(() -> {

            }).start();
        }
    }

    class VideoListFilteredData extends MutableLiveData<List<VideoN>> {
        public VideoListFilteredData() {
            super();
            setValue(new ArrayList<>());
        }

        @Override
        protected void onActive() {
            super.onActive();

            new Thread(() -> {

            }).start();
        }
    }

    public LiveData<List<VideoN>> getFeed() {
        return videoListData;
    }

    public LiveData<VideoN> getVideo(String uid, String vid) {
        return api.getVideo(uid, vid);
    }

    public LiveData<List<VideoN>> getVideos() {
        return videoListData;
    }

    public void reload() {
        api.getFeed();
    }

    public LiveData<List<VideoN>> filterVideos(Boolean search, String text) {
        api.filterVideos(search, text);
        return videoListFilteredData;
    }

    public LiveData<List<VideoN>> getVideoListFilteredData() {
        return videoListFilteredData;
    }

    public void editVideo(String uid, String vid, VideoN newVid) {
        api.editVideo(uid, vid, newVid);
    }

    public void deleteVideo(String uid, String vid) {
        api.deleteVideo(uid, vid);
    }
}
