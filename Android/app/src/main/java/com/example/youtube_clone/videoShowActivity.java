package com.example.youtube_clone;

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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityVideoShowBinding.inflate(getLayoutInflater());

        setContentView(binding.getRoot());

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