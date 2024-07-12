package com.example.youtube_clone.api.userAPI;

import android.content.Context;

import com.example.youtube_clone.MyApplication;
import com.example.youtube_clone.R;
import com.example.youtube_clone.UserN;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UserAPI {
    Retrofit retrofit;
    RequestUser requestUser;

    public UserAPI() {

        Context context = MyApplication.getAppContext();
        this.retrofit = new Retrofit.Builder()
                .baseUrl(context.getString(R.string.BaseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        this.requestUser = retrofit.create(RequestUser.class);
    }

    public void get() {

        Call<UserN> call = requestUser.getUser("3");
        call.enqueue(new Callback<UserN>() {
            @Override
            public void onResponse(Call<UserN> call, Response<UserN> response) {
                UserN user = response.body();
            }

            @Override
            public void onFailure(Call<UserN> call, Throwable throwable) {
                // wrong username\password
            }
        });
    }

    public void post() {

    }
}
