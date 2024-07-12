package com.example.youtube_clone.api.loginAPI;

import com.example.youtube_clone.MyApplication;
import com.example.youtube_clone.R;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class TokenAPI {
    public interface LoginCallback {
        void onSuccess(LoginResponse result);

        void onWrongCredentials();

        void onError(String message);

        void onFailure(String message);
    }

    Retrofit retrofit;
    RequestToken requestToken;

    public TokenAPI() {

        this.retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.getAppContext().getString(R.string.BaseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        this.requestToken = retrofit.create(RequestToken.class);
    }

    public void loginUser(String username, String password, LoginCallback callback) {
        LoginRequest loginRequest = new LoginRequest(username, password);

        Call<LoginResponse> call = requestToken.login(loginRequest);

        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if (response.isSuccessful()) {
                    LoginResponse loginResponse = response.body();
                    if (loginResponse != null) {
                        callback.onSuccess(loginResponse);
                    }
                } else if (response.code() == 401 || response.code() == 404) {  // if wrong username or wrong password
                    callback.onWrongCredentials();
                } else {
                    callback.onError("Error: " + response.code() + " " + response.message());
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable throwable) {
                callback.onFailure("Network error: " + throwable.getMessage());
            }
        });

    }

}
