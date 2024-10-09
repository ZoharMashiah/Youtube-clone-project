package com.example.youtube_clone;

import androidx.room.Database;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverters;

import com.example.youtube_clone.Room.Video.VideoDao;

@Database(entities = {VideoN.class}, version = 1)
@TypeConverters({Converters.class})
public abstract class AppDB extends RoomDatabase {
    public abstract VideoDao videoDao();
}
