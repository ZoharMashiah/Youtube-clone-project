package com.example.youtube_clone;

import android.app.Application;
import android.content.Context;

public class MyApplication extends Application {
    private static MyApplication instance;


    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
    }

    public static MyApplication getInstance() {
        return instance;
    }

    public static Context getAppContext() {
        return instance.getApplicationContext();
    }
}
