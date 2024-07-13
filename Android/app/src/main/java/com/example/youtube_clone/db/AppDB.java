package com.example.youtube_clone.db;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverters;

import com.example.youtube_clone.UserDao.UserDao;
import com.example.youtube_clone.UserN;

@Database(entities = {UserN.class}, version = 1, exportSchema = false)
@TypeConverters({StringListConverter.class, UserSettingsConverter.class})
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
