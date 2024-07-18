package com.example.youtube_clone;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.youtube_clone.api.loginAPI.TokenAPI;
import com.example.youtube_clone.api.loginAPI.TokenResponse;

public class UserManager {
    private volatile static UserManager instance;
    private String token = null;
    private Context context = MyApplication.getAppContext();
    private final MutableLiveData<User> currentUserLiveData = new MutableLiveData<>();
    private UserPageViewModel viewModel;
    private final TokenAPI tokenAPI = new TokenAPI();

    private static final String USER_PREFS = "data";
    private static final String JWT_TOKEN = "token";

    private UserManager() {
    }

    public static UserManager getInstance() {
        if (instance == null) {
            synchronized (UserManager.class) {
                if (instance == null) {
                    instance = new UserManager();
                }
            }
        }
        return instance;
    }

    public void init() {
        context = MyApplication.getAppContext();
        SharedPreferences prefs = this.context.getSharedPreferences(USER_PREFS, Context.MODE_PRIVATE);
        token = prefs.getString(JWT_TOKEN, null);
        viewModel = MyApplication.getInstance().getUserPageViewModel();

        Log.d("UserManager", "on start, token is: " + token);

        if (token != null) {
            tokenAPI.verify(token, new TokenAPI.LoginCallback() {
                @Override
                public void onSuccess(TokenResponse result) {
                    if (result.getUser() != null) {
                        setCurrentUser(result.getUser());
                        Log.d("UserManager", "verified correctly, connected as " + getCurrentUser().getUsername());
                        viewModel.loadUser(getCurrentUser().get_id());
                    }
                }

                @Override
                public void onError(String message) {
                    token = null;
                    Log.d("UserManager", "Session has expired");
                }
            });
        }
    }

    public void login(User user, String token) {
        setCurrentUser(user);
        this.token = token;
        updateTokenLocally(token);
        Log.d("UserManager", "Logged in as " + user.getUsername());
    }

    public void logout() {
        setCurrentUser(null);
        token = null;
        updateTokenLocally(token);
    }

    public LiveData<User> getCurrentUserLiveData() {
        return currentUserLiveData;
    }

    public void setCurrentUser(User user) {
        currentUserLiveData.setValue(user);
    }

    public User getCurrentUser() {
        return currentUserLiveData.getValue();
    }

    public String getAuthToken() {
        return token;
    }

    public boolean isLoggedIn() {
        return getCurrentUser() != null && token != null;
    }

    public void updateTokenLocally(String token) {
        SharedPreferences prefs = context.getSharedPreferences(USER_PREFS, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(JWT_TOKEN, token);
        editor.apply();
    }
}
