package com.example.youtube_clone;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.youtube_clone.databinding.ActivityAddVideoBinding;
import com.example.youtube_clone.databinding.ActivityVideoShowBinding;

public class videoShowActivity extends AppCompatActivity {

    private ActivityVideoShowBinding binding;

    @SuppressLint("SetTextI18n")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityVideoShowBinding.inflate(getLayoutInflater());

        setContentView(binding.getRoot());

        binding.title.setText(Videos.getInstance().currentVideo.getTitle());
        binding.views.setText(Integer.toString(Videos.getInstance().currentVideo.getViews()));
        binding.description.setText(Videos.getInstance().currentVideo.getDescription());
        binding.counterLike.setText(Integer.toString(Videos.getInstance().currentVideo.getLike()));
        binding.counterDislike.setText(Integer.toString(Videos.getInstance().currentVideo.getDislike()));
        binding.video.setVideoURI(Videos.getInstance().currentVideo.getVideo());

        binding.imageButtonAdd.setOnClickListener(v -> {
            Intent intent = new Intent(this, addVideoActivity.class);
            startActivity(intent);
        });

        binding.imageButtonHome.setOnClickListener(v -> {
            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
        });

    }
}