package com.example.youtube_clone;


import android.app.AlertDialog;
import android.content.Intent;
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

import java.util.List;

public class UserPage extends AppCompatActivity {
    private ActivityUserPageBinding binding;
    private UserAPI userAPI;
    private VideoApi videoApi;
    private MutableLiveData<List<VideoN>> mutableVideoList;

    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        binding = ActivityUserPageBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        userAPI = new UserAPI();
        videoApi = new VideoApi();

        User user = UserManager.getInstance().getCurrentUser();        // TODO user = getUser() from server

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

                    handleDelete(UserManager.getInstance().getCurrentUser());
                    UserManager.getInstance().logout();

                    Toast.makeText(UserPage.this, "Deleting Account", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(this, MainActivity.class);
                    startActivity(intent);
                    finish();

                })
                .setNegativeButton("No", null)
                .show());


//        binding.usernameProfile.setText(user.getUsername());
//        binding.userPageAvatar.setImageBitmap(user.getProfilePicture());

        mutableVideoList = videoApi.getUserVideos(user.get_id());      // get video list

        List<VideoN> videoList = mutableVideoList.getValue();

        if (videoList == null) {
            Toast.makeText(UserPage.this, "Error loading videos", Toast.LENGTH_SHORT).show();
            Log.e("UserPage", "Error loading videos");

            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
            finish();
        }


        binding.numVideos.setText(videoList.size());

        // adapter
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

}
