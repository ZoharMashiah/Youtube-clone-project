package com.example.youtube_clone;

public class ViewModelsSingelton {
    private static ViewModelsSingelton singleton = null;
    private VideosViewModel videosViewModel;

    private ViewModelsSingelton() {
        videosViewModel = new VideosViewModel();
    }

    public static ViewModelsSingelton getInstance() {
        if (singleton == null) {
            singleton = new ViewModelsSingelton();
        }
        return singleton;
    }

    public VideosViewModel getVideosViewModel() {
        return this.videosViewModel;
    }
}
