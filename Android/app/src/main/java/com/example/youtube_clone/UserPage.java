package com.example.youtube_clone;


import android.app.AlertDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.youtube_clone.api.userAPI.UserAPI;
import com.example.youtube_clone.databinding.ActivityUserPageBinding;

public class UserPage extends AppCompatActivity {
    private ActivityUserPageBinding binding;
    private UserAPI userAPI;

    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        binding = ActivityUserPageBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        userAPI = new UserAPI();

        Log.d("UserPage", "onCreate started");
        Log.d("UserPage", "UserManager instance: " + UserManager.getInstance());
        UserN currentUser = UserManager.getInstance().getCurrentUser();
        Log.d("UserPage", "Current user: " + currentUser);
        if (currentUser != null) {
            Log.d("UserPage", "User ID: " + currentUser.get_id());
        }
        Log.d("UserPage", "About to check user ID equality");

        UserN user = UserManager.getInstance().getCurrentUser();        // TODO user = getUser() from server

        if (user != null) {
            if (user.get_id().equals(UserManager.getInstance().getCurrentUser().get_id())) {
                binding.userPageButtons.setVisibility(View.VISIBLE);
            }
        }


        binding.logOut.setOnClickListener(v -> {
                    UserManager.getInstance().logout();
                    Intent intent = new Intent(this, MainActivity.class);
                    startActivity(intent);
                    finish();
                }
        );

        binding.deleteAccount.setOnClickListener(v -> new AlertDialog.Builder(UserPage.this)
                .setTitle("Delete Account")
                .setMessage("Are you sure?")
                .setPositiveButton("Yes", (dialog, which) -> {
                    // Perform action here
                    // delete
                    handleDelete(UserManager.getInstance().getCurrentUser());

                    UserManager.getInstance().logout();
                    Toast.makeText(UserPage.this, "Deleting Account", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(this, MainActivity.class);
                    startActivity(intent);
                    finish();

                })
                .setNegativeButton("No", null)
                .show());

        binding.usernameProfile.setText(user.getUsername());
//        binding.userPageAvatar.setImageBitmap(user.getProfilePicture());
//        List<VideoN> videoList = user.getVideos();
//        binding.numVideos.setText(videoList.size());
    }

    private void handleDelete(UserN newUser) {
        userAPI.delete(newUser, new UserAPI.UserCallback() {
            @Override
            public void onSuccess(UserN user, String message) {
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

}
