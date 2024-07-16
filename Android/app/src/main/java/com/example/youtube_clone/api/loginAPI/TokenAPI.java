package com.example.youtube_clone.api.loginAPI;

import android.util.Log;

import com.example.youtube_clone.MyApplication;
import com.example.youtube_clone.R;
import com.example.youtube_clone.authorization.AuthInterceptor;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class TokenAPI {
    public interface LoginCallback {
        void onSuccess(TokenResponse result);

        void onError(String message);
    }

    Retrofit retrofit;
    RequestToken requestToken;

    public TokenAPI() {

        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(new AuthInterceptor())
                .build();

        this.retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.getAppContext().getString(R.string.BaseUrl))
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        this.requestToken = retrofit.create(RequestToken.class);

    }

    public void verify(String token, LoginCallback callback) {
        Call<TokenResponse> call = requestToken.verifyLogin("Bearer " + token);
        call.enqueue(new Callback<TokenResponse>() {
            @Override
            public void onResponse(Call<TokenResponse> call, Response<TokenResponse> response) {
                if (response.isSuccessful()) {
                    TokenResponse tokenResponse = response.body();
                    if (tokenResponse != null) {
                        callback.onSuccess(tokenResponse);
                    } else {
                        callback.onError("Empty response received");
                    }
                } else if (response.code() == 404) {
                    callback.onError("Session expired");
                } else {
                    String message = "Verification failed: " + response.code() + " " + response.message();
                    callback.onError(message);
                    Log.e("TokenAPI", message);
                }
            }

            @Override
            public void onFailure(Call<TokenResponse> call, Throwable throwable) {
                callback.onError("Network error: " + throwable.getMessage());
            }
        });
    }

    public void loginUser(String username, String password, LoginCallback callback) {

        LoginRequest request = new LoginRequest(username, password);
        Call<TokenResponse> call = requestToken.login(request);

        call.enqueue(new Callback<TokenResponse>() {
            @Override
            public void onResponse(Call<TokenResponse> call, Response<TokenResponse> response) {

                if (response.isSuccessful()) {
                    TokenResponse tokenResponse = response.body();
                    if (tokenResponse != null) {
                        callback.onSuccess(tokenResponse);
                    } else {
                        callback.onError("Empty response received");
                    }
                } else if (response.code() == 404) {
                    callback.onError("Wrong username or password");
                } else {
                    String message = "Logging in failed: " + response.code() + " " + response.message();
                    callback.onError(message);
                    Log.e("TokenAPI", "onError: " + message);
                }
            }

            @Override
            public void onFailure(Call<TokenResponse> call, Throwable throwable) {
                String message = "Network error: " + throwable.getMessage();
                callback.onError(message);
                Log.e("TokenAPI", "onFailure: " + message);
            }
        });
    }

}
