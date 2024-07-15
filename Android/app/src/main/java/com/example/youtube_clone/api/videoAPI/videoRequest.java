package com.example.youtube_clone.api.videoAPI;

import com.example.youtube_clone.Video;
import com.example.youtube_clone.VideoN;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface videoRequest {

    @POST("api/users/{uid}/videos")
    Call<Void> addVideo(@Path("uid")String uid, @Body VideoN video);

    @GET("api/users/{uid}/videos")
    Call<List<VideoN>> getUserVideos(@Path("uid")String uid);

    @GET("api/users/{uid}/videos/{vid}")
    Call<VideoN> getVideo(@Path("uid")String uid, @Path("vid")String vid);

    @PATCH("api/users/{uid}/videos/{vid}")
    Call<Void> editVideo(@Path("uid")String uid, @Path("vid")String vid, @Body VideoN video);

    @DELETE("api/users/{uid}/videos/{vid}")
    Call<Void> deleteVideo(@Path("uid")String uid, @Path("vid")String vid);

    @POST("api/users/{uid}/videos/{vid}/action")
    Call<Void> likeOrDislikePush(@Path("uid")String uid, @Path("vid")String vid, @Body LikeOrDislike likeOrDislike);

    @GET("/api/videos")
    Call<List<VideoN>> getFeed();

    @POST("api/videos/filter")
    Call<List<VideoN>> filterList(@Body Filter filter);
}
