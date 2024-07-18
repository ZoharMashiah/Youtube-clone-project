package com.example.youtube_clone;


import android.app.AlertDialog;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;

import com.example.youtube_clone.databinding.ActivityUserPageBinding;
import com.example.youtube_clone.databinding.EditUserPopupBinding;

import java.util.ArrayList;
import java.util.List;

public class UserPage extends AppCompatActivity implements RecyclerViewInterface {
    private ActivityUserPageBinding binding;
    private final LiveData<List<VideoN>> userVideosLiveData = null;
    private final VideosViewModel videosViewModel = ViewModelsSingelton.getInstance(getApplicationContext()).getVideosViewModel();
    private UserPageViewModel viewModel;
    private VideosAdapter videosAdapter;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityUserPageBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        init();

        String userId = getIntent().getStringExtra("userId");
        User currentUser = UserManager.getInstance().getCurrentUser();
        if (userId == null || userId.isEmpty()) {
            Log.e("UserPage", "User ID is not provided");
            navigateToMainActivity();
        }

        if (currentUser != null && currentUser.get_id().equals(userId)) {
            setUpButtons();
        }

        viewModel.loadUser(userId);
    }

    private void init() {
        viewModel = new ViewModelProvider(this).get(UserPageViewModel.class);
        videosAdapter = new VideosAdapter(this, new ArrayList<>(), this);
        binding.userPageVideos.setAdapter(videosAdapter);
        binding.userPageVideos.setLayoutManager(new LinearLayoutManager(this));
        viewModel.getUserLiveData().observe(this, this::updateUserUi);
        viewModel.getUserVideosLiveData().observe(this, this::updateVideoList);
        viewModel.getMessageLiveData().observe(this, this::showToast);
        viewModel.getUserDeletedLiveData().observe(this, this::handleUserDeletion);
    }

    private void setUpButtons() {
        binding.userPageButtons.setVisibility(View.VISIBLE);

        binding.logOut.setOnClickListener(v -> {
                    UserManager.getInstance().logout();
                    navigateToMainActivity();
                }
        );

        binding.editUser.setOnClickListener(v -> showEditUserDialog());

        binding.deleteAccount.setOnClickListener(v -> new AlertDialog.Builder(UserPage.this)
                .setTitle("Delete Account")
                .setMessage("Are you sure?")
                .setPositiveButton("Yes", (dialog, which) -> handleDelete(UserManager.getInstance().getCurrentUser()))
                .setNegativeButton("No", null)
                .show());
    }

    private void updateUserUi(User user) {
        if (user != null) {
            binding.usernameProfile.setText(user.getUsername());
            Bitmap img = FormatConverters.base64ToBitmap(user.getProfilePicture());
            binding.userPageAvatar.setImageBitmap(img);
        }
    }

    private void updateVideoList(List<VideoN> videoList) {
        if (videoList == null || videoList.isEmpty()) {
            Log.i("UserPage", "No videos found for user");
        } else {
            videosAdapter.updateVideos(videoList);
            Log.i("UserPage", "Videos loaded successfully: " + videoList.size());
        }

        binding.numVideos.setText(String.valueOf(userVideosLiveData.getValue() != null ? userVideosLiveData.getValue().size() : 0));
    }

    private void showToast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

    private void showEditUserDialog() {
        User currentUser = UserManager.getInstance().getCurrentUserLiveData().getValue();
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        EditUserPopupBinding dialogBinding = EditUserPopupBinding.inflate(getLayoutInflater());
        builder.setView(dialogBinding.getRoot());

        dialogBinding.editTextFirstName.setText(currentUser.getFirstName());
        dialogBinding.editTextLastName.setText(currentUser.getLastName());

        builder.setTitle("Edit User Details")
                .setPositiveButton("Save", (dialog, which) -> {
                    currentUser.setFirstName(dialogBinding.editTextFirstName.getText().toString());
                    currentUser.setLastName(dialogBinding.editTextLastName.getText().toString());
                    handleEdit(currentUser);
                })
                .setNegativeButton("Cancel", (dialog, which) -> dialog.cancel());

        AlertDialog dialog = builder.create();
        dialog.show();
    }

    private void handleEdit(User updatedUser) {
        viewModel.updateUser(updatedUser);
        Toast.makeText(UserPage.this, "Saved changes", Toast.LENGTH_SHORT).show();

    }

    private void handleDelete(User user) {
        viewModel.deleteUser(user);
        Toast.makeText(UserPage.this, "Your account has been deleted", Toast.LENGTH_SHORT).show();
        navigateToMainActivity();
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

    private void handleUserDeletion(Boolean isDeleted) {
        if (isDeleted) {
            UserManager.getInstance().logout();
            navigateToMainActivity();
        }
    }

    @Override
    public void onUserImageClick(VideoN video) {
        // skip because no need to navigate to the same user
    }

}
