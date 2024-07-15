package com.example.youtube_clone.api.loginAPI;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface RequestToken {
    @GET("api/tokens")
    Call<TokenResponse> verifyLogin(@Body String token);

    @POST("api/tokens")
    Call<TokenResponse> login(@Body String username, String password);
}

