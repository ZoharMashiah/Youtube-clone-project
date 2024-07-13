package com.example.youtube_clone;

import android.content.Context;
import android.content.SharedPreferences;

import com.example.youtube_clone.UserDao.UserDao;

public class UserManager {
    private volatile static UserManager instance;
    private UserN currentUser;
    private String token;
    private UserDao userDao;
    private Context context;

    private static final String USER_PREFS = "UserPrefs";
    private static final String TOKEN = "Token";

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
        token = prefs.getString(TOKEN, null);
        // get local storage jwt and check it against the server.
        // if verified, a user is returned and insert it here
    }

    public void login(UserN user, String token) {
        this.currentUser = user;
        this.token = token;

        if (context == null) {
            throw new IllegalStateException("Context is null, call init()");
        }

        SharedPreferences.Editor editor = context.getSharedPreferences(USER_PREFS, Context.MODE_PRIVATE).edit();
        editor.putString(TOKEN, token);
        editor.apply();
    }

    public void logout() {
        currentUser = null;
        token = null;
    }

    public UserN getCurrentUser() {
        return currentUser;
    }

    public String getAuthToken() {
        return token;
    }

    public boolean isLoggedIn() {
        return currentUser != null && token != null;
    }
}
