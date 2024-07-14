package com.example.youtube_clone.api.userAPI;

import com.example.youtube_clone.MyApplication;
import com.example.youtube_clone.R;
import com.example.youtube_clone.UserN;
import com.example.youtube_clone.authorization.AuthInterceptor;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UserAPI {
    Retrofit retrofit;
    RequestUser requestUser;

    public interface UserCallback {
        void onSuccess(UserN user);

        void onError(String message);
    }

    public UserAPI() {
        HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
        logging.setLevel(HttpLoggingInterceptor.Level.BODY);

        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(new AuthInterceptor())
                .addInterceptor(logging)
                .build();

        this.retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.getAppContext().getString(R.string.BaseUrl))
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        this.requestUser = retrofit.create(RequestUser.class);
    }

    public void get(String id) {    //TODO user page
        Call<UserN> call = requestUser.getUser(id);
        call.enqueue(new Callback<UserN>() {
            @Override
            public void onResponse(Call<UserN> call, Response<UserN> response) {
                UserN user = response.body();
                // go to user page
            }

            @Override
            public void onFailure(Call<UserN> call, Throwable throwable) {
                // error cant find user
            }
        });
    }

    public void signUp(UserN user, UserCallback callback) {
        Call<UserN> call = requestUser.postUser(user);
        call.enqueue(new Callback<UserN>() {
            @Override
            public void onResponse(Call<UserN> call, Response<UserN> response) {
                if (response.isSuccessful()) {
                    UserN createdUser = response.body();
                    if (createdUser != null) {
                        callback.onSuccess(createdUser);
                    } else {
                        callback.onError("Signing up Failed: " + response.code());
                    }
                } else if (response.code() == 409) {
                    callback.onError("Username is not available");
                } else {
                    callback.onError("Signing up Failed: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<UserN> call, Throwable throwable) {
                callback.onError("Network error: " + throwable.getMessage());
            }
        });
    }
}
