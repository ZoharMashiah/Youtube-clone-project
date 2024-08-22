package com.example.youtube_clone;

import android.content.Context;

public class ViewModelsSingelton {
    private static ViewModelsSingelton singelton = null;
    private VideosViewModel videosViewModel;

    private ViewModelsSingelton(Context context) {
        videosViewModel = new VideosViewModel(context);
    }

    public static ViewModelsSingelton getInstance(Context context) {
        if(singelton == null) {
            singelton = new ViewModelsSingelton(context);
        }
        return singelton;
    }

    public VideosViewModel getVideosViewModel() {
        return this.videosViewModel;
    }
}
