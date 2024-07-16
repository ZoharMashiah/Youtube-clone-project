package com.example.youtube_clone;


import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.icu.util.Calendar;
import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.MutableLiveData;
import androidx.recyclerview.widget.LinearLayoutManager;

import com.example.youtube_clone.api.userAPI.UserAPI;
import com.example.youtube_clone.api.videoAPI.VideoApi;
import com.example.youtube_clone.databinding.ActivityUserPageBinding;
import com.example.youtube_clone.databinding.EditUserPopupBinding;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class UserPage extends AppCompatActivity {
    private ActivityUserPageBinding binding;
    private UserAPI userAPI;
    private VideoApi videoApi;
    private MutableLiveData<List<VideoN>> mutableVideoList;
    private User user;
    Bitmap img;
    ActivityResultLauncher<String> mTakePhoto;
    Uri selectedImageUri = null;

    protected void onCreate(Bundle savedInstanceState) {

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
                updateUIWithUserData();
                loadUserVideos();
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
        img = FormatConverters.base64ToBitmap(user.getProfilePicture());
        binding.userPageAvatar.setImageBitmap(img);
    }

    private void loadUserVideos() {
        mutableVideoList = videoApi.getUserVideos(user.get_id());

        List<VideoN> videoList = mutableVideoList.getValue();

        if (videoList == null) {
            Toast.makeText(UserPage.this, "Error loading videos", Toast.LENGTH_SHORT).show();
            Log.e("UserPage", "Error loading videos");
            return;
        }

        binding.numVideos.setText(String.valueOf(videoList.size()));

        VideosAdapter videosAdapter = new VideosAdapter(this, videoList, (RecyclerViewInterface) this);
        binding.userPageVideos.setAdapter(videosAdapter);
        binding.userPageVideos.setLayoutManager(new LinearLayoutManager(this));
    }

    private void showEditUserDialog(User currentUser) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        EditUserPopupBinding dialogBinding = EditUserPopupBinding.inflate(getLayoutInflater());
        builder.setView(dialogBinding.getRoot());

        // Set current user details
        dialogBinding.editTextUsername.setText(currentUser.getUsername());
        dialogBinding.editTextFirstName.setText(currentUser.getFirstName());
        dialogBinding.editTextMiddleName.setText(currentUser.getMiddleName());
        dialogBinding.editTextLastName.setText(currentUser.getLastName());
        dialogBinding.editTextPassword.setText(currentUser.getPassword());
        dialogBinding.editTextDate.setText(currentUser.getBirthDate());

        if (currentUser.getProfilePicture() != null) {
            byte[] decodedString = Base64.decode(currentUser.getProfilePicture(), Base64.DEFAULT);
            Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
            dialogBinding.editImageView.setImageBitmap(decodedByte);
        }

        // Handle date selection
        dialogBinding.editTextDate.setOnClickListener(v -> {
            Calendar calendar = Calendar.getInstance();
            int year = calendar.get(Calendar.YEAR);
            int month = calendar.get(Calendar.MONTH);
            int day = calendar.get(Calendar.DAY_OF_MONTH);

            DatePickerDialog dialog = new DatePickerDialog(this, (view, selectedYear, selectedMonth, selectedDayOfMonth) -> {
                String selectedDate = String.format(Locale.getDefault(), "%02d-%02d-%04d", selectedDayOfMonth, selectedMonth + 1, selectedYear);
                dialogBinding.editTextDate.setText(selectedDate);
            }, year, month, day);

            dialog.getDatePicker().setMaxDate(new Date().getTime());
            dialog.show();
        });

        // Handle image selection
        dialogBinding.buttonChangeImage.setOnClickListener(v -> {
            mTakePhoto.launch("image/*");
        });

        builder.setTitle("Edit User Details")
                .setPositiveButton("Save", (dialog, which) -> {
                    currentUser.setUsername(dialogBinding.editTextUsername.getText().toString());
                    currentUser.setFirstName(dialogBinding.editTextFirstName.getText().toString());
                    currentUser.setMiddleName(dialogBinding.editTextMiddleName.getText().toString());
                    currentUser.setLastName(dialogBinding.editTextLastName.getText().toString());
                    currentUser.setPassword(dialogBinding.editTextPassword.getText().toString());
                    currentUser.setBirthDate(dialogBinding.editTextDate.getText().toString());

                    if (selectedImageUri != null) {
                        try {
                            String photo = FormatConverters.imageUriToBase64(this, selectedImageUri);
                            currentUser.setProfilePicture(photo);
                        } catch (IOException e) {
                            Toast.makeText(this, "Failed to update image", Toast.LENGTH_SHORT).show();
                        }
                    }

                    handleEdit(currentUser);
                })
                .setNegativeButton("Cancel", (dialog, which) -> dialog.cancel());

        AlertDialog dialog = builder.create();
        dialog.show();
    }

    private void handleEdit(User user) {
        userAPI.updateUser(user, new UserAPI.UserCallback() {
            @Override
            public void onSuccess(User user, String message) {
                Log.i("UserPage", "Changes to the user have been saved");
            }

            @Override
            public void onError(String message) {
                new AlertDialog.Builder(UserPage.this)
                        .setTitle("Error Saving changes, try again later.")
                        .setMessage(message)
                        .setPositiveButton("OK", (dialog, which) -> dialog.dismiss())
                        .show();
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
