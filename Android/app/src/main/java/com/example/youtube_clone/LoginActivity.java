package com.example.youtube_clone;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;

import com.example.youtube_clone.api.loginAPI.LoginResponse;
import com.example.youtube_clone.api.loginAPI.TokenAPI;
import com.example.youtube_clone.databinding.ActivityLoginBinding;

public class LoginActivity extends AppCompatActivity {
    private TokenAPI tokenAPI;

    private ActivityLoginBinding binding;

    private static final String PREFS_NAME = "prefs";
    private static final String PREF_DARK_MODE = "dark_mode";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        this.tokenAPI = new TokenAPI();


        this.binding = ActivityLoginBinding.inflate(getLayoutInflater());

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

        binding.submitBtn.setOnClickListener(v -> {
            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
        });

        binding.textMoveToSignup.setOnClickListener(v -> {
            Intent intent = new Intent(this, SignupActivity.class);
            startActivity(intent);
        });

        binding.submitBtn.setOnClickListener(v -> {
            String username = binding.editTextText.getText().toString();
            String password = binding.editTextTextPassword.getText().toString();
            handleLogin(username, password);

        });
    }

    private void handleLogin(String username, String password) {
        tokenAPI.loginUser(username, password, new TokenAPI.LoginCallback() {
            @Override
            public void onSuccess(LoginResponse result) {
                UserN current = result.getUser();
                String token = result.getToken();

                // Set the current user
                UserManager userManager = UserManager.getInstance();
                userManager.login(current, token);

                // Navigate to MainActivity
                Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                startActivity(intent);
                finish();
            }

            @Override
            public void onWrongCredentials() {
                showErrorDialog("Wrong username or password");
            }

            @Override
            public void onError(String message) {
                showErrorDialog(message);
            }

            @Override
            public void onFailure(String message) {
                showErrorDialog(message);
            }

            public void showErrorDialog(String message) {
                new android.app.AlertDialog.Builder(LoginActivity.this)
                        .setTitle("Login Error")
                        .setMessage(message)
                        .setPositiveButton("OK", (dialog, which) -> dialog.dismiss())
                        .show();
            }

        });
    }

}