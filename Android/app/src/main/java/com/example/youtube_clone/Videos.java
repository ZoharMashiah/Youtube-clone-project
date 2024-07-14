package com.example.youtube_clone;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Videos {
    private static Videos single_instance = null;
    public ArrayList<Video> videos;
    public ArrayList<Video> filterdVideos;
    public VideoN currentVideo;

    private Videos() {
        this.videos = new ArrayList<>();
        this.currentVideo = null;
    }

    public static Videos getInstance() {
        if (single_instance == null) {
            single_instance = new Videos();
        }
        return single_instance;
    }

    public Video getVideo(int id) {
        Video video = null;
        for (Video v : this.videos) {
            if (id == v.getId()) {
                video = v;
                break;
            }
        }
        return video;
    }

    public int getNextId() {
        int id = 0;
        for (Video v : this.videos) {
            if (id < v.getId()) {
                id = v.getId();
            }
        }
        return id + 1;
    }

    public void filterByCategory(String category) {
        filterdVideos = new ArrayList<>();

        for (Video video : videos) {
            if (video.getCategory().equals(category)) {
                filterdVideos.add(video);
            }
        }
    }

    public void filterByTitle(String title) {
        filterdVideos = new ArrayList<>();

        for (Video video : videos) {
            if (video.getTitle().contains(title)) {
                filterdVideos.add(video);
            }
        }
    }

//    public void updateComment(int commentId, String newCommentText) {
//        for (Comment comment : currentVideo.getComments()) {
//            if (comment.getId() == commentId) {
//                comment.setTitle(newCommentText);
//                break;
//            }
//        }
//    }
//
//    public void deleteComment(int commentId) {
//        Iterator<Comment> iterator = currentVideo.getComments().iterator();
//        while (iterator.hasNext()) {
//            Comment comment = iterator.next();
//            if (comment.getId() == commentId) {
//                iterator.remove();
//                break;
//            }
//        }
//    }
}
