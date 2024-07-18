package com.example.youtube_clone;

import android.app.Application;
import android.content.Context;

import androidx.lifecycle.ViewModelProvider;

public class MyApplication extends Application {
    private static MyApplication instance;
    private UserPageViewModel userPageViewModel;


    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        UserManager.getInstance().init();
    }

    public static MyApplication getInstance() {
        return instance;
    }

    public static Context getAppContext() {
        return instance.getApplicationContext();
    }

    public UserPageViewModel getUserPageViewModel() {
        if (userPageViewModel == null) {
            userPageViewModel = new ViewModelProvider.AndroidViewModelFactory(this)
                    .create(UserPageViewModel.class);
        }
        return userPageViewModel;
    }
}
