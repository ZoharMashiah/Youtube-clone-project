package com.example.youtube_clone.api.userAPI;


import com.example.youtube_clone.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface RequestUser {
    @GET("api/users/{id}")
    Call<User> getUser(@Path("id") String id); // user page

    @PATCH("api/users/{id}")
    Call<User> patchUser();  // update user

    @DELETE("api/users/{id}")
    Call<Void> deleteUser(@Path("id") String id);  // delete user

    @POST("api/users/signup")
    Call<User> postUser(@Body User user);  // create user
}

