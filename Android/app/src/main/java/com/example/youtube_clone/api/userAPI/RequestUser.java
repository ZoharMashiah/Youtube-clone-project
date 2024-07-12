package com.example.youtube_clone.api.userAPI;


import com.example.youtube_clone.UserN;

import retrofit2.Call;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface RequestUser {
    @GET("users/{id}")
    Call<UserN> getUser(@Path("id") String id); // user page

    @POST("users")
    Call<Void> postUser();  // create user

    @DELETE("users")
    Call<Void> deleteUser();  // delete user

}

