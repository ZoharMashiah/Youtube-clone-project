package com.example.youtube_clone;


import android.app.AlertDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.MutableLiveData;
import androidx.recyclerview.widget.LinearLayoutManager;

import com.example.youtube_clone.api.userAPI.UserAPI;
import com.example.youtube_clone.api.videoAPI.VideoApi;
import com.example.youtube_clone.databinding.ActivityUserPageBinding;

import java.util.List;

public class UserPage extends AppCompatActivity {
    private ActivityUserPageBinding binding;
    private UserAPI userAPI;
    private VideoApi videoApi;
    private MutableLiveData<List<VideoN>> mutableVideoList;
    private User user;

    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        binding = ActivityUserPageBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        userAPI = new UserAPI();
        videoApi = new VideoApi(mutableVideoList,null);

        String userId = getIntent().getStringExtra("userId");

        if (userId != null && !userId.isEmpty()) {
            getUser(userId);    // async fetch user
        } else {
            Toast.makeText(this, "User ID not provided", Toast.LENGTH_SHORT).show();
            navigateToMainActivity();
        }

        setUpButtons();
    }

    private void setUpButtons() {
        binding.logOut.setOnClickListener(v -> {
                    UserManager.getInstance().logout();
                    navigateToMainActivity();
                }
        );

        binding.deleteAccount.setOnClickListener(v -> new AlertDialog.Builder(UserPage.this)
                .setTitle("Delete Account")
                .setMessage("Are you sure?")
                .setPositiveButton("Yes", (dialog, which) -> {

                    handleDelete(UserManager.getInstance().getCurrentUser());
                    UserManager.getInstance().logout();

                    Toast.makeText(UserPage.this, "Deleting Account", Toast.LENGTH_SHORT).show();
                    navigateToMainActivity();

                })
                .setNegativeButton("No", null)
                .show());
    }

    private void getUser(String id) {
        userAPI.getUser(id, new UserAPI.UserCallback() {
            @Override
            public void onSuccess(User fetchedUser, String message) {
                user = fetchedUser;
                Log.i("UserPage", "Fetched user successfully");
                updateUIWithUserData();
            }

            @Override
            public void onError(String errorMessage) {
                new AlertDialog.Builder(UserPage.this)
                        .setTitle("Error Fetching user")
                        .setMessage(errorMessage)
                        .setPositiveButton("OK", (dialog, which) -> dialog.dismiss())
                        .show();

                Toast.makeText(UserPage.this, errorMessage, Toast.LENGTH_SHORT).show();
                navigateToMainActivity();
            }
        });
    }

    private void updateUIWithUserData() {
        binding.usernameProfile.setText(user.getUsername());
//        binding.userPageAvatar.setImageBitmap(user.getProfilePicture());
        loadUserVideos();
    }

    private void loadUserVideos() {
        mutableVideoList = videoApi.getUserVideos(user.get_id());

        List<VideoN> videoList = mutableVideoList.getValue();

        if (videoList == null) {
            Toast.makeText(UserPage.this, "Error loading videos", Toast.LENGTH_SHORT).show();
            Log.e("UserPage", "Error loading videos");
            navigateToMainActivity();
            return;
        }

        binding.numVideos.setText(String.valueOf(videoList.size()));

        VideosAdapter videosAdapter = new VideosAdapter(this, videoList, (RecyclerViewInterface) this);
        binding.userPageVideos.setAdapter(videosAdapter);
        binding.userPageVideos.setLayoutManager(new LinearLayoutManager(this));
    }

    private void handleDelete(User user) {
        userAPI.delete(user, new UserAPI.UserCallback() {
            @Override
            public void onSuccess(User user, String message) {
                Toast.makeText(UserPage.this, message, Toast.LENGTH_SHORT).show();
                UserManager.getInstance().logout();
                Intent intent = new Intent(UserPage.this, MainActivity.class);
                startActivity(intent);
                finish();
            }

            @Override
            public void onError(String message) {
                new AlertDialog.Builder(UserPage.this)
                        .setTitle("Error Deleting User up")
                        .setMessage(message)
                        .setPositiveButton("OK", (dialog, which) -> dialog.dismiss())
                        .show();
            }
        });
    }

    private void navigateToMainActivity() {
        Intent intent = new Intent(UserPage.this, MainActivity.class);
        startActivity(intent);
        finish();
    }

}
