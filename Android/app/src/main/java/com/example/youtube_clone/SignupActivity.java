package com.example.youtube_clone;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.Instrumentation;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import androidx.activity.EdgeToEdge;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.youtube_clone.databinding.ActivityLoginBinding;
import com.example.youtube_clone.databinding.ActivitySignupBinding;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class SignupActivity extends AppCompatActivity {

    // One Button
    ActivityResultLauncher<String> mTakePhoto;
    Uri selectedImageUri = null;

    private DatePickerDialog datePickerDialog;

    private Button dateButton;

    private ActivitySignupBinding binding;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivitySignupBinding.inflate(getLayoutInflater());
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

        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        binding.editTextDate.setText(dateFormat.format(date));

        binding.imageUploadImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mTakePhoto.launch("image/*");
            }
        });

        binding.submitBtn.setOnClickListener(v -> {
            Intent intent = new Intent(this, LoginActivity.class);
//            intent.putExtra("newUser", new User(binding.editTextUsername.getText().toString(),
//                    binding.editTextFirstName.getText().toString(), binding.editTextMiddleName.getText().toString(),
//                    binding.editTextLastName.getText().toString(), binding.editTextPassword.getText().toString(),
//                    new Date(binding.editTextDate), selectedImageUri));
        });

        dateButton = binding.editTextDate;
    }


}






