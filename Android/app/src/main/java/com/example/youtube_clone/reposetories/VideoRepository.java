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
    private VideoApi api;

    public VideoRepository() {
        //AppDB db = Room.databaseBuilder(ApplicationPro.getApplicationContext(), AppDB.class,"database-name" ).build();
        videoListData = new VideoListData();
        api = new VideoApi(videoListData, dao);
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
}
