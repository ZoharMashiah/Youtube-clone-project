package com.example.youtube_clone.api.commentAPI;

import androidx.lifecycle.MutableLiveData;

import com.example.youtube_clone.CommentData;
import com.example.youtube_clone.MyApplication;
import com.example.youtube_clone.R;
import com.example.youtube_clone.api.loginAPI.AuthInterceptor;
import com.example.youtube_clone.reposetories.CommentsRepository;
//import com.example.youtube_clone.authorization.AuthInterceptor;

import java.util.ArrayList;
import java.util.List;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class commentAPI {
    MutableLiveData<List<CommentData>> commentList;
    Retrofit retrofit;

    commentRequest commentRequest;
    MutableLiveData<CommentData> comment;

    public commentAPI(MutableLiveData<List<CommentData>> commentsListData) {
        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(new AuthInterceptor())
                .build();

        this.retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.getAppContext().getString(R.string.BaseUrl))
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        this.commentRequest = retrofit.create(commentRequest.class);
        if(commentsListData != null){
            commentList = commentsListData;
        }else{
        commentList = new MutableLiveData<>();
        }
        comment = new MutableLiveData<>();
    }

    public MutableLiveData<CommentData> getOneComment(String uid, String vid, String commentId){
        Call<CommentData> call = commentRequest.getOneComment(uid, vid, commentId);
        call.enqueue(new Callback<CommentData>() {
            @Override
            public void onResponse(Call<CommentData> call, Response<CommentData> response) {
                if(response.isSuccessful()) {
                    comment.setValue(response.body());
                } else {
                    // Handle unsuccessful response
                }
            }

            @Override
            public void onFailure(Call<CommentData> call, Throwable throwable) {
                // Handle failure
            }
        });
        return comment;
    }

    public MutableLiveData<List<CommentData>> getAllComments(String uid, String vid){
        Call<List<CommentData>> call = commentRequest.getAllComments(uid, vid);
        call.enqueue(new Callback<List<CommentData>>() {
            @Override
            public void onResponse(Call<List<CommentData>> call, Response<List<CommentData>> response) {
                if(response.isSuccessful()) {
                    commentList.setValue(response.body());
                } else {
                    // Handle unsuccessful response
                }
            }

            @Override
            public void onFailure(Call<List<CommentData>> call, Throwable throwable) {
                // Handle failure
            }
        });
        return commentList;

    }

    public MutableLiveData<List<CommentData>> getLocalComments(){
        return commentList;
    }

    public void deleteComment(String uid, String vid, String commentId){
        Call<Void> call = commentRequest.deleteComment(uid, vid, commentId);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()) {
                    // Handle successful delete
                } else {
                    // Handle unsuccessful delete
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable throwable) {
                // Handle failure
            }
        });
    }

    public void updateComment(String uid, String vid, String commentId, CommentData updatedComment){
        Call<Void> call = commentRequest.updateComment(uid, vid, commentId, updatedComment);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()) {
                    // Handle successful update
                } else {
                    // Handle unsuccessful update
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable throwable) {
                // Handle failure
            }
        });
    }

    public void postComment(String uid, String vid, CommentData newComment){
        Call<CommentData> call = commentRequest.postComment(uid, vid, newComment);
        call.enqueue(new Callback<CommentData>() {
            @Override
            public void onResponse(Call<CommentData> call, Response<CommentData> response) {
                if(response.isSuccessful()) {
                    List<CommentData> temp = commentList.getValue();
                    if (temp == null) {
                       temp = new ArrayList<>();
                       temp.add(response.body());
                       commentList.setValue(temp);
                    } else {
                        temp.add(response.body());
                        commentList.setValue(temp);
                    }
                }else {
                    // Handle unsuccessful post
                }
            }

            @Override
            public void onFailure(Call<CommentData> call, Throwable throwable) {
                // Handle failure
            }
        });
    }
}