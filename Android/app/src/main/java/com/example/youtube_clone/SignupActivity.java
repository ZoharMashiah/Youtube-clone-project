package com.example.youtube_clone;

import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;
import android.widget.DatePicker;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;

import com.example.youtube_clone.api.userAPI.UserAPI;
import com.example.youtube_clone.databinding.ActivitySignupBinding;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class SignupActivity extends AppCompatActivity {

    // One Button
    ActivityResultLauncher<String> mTakePhoto;
    Uri selectedImageUri = null;

    private UserAPI userAPI;
    private ActivitySignupBinding binding;

    private static final String PREFS_NAME = "prefs";
    private static final String PREF_DARK_MODE = "dark_mode";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        this.userAPI = new UserAPI();
        binding = ActivitySignupBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // Load the saved theme preference
        SharedPreferences preferences = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
        boolean isDarkMode = preferences.getBoolean(PREF_DARK_MODE, false);
        if (isDarkMode) {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
        } else {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        }

        binding.themeToggleButton.setOnClickListener(v -> {
            // Toggle dark mode
            boolean isDarkMode1 = (AppCompatDelegate.getDefaultNightMode() == AppCompatDelegate.MODE_NIGHT_YES);
            if (isDarkMode1) {
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
            } else {
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
            }

            // Save the theme preference
            SharedPreferences.Editor editor = preferences.edit();
            editor.putBoolean(PREF_DARK_MODE, !isDarkMode1);
            editor.apply();
        });


        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        final Calendar calendar = Calendar.getInstance();
        final int year = calendar.get(Calendar.YEAR);
        final int month = calendar.get(Calendar.MONTH);
        final int day = calendar.get(Calendar.DAY_OF_MONTH);
        final String[] dateStr = new String[1];
        binding.editTextDate.setText(dateFormat.format(date));
        binding.editTextDate.setOnClickListener(v -> {
            DatePickerDialog dialog = new DatePickerDialog(SignupActivity.this, new DatePickerDialog.OnDateSetListener() {
                @Override
                public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
                    month = month + 1;
                    dateStr[0] = dayOfMonth + "-" + month + "-" + year;
                    binding.editTextDate.setText(dateStr[0]);
                }
            }, year, month, day);
            dialog.getDatePicker().setMaxDate(new Date().getTime());
            dialog.show();
        });

        binding.imageUploadImage.setOnClickListener(v -> mTakePhoto.launch("image/*"));
        mTakePhoto = registerForActivityResult(
                new ActivityResultContracts.GetContent(),
                result -> {
                    if (result != null) {
                        selectedImageUri = result;
                        binding.imageUploadImage.setImageURI(selectedImageUri);
                    }
                }
        );

        binding.submitBtn.setOnClickListener(v -> {
            String username = binding.editTextUsername.getText().toString();
            String firstName = binding.editTextFirstName.getText().toString();
            String middleName = binding.editTextMiddleName.getText().toString();
            String lastName = binding.editTextLastName.getText().toString();
            String password = binding.editTextPassword.getText().toString();
            String birthDate = dateStr[0];
            String photo = null;
            boolean darkMode = false;   // TODO get current darkmode

            if (username.isEmpty() || firstName.isEmpty() || middleName.isEmpty()
                    || lastName.isEmpty() || password.isEmpty() || birthDate == null || birthDate.isEmpty()) {
                String message = "You need to fill all the fields, and the password should have at least 2 letters, 2 numbers and 8 characters!";
                new android.app.AlertDialog.Builder(this)
                        .setTitle("Login Error")
                        .setMessage(message)
                        .setPositiveButton("OK", (dialog, which) -> dialog.dismiss())
                        .show();
            } else {
                if (selectedImageUri != null) {
                    InputStream inputStream = null;
                    try {
                        inputStream = getContentResolver().openInputStream(selectedImageUri);
                        Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
                        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                        bitmap.compress(Bitmap.CompressFormat.JPEG, 50, byteArrayOutputStream);
                        byte[] byteArray = byteArrayOutputStream.toByteArray();
                        photo = Base64.encodeToString(byteArray, Base64.DEFAULT);
                    } catch (IOException e) {
                        e.printStackTrace();
                        Toast.makeText(this, "Failed to upload image, but the user has been created.", Toast.LENGTH_SHORT).show();
                    } finally {
                        try {
                            inputStream.close();
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    }
                }
                UserN newUser = new UserN(username, password, firstName, middleName, lastName, birthDate, photo, darkMode);
                handleSignUp(newUser);
            }
        });
    }

    private void handleSignUp(UserN newUser) {
        userAPI.signUp(newUser, new UserAPI.UserCallback() {
            @Override
            public void onSuccess(UserN user) {
                // navigate to MainActivity
                Intent intent = new Intent(SignupActivity.this, LoginActivity.class);
                startActivity(intent);
                finish();
            }

            @Override
            public void onError(String message) {
                new AlertDialog.Builder(SignupActivity.this)
                        .setTitle("Error signing up")
                        .setMessage(message)
                        .setPositiveButton("OK", (dialog, which) -> dialog.dismiss())
                        .show();
            }
        });
    }
}






