package com.example.youtube_clone.UserDao;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import com.example.youtube_clone.User;

@Dao
public interface UserDao {
    // equivalent to get "users/{id}"
    @Query("SELECT * FROM User WHERE _id = :id")
    User getUser(String id);

    // equivalent to post
    @Insert
    void insertUser(User user);

    @Update
    void updateUser(User user);

    @Delete
    void deleteUser(User user);
}
