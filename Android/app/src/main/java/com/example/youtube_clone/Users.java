package com.example.youtube_clone;

import java.util.ArrayList;
import java.util.List;

public class Users {
    private static Users single_instance = null;
    public List<User> users;
    public User currentUser;

    private Users() {
        this.users = new ArrayList<>();
        this.currentUser = null;
    }

    public static Users getInstance() {
        if(single_instance == null) {
            single_instance = new Users();
        }
        return single_instance;
    }

    public User getUser(String username) {
        User user = null;
        for (User u: this.users) {
            if (username.equals(u.getUsername())){
                user = u;
                break;
            }
        }
        return user;
    }
}
