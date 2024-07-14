package com.example.youtube_clone.api.videoAPI;

import android.util.Log;

import androidx.lifecycle.MutableLiveData;

import com.example.youtube_clone.MyApplication;
import com.example.youtube_clone.R;
import com.example.youtube_clone.VideoN;
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
    Retrofit retrofit;
    videoRequest videoRequest;
    MutableLiveData<VideoN> video;

    public VideoApi() {

        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(new AuthInterceptor())
                .build();

        this.retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.getAppContext().getString(R.string.BaseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .client(client)
                .build();

        this.videoRequest = retrofit.create(videoRequest.class);
        videoList = new MutableLiveData<>();
        video = new MutableLiveData<>();
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
                Log.println(Log.ASSERT, "ff", "fgg");
            }
        });
        return videoList;
    }

    public MutableLiveData<VideoN> getVideo(String uid, String vid) {
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

    public MutableLiveData<List<VideoN>> getUserVideos(String uid) {
        MutableLiveData<List<VideoN>> videosLiveData = new MutableLiveData<>();

        Call<List<VideoN>> call = videoRequest.getUserVideos(uid);

        call.enqueue(new Callback<List<VideoN>>() {
            @Override
            public void onResponse(Call<List<VideoN>> call, Response<List<VideoN>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    videosLiveData.setValue(response.body());
                } else {
                    // Handle error case
                    videosLiveData.setValue(null); // or an empty list
                }
            }

            @Override
            public void onFailure(Call<List<VideoN>> call, Throwable throwable) {
                // Handle failure case
                videosLiveData.setValue(null); // or an empty list
            }
        });

        return videosLiveData;
    }

    public MutableLiveData<List<VideoN>> getVideos() {
        return videoList;
    }
}
