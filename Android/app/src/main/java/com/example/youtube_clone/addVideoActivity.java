package com.example.youtube_clone;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.youtube_clone.databinding.ActivityAddVideoBinding;
import com.example.youtube_clone.databinding.ActivityMainBinding;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

public class addVideoActivity extends AppCompatActivity {

    private ActivityAddVideoBinding binding;

    ActivityResultLauncher<String> mTakePhoto;

    ActivityResultLauncher<String> mTakeVideo;

    Uri selectedImageUri = null;

    Uri selectedVideoUri = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityAddVideoBinding.inflate(getLayoutInflater());

        setContentView(binding.getRoot());

        mTakePhoto =registerForActivityResult(
                new ActivityResultContracts.GetContent(),
                new ActivityResultCallback<Uri>() {
                    @Override
                    public void onActivityResult(Uri o) {
                        selectedImageUri = o;
                    }
                }
        );

        mTakeVideo =registerForActivityResult(
                new ActivityResultContracts.GetContent(),
                new ActivityResultCallback<Uri>() {
                    @Override
                    public void onActivityResult(Uri o) {
                        selectedImageUri = o;
                    }
                }
        );

        binding.imageButtonBack.setOnClickListener(v -> {
            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
        });

        binding.imageUploadImage.setOnClickListener(v -> mTakePhoto.launch("image/*"));

        binding.imageUploadVideo.setOnClickListener(v -> mTakeVideo.launch("video/*"));

        Video newVideo = new Video( 12, binding.editTextText.getText().toString(), binding.editTextText2.getText().toString(),
                "ccbcncc", "zohar",
                binding.editTextText3.getText().toString(), Calendar.getInstance().getTime(), this.selectedImageUri,
        0, 0, 0, new ArrayList<>(), this.selectedVideoUri);
    }
}