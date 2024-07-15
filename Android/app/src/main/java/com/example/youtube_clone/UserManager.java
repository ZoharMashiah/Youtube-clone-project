package com.example.youtube_clone;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.example.youtube_clone.UserDao.UserDao;
import com.example.youtube_clone.api.loginAPI.TokenAPI;
import com.example.youtube_clone.api.loginAPI.TokenResponse;
import com.example.youtube_clone.db.AppDB;

public class UserManager {
    private volatile static UserManager instance;
    private User currentUser;
    private String token;
    private UserDao userDao;
    private Context context;
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

    public void init(Context context) {
        this.context = context.getApplicationContext();
        AppDB db = AppDB.getInstance(this.context);
        userDao = db.userDao();

        SharedPreferences prefs = this.context.getSharedPreferences(USER_PREFS, Context.MODE_PRIVATE);
        token = prefs.getString(JWT_TOKEN, null);

        if (token != null) {
            tokenAPI.verify(token, new TokenAPI.LoginCallback() {
                @Override
                public void onSuccess(TokenResponse result) {
                    currentUser = result.getUser();
                    token = result.getToken();
                    updateTokenLocally(token);

                    Log.d("UserManager", "verified correctly");
                }

                @Override
                public void onError(String message) {
                    currentUser = null;
                    token = null;
                    Log.d("UserManager", "Session expired");
                }
            });
        }

        Log.d("UserManager", "Token is null");

    }

    public void login(User user, String token) {
        this.currentUser = user;
        this.token = token;
        updateTokenLocally(token);
    }

    public void logout() {
        currentUser = null;
        token = null;
        updateTokenLocally(token);
    }

    public User getCurrentUser() {
        return currentUser;
    }

    public String getAuthToken() {
        return token;
    }

    public boolean isLoggedIn() {
        return currentUser != null && token != null;
    }

    public void updateTokenLocally(String token) {
        SharedPreferences prefs = context.getSharedPreferences(USER_PREFS, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(JWT_TOKEN, token);
        editor.apply();
    }
}
