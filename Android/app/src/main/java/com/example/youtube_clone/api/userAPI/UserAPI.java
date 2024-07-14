package com.example.youtube_clone.api.userAPI;

import com.example.youtube_clone.MyApplication;
import com.example.youtube_clone.R;
import com.example.youtube_clone.User;
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
        void onSuccess(User user, String message);

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
        Call<User> call = requestUser.getUser(id);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                User user = response.body();
                // go to user page
            }

            @Override
            public void onFailure(Call<User> call, Throwable throwable) {
                // error cant find user
            }
        });
    }

    public void signUp(User user, UserCallback callback) {
        Call<User> call = requestUser.postUser(user);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    User createdUser = response.body();
                    if (createdUser != null) {
                        callback.onSuccess(createdUser, "User has been created");
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
            public void onFailure(Call<User> call, Throwable throwable) {
                callback.onError("Network error: " + throwable.getMessage());
            }
        });

    }

    public void delete(User user, UserCallback callback) {
        Call<Void> call = requestUser.deleteUser(user.get_id());
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    callback.onSuccess(null, "User was deleted successfully");
                } else {
                    callback.onError("Deletion failed: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable throwable) {
                callback.onError("Network error: " + throwable.getMessage());
            }
        });
    }
}
