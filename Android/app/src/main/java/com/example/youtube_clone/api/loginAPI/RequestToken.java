package com.example.youtube_clone.api.loginAPI;

import com.example.youtube_clone.UserN;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface RequestToken {
    @GET("tokens/{token}")
    Call<UserN> getUser(@Path("token") String id);

    @POST("tokens")
    Call<LoginResponse> login(@Body LoginRequest loginRequest);
}

