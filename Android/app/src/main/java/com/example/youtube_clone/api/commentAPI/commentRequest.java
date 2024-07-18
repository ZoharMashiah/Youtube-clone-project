package com.example.youtube_clone.api.commentAPI;

import com.example.youtube_clone.Comment;
import com.example.youtube_clone.CommentData;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface commentRequest {

    @GET("api/users/{uid}/videos/{vid}/comments")
    Call<List<CommentData>> getAllComments(@Path("uid") String uid, @Path("vid") String vid);

    @GET("api/users/{uid}/videos/{vid}/comments/{commentId}")
    Call<CommentData> getOneComment(@Path("uid") String uid, @Path("vid") String vid, @Path("commentId") String commentId);

    @POST("api/users/{uid}/videos/{vid}/comments")
    Call<CommentData> postComment(@Path("uid") String uid, @Path("vid") String vid, @Body CommentData comment);

    @PATCH("api/users/{uid}/videos/{vid}/comments/{commentId}")
    Call<Void> updateComment(@Path("uid") String uid, @Path("vid") String vid, @Path("commentId") String commentId, @Body CommentData comment);

    @DELETE("api/users/{uid}/videos/{vid}/comments/{commentId}")
    Call<Void> deleteComment(@Path("uid") String uid, @Path("vid") String vid, @Path("commentId") String commentId);


}
