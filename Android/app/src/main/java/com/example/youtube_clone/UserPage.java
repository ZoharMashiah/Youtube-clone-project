package com.example.youtube_clone;


import android.app.AlertDialog;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.MutableLiveData;
import androidx.recyclerview.widget.LinearLayoutManager;

import com.example.youtube_clone.api.userAPI.UserAPI;
import com.example.youtube_clone.api.videoAPI.VideoApi;
import com.example.youtube_clone.databinding.ActivityUserPageBinding;
import com.example.youtube_clone.databinding.EditUserPopupBinding;

import java.util.ArrayList;
import java.util.List;

public class UserPage extends AppCompatActivity implements RecyclerViewInterface {
    private ActivityUserPageBinding binding;
    private UserAPI userAPI;
    private VideoApi videoApi;
    private VideosViewModel videosViewModel;
    private VideosAdapter videosAdapter;
    private MutableLiveData<List<VideoN>> mutableVideoList;
    private User user;

    protected void onCreate(Bundle savedInstanceState) {

        videosViewModel = ViewModelsSingelton.getInstance().getVideosViewModel();

        super.onCreate(savedInstanceState);
        binding = ActivityUserPageBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        userAPI = new UserAPI();
        videoApi = new VideoApi(mutableVideoList, null);

        String userId = getIntent().getStringExtra("userId");
        if (userId != null && !userId.isEmpty()) {
            getUser(userId);    // async fetch user
        } else {
            Log.d("UserPage", "User ID is not provided");
            navigateToMainActivity();
        }

        if (userId == null || userId.isEmpty()) {
            Log.d("UserPage", "User ID is not provided");
            navigateToMainActivity();
            return;
        }

        getUser(userId);    // async fetch user

        videosAdapter = new VideosAdapter(this, new ArrayList<>(), this);
        binding.userPageVideos.setAdapter(videosAdapter);
        binding.userPageVideos.setLayoutManager(new LinearLayoutManager(this));
    }

    private void setUpButtons() {
        binding.userPageButtons.setVisibility(View.VISIBLE);

        binding.logOut.setOnClickListener(v -> {
                    UserManager.getInstance().logout();
                    navigateToMainActivity();
                }
        );

        binding.editUser.setOnClickListener(v -> showEditUserDialog(UserManager.getInstance().getCurrentUser()));

        binding.deleteAccount.setOnClickListener(v -> new AlertDialog.Builder(UserPage.this)
                .setTitle("Delete Account")
                .setMessage("Are you sure?")
                .setPositiveButton("Yes", (dialog, which) -> handleDelete(UserManager.getInstance().getCurrentUser()))
                .setNegativeButton("No", null)
                .show());
    }

    private void getUser(String id) {
        userAPI.getUser(id, new UserAPI.UserCallback() {
            @Override
            public void onSuccess(User fetchedUser, String message) {
                user = fetchedUser;
                Log.i("UserPage", "Fetched user successfully");
                if (user != null) {
                    setUpButtons();
                }

                updateUi();
                loadUserVideos();
            }

            @Override
            public void onError(String errorMessage) {
                Toast.makeText(UserPage.this, errorMessage, Toast.LENGTH_SHORT).show();
                navigateToMainActivity();
            }
        });
    }

    private void updateUi() {
        binding.usernameProfile.setText(user.getUsername());
        Bitmap img = FormatConverters.base64ToBitmap(user.getProfilePicture());
        binding.userPageAvatar.setImageBitmap(img);
    }


    private void showEditUserDialog(User currentUser) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        EditUserPopupBinding dialogBinding = EditUserPopupBinding.inflate(getLayoutInflater());
        builder.setView(dialogBinding.getRoot());

        // Set current user details
        dialogBinding.editTextFirstName.setText(currentUser.getFirstName());
        dialogBinding.editTextMiddleName.setText(currentUser.getMiddleName());
        dialogBinding.editTextLastName.setText(currentUser.getLastName());

        builder.setTitle("Edit User Details")
                .setPositiveButton("Save", (dialog, which) -> {
                    currentUser.setFirstName(dialogBinding.editTextFirstName.getText().toString());
                    currentUser.setMiddleName(dialogBinding.editTextMiddleName.getText().toString());
                    currentUser.setLastName(dialogBinding.editTextLastName.getText().toString());
                    handleEdit(currentUser);
                })
                .setNegativeButton("Cancel", (dialog, which) -> dialog.cancel());

        AlertDialog dialog = builder.create();
        dialog.show();
    }

    private void loadUserVideos() {
        videoApi.getUserVideos(user.get_id(), new VideoApi.VideoCallback() {
            @Override
            public void onSuccess(List<VideoN> videoList) {
                Log.i("UserPage", "Videos loaded successfully");
            }

            @Override
            public void onError(String message) {
                runOnUiThread(() -> {
                    Toast.makeText(UserPage.this, "Error loading videos", Toast.LENGTH_SHORT).show();
                    Log.e("UserPage", "Error loading videos: " + message);
                });
            }
        }).observe(this, videoList -> {
            if (videoList == null || videoList.isEmpty()) {
                binding.userPageVideos.setVisibility(View.GONE);
                Toast.makeText(UserPage.this, "No videos found", Toast.LENGTH_SHORT).show();
                Log.i("UserPage", "No videos found for user");
            } else {
                binding.userPageVideos.setVisibility(View.VISIBLE);
                binding.numVideos.setText(String.valueOf(videoList.size()));
                videosAdapter.updateVideos(videoList);
            }
        });
    }


    private void handleEdit(User user) {
        userAPI.updateUser(user, new UserAPI.UserCallback() {
            @Override
            public void onSuccess(User user, String message) {
                Log.i("UserPage", "Changes to the user have been saved"); //TODO call update
            }

            @Override
            public void onError(String message) {
                Toast.makeText(UserPage.this, "Error Saving changes, try again later.", Toast.LENGTH_SHORT).show();
                Log.d("UserPage", message);
            }
        });
    }

    private void handleDelete(User user) {
        userAPI.delete(user, new UserAPI.UserCallback() {
            @Override
            public void onSuccess(User user, String message) {
                Toast.makeText(UserPage.this, "Your account has been deleted", Toast.LENGTH_SHORT).show();
                UserManager.getInstance().logout();
                navigateToMainActivity();
            }

            @Override
            public void onError(String message) {
                Toast.makeText(UserPage.this, "Error Saving changes, try again later.", Toast.LENGTH_SHORT).show();
                Log.d("UserPage", message);
            }
        });
    }

    private void navigateToMainActivity() {
        Intent intent = new Intent(UserPage.this, MainActivity.class);
        startActivity(intent);
        finish();
    }

    @Override
    public void onItemClick(VideoN video) {
        videosViewModel.setCurrentVideo(video);
        Intent intent = new Intent(this, videoShowActivity.class);
        startActivity(intent);
    }


    @Override
    public void onUserImageClick(VideoN video) {
    }
}
