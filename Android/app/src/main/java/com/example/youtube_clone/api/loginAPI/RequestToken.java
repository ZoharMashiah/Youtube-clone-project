package com.example.youtube_clone.api.loginAPI;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface RequestToken {
    @POST("api/tokens")
    Call<LoginResponse> login(@Body LoginRequest loginRequest);
}

