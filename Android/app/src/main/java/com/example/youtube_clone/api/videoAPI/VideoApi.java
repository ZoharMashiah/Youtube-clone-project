package com.example.youtube_clone.api.videoAPI;

import android.util.Log;

import androidx.lifecycle.MutableLiveData;

import com.example.youtube_clone.MyApplication;
import com.example.youtube_clone.R;
import com.example.youtube_clone.Room.Video.VideoDao;
import com.example.youtube_clone.Video;
import com.example.youtube_clone.VideoN;
import com.example.youtube_clone.api.loginAPI.RequestToken;
import com.example.youtube_clone.authorization.AuthInterceptor;

import java.util.List;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class VideoApi {

    MutableLiveData<List<VideoN>> videoList;
    MutableLiveData<List<VideoN>> videoListFiltered;
    Retrofit retrofit;
    videoRequest videoRequest;
    MutableLiveData<VideoN> video;

    public VideoApi(MutableLiveData<List<VideoN>> videoListData, VideoDao dao) {
        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(new AuthInterceptor())
                .build();

        this.retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.getAppContext().getString(R.string.BaseUrl))
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        this.videoRequest = retrofit.create(videoRequest.class);
        this.videoList = videoListData;
        video = new MutableLiveData<>();
        videoListFiltered = new MutableLiveData<>();
    }

    public MutableLiveData<List<VideoN>> getFeed() {
        Call<List<VideoN>> call = videoRequest.getFeed();

        call.enqueue(new Callback<List<VideoN>>() {
            @Override
            public void onResponse(Call<List<VideoN>> call, Response<List<VideoN>> response) {
                videoList.postValue(response.body());
            }

            @Override
            public void onFailure(Call<List<VideoN>> call, Throwable throwable) {
                Log.println(Log.ASSERT,"ff", "fgg");
            }
        });
        return videoList;
    }

    public MutableLiveData<VideoN> getVideo(String uid, String vid){
        Call<VideoN> call = videoRequest.getVideo(uid, vid);

        call.enqueue(new Callback<VideoN>() {
            @Override
            public void onResponse(Call<VideoN> call, Response<VideoN> response) {
                video.postValue(response.body());
            }

            @Override
            public void onFailure(Call<VideoN> call, Throwable throwable) {

            }
        });
        return video;
    }

    public MutableLiveData<List<VideoN>> getVideos(){
        return videoList;
    }

    public void add(String uid, VideoN videoN) {
        Call<Void> call = videoRequest.addVideo(uid, videoN);

        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {

            }

            @Override
            public void onFailure(Call<Void> call, Throwable throwable) {

            }
        });
    }

    public MutableLiveData<List<VideoN>> filterVideos(Boolean search, String text) {
        Filter filter = new Filter(search, text);
        Call<List<VideoN>> call = videoRequest.filterList(filter);

        call.enqueue(new Callback<List<VideoN>>() {
            @Override
            public void onResponse(Call<List<VideoN>> call, Response<List<VideoN>> response) {
                videoListFiltered.setValue(response.body());
            }

            @Override
            public void onFailure(Call<List<VideoN>> call, Throwable throwable) {
                videoListFiltered.setValue(null);
            }
        });
        return videoListFiltered;
    }

    public MutableLiveData<List<VideoN>> getVideoListFiltered() {
        return videoListFiltered;
    }

    public void editVideo(String uid, String vid, VideoN newVid) {
        Call<Void> call = videoRequest.editVideo(uid, vid, newVid);

        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {

            }

            @Override
            public void onFailure(Call<Void> call, Throwable throwable) {

            }
        });
    }
}
