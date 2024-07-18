package com.example.youtube_clone.api.videoAPI;

import android.util.Log;

import androidx.lifecycle.MutableLiveData;

import com.example.youtube_clone.MyApplication;
import com.example.youtube_clone.R;
import com.example.youtube_clone.Room.Video.VideoDao;
import com.example.youtube_clone.VideoN;
import com.example.youtube_clone.api.loginAPI.AuthInterceptor;

import java.util.List;
import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class VideoApi {
    public interface VideoCallback {
        void onSuccess(List<VideoN> videos);

        void onError(String errorMessage);
    }

    MutableLiveData<List<VideoN>> videoList;
    MutableLiveData<List<VideoN>> videoListFiltered;
    Retrofit retrofit;
    videoRequest videoRequest;
    MutableLiveData<VideoN> video;
    private VideoDao dao;

    public VideoApi(MutableLiveData<List<VideoN>> videoListData, VideoDao dao) {
        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(new AuthInterceptor())
                .connectTimeout(6, TimeUnit.MINUTES) // TODO increases timeout until db works
                .readTimeout(6, TimeUnit.MINUTES)
                .writeTimeout(6, TimeUnit.MINUTES)
                .callTimeout(6, TimeUnit.MINUTES)
                .build();

        this.dao = dao;

        this.retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.getAppContext().getString(R.string.BaseUrl))
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        this.videoRequest = retrofit.create(videoRequest.class);
        if (videoListData != null) {
            this.videoList = videoListData;
        }
        video = new MutableLiveData<>();
        videoListFiltered = new MutableLiveData<>();
    }

    public MutableLiveData<List<VideoN>> getFeed() {
        Call<List<VideoN>> call = videoRequest.getFeed();

        call.enqueue(new Callback<List<VideoN>>() {
            @Override
            public void onResponse(Call<List<VideoN>> call, Response<List<VideoN>> response) {
                new Thread(() -> {
                    dao.clear();
                    dao.insertList(response.body());
                    videoList.postValue(dao.getFeed());
                }).start();
                Log.i("VideoAPI", "fetched videos");
            }

            @Override
            public void onFailure(Call<List<VideoN>> call, Throwable throwable) {
                String message = "Network error: " + throwable.getMessage();
                Log.println(Log.ASSERT, "VideoAPI", "failure: " + message);
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

    public void getUserVideos(String uid, VideoCallback callback) {
        Log.i("VideoAPI", "fetching creator video list");

        Call<List<VideoN>> call = videoRequest.getUserVideos(uid);
        call.enqueue(new Callback<List<VideoN>>() {
            @Override
            public void onResponse(Call<List<VideoN>> call, Response<List<VideoN>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Log.i("VideoAPI", "Creator video list fetched successfully");
                    List<VideoN> videoList = response.body();
                    callback.onSuccess(videoList);
                } else {
                    Log.e("VideoAPI", "Unsuccessful: " + response.code() + " " + response.message());
                    callback.onError("Error fetching videos: " + response.message());
                }
            }

            @Override
            public void onFailure(Call<List<VideoN>> call, Throwable throwable) {
                Log.e("VideoAPI", "Error: " + throwable.getMessage());
                throwable.printStackTrace();
                callback.onError("Network error: " + throwable.getMessage());
            }
        });
    }

    public MutableLiveData<List<VideoN>> getVideos() {
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
                new Thread(() -> {
                    dao.editVideo(newVid.getDescription(), newVid.getTitle(), newVid.get_id());
                    videoList.postValue(dao.getFeed());
                }).start();
            }

            @Override
            public void onFailure(Call<Void> call, Throwable throwable) {

            }
        });
    }

    public void deleteVideo(String uid, String vid) {
        Call<Void> call = videoRequest.deleteVideo(uid, vid);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    new Thread(() -> {
                        dao.deleteVideo(vid);
                        videoList.postValue(dao.getFeed());
                    }).start();
                    Log.i("VideoAPI", "Video deleted successfully");
                } else {
                    Log.e("VideoAPI", "Failed to delete video: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable throwable) {
                Log.e("VideoAPI", "Error deleting video: " + throwable.getMessage());
            }
        });
    }

    public void doAction(String uid, String vid, String userId, String action) {
        LikeOrDislike likeOrDislike = new LikeOrDislike(userId, action);
        Call<Void> call = videoRequest.likeOrDislikePush(uid, vid, likeOrDislike);

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
