package com.example.youtube_clone;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.ViewModel;

import com.example.youtube_clone.repositories.CommentsRepository;

import java.util.List;

public class CommentViewModel extends ViewModel {
    private CommentsRepository repository;
    private LiveData<List<CommentData>> comments;

    public CommentViewModel() {
        repository = new CommentsRepository();
        comments = repository.getLocalComments();
    }
    public LiveData<CommentData> getOneComment(String uid, String vid, String commentId){
        return repository.getOneComment(uid, vid, commentId);

    }

    public LiveData<List<CommentData>> getAllComments(String uid, String vid){
        return repository.getAllComments(uid, vid);
    }

    public LiveData<List<CommentData>> getLocalComments(){
        return comments;
    }

    public void deleteComment(String uid, String vid, String commentId){
        repository.deleteComment(uid, vid, commentId);
    }

    public void updateComment(String uid, String vid, String commentId, CommentData updatedComment){
        repository.updateComment(uid, vid, commentId, updatedComment);
    }

    public void postComment(String uid, String vid, CommentData newComment) {
        repository.postComment(uid, vid, newComment);
    }

}
