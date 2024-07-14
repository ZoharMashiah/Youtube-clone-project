package com.example.youtube_clone.UserDao;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import com.example.youtube_clone.UserN;

@Dao
public interface UserDao {
    // equivalent to get "users/{id}"
    @Query("SELECT * FROM UserN WHERE _id = :id")
    UserN getUser(String id);

    // equivalent to post
    @Insert
    void insertUser(UserN user);

    @Update
    void updateUser(UserN user);

    @Delete
    void deleteUser(UserN user);
}
