package com.example.youtube_clone;

public class ViewModelsSingelton {
    private static ViewModelsSingelton singelton = null;
    private VideosViewModel videosViewModel;

    private ViewModelsSingelton() {
        videosViewModel = new VideosViewModel();
    }

    public static ViewModelsSingelton getInstance() {
        if(singelton == null) {
            singelton = new ViewModelsSingelton();
        }
        return singelton;
    }

    public VideosViewModel getVideosViewModel() {
        return this.videosViewModel;
    }
}
