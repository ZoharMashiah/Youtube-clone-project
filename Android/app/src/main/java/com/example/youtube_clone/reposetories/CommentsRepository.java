package com.example.youtube_clone.reposetories;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.youtube_clone.CommentData;
import com.example.youtube_clone.Room.Video.VideoDao;
import com.example.youtube_clone.VideoN;
import com.example.youtube_clone.api.commentAPI.commentAPI;
import com.example.youtube_clone.api.videoAPI.VideoApi;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CommentsRepository {
    private commentAPI api;
    private CommentsListData commentsListData;
    public CommentsRepository() {
        commentsListData = new CommentsListData();
        api = new commentAPI(commentsListData);
    }


    class CommentsListData extends MutableLiveData<List<CommentData>> {
        public CommentsListData() {
            super();
            setValue(new ArrayList<>());
        }

        @Override
        protected void onActive() {
            super.onActive();

            new Thread(() -> {

            }).start();
        }
    }

    public LiveData<CommentData> getOneComment(String uid, String vid, String commentId){
        return api.getOneComment(uid, vid, commentId);

    }

    public LiveData<List<CommentData>> getAllComments(String uid, String vid){
        return api.getAllComments(uid, vid);
    }

    public LiveData<List<CommentData>> getLocalComments(){
        return api.getLocalComments();
    }

    public void deleteComment(String uid, String vid, String commentId){
        api.deleteComment(uid, vid, commentId);
    }

    public void updateComment(String uid, String vid, String commentId, CommentData updatedComment){
        api.updateComment(uid, vid, commentId, updatedComment);
    }

    public void postComment(String uid, String vid, CommentData newComment){
        api.postComment(uid, vid, newComment);
    }
}
