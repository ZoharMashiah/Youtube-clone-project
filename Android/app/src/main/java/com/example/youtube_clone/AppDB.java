package com.example.youtube_clone;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

import com.example.youtube_clone.UserDao.UserDao;

@Database(entities = {UserN.class, Video.class}, version = 1)
public abstract class AppDB extends RoomDatabase {
    public abstract UserDao userDao();

    // public abstract VideoDao videoDao();

    private static volatile AppDB instance;

    public static AppDB getInstance(final Context context) {
        if (instance == null) {
            synchronized (AppDB.class) {
                if (instance == null) {
                    instance = Room.databaseBuilder(context.getApplicationContext(),
                                    AppDB.class, "app_database")
                            .build();
                }
            }
        }
        return instance;
    }

}
