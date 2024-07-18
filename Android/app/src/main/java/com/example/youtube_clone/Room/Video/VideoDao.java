package com.example.youtube_clone.Room.Video;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import com.example.youtube_clone.VideoN;

import java.util.List;

@Dao
public interface VideoDao {

    @Query("SELECT * FROM videon")
    List<VideoN> getFeed();

    @Query("SELECT * FROM videon WHERE _id = :id")
    VideoN getVideo(String id);

    @Insert
    void add(VideoN... videos);

    @Query("UPDATE videon SET description = :description, title= :title WHERE _id =:id")
    void editVideo(String description, String title, String id);

    @Query("DELETE FROM videon WHERE _id =:videoId")
    void deleteVideo(String videoId);

    @Query("DELETE FROM videon")
    void clear();

    @Insert
    void insertList(List<VideoN> body);
}
