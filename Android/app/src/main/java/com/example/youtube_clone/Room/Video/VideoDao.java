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
    List<VideoN> index();

    @Query("SELECT * FROM videon WHERE _id = :id")
    VideoN get(String id);

    @Insert
    void insert(VideoN... videos);

    @Update
    void update(VideoN... videos);

    @Delete
    void delete(VideoN... videos);
}
