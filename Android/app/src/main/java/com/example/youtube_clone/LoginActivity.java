package com.example.youtube_clone;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.youtube_clone.api.loginAPI.TokenAPI;
import com.example.youtube_clone.api.loginAPI.TokenResponse;
import com.example.youtube_clone.databinding.ActivityLoginBinding;

public class LoginActivity extends AppCompatActivity {
    private TokenAPI tokenAPI;

    private ActivityLoginBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        this.tokenAPI = new TokenAPI();
        this.binding = ActivityLoginBinding.inflate(getLayoutInflater());

        setContentView(binding.getRoot());

        binding.loginBtn.setOnClickListener(v -> {
            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
        });
        binding.loginBtn.setEnabled(true);
        binding.loginBtn.setText(R.string.login);

        binding.textMoveToSignup.setOnClickListener(v -> {
            Intent intent = new Intent(this, SignupActivity.class);
            startActivity(intent);
        });

        binding.loginBtn.setOnClickListener(v -> {
            String username = binding.editTextText.getText().toString();
            String password = binding.editTextTextPassword.getText().toString();
            handleLogin(username, password);
        });
    }

    private void handleLogin(String username, String password) {
        binding.loginBtn.setEnabled(false);
        binding.loginBtn.setText(R.string.Logging_in);

        tokenAPI.loginUser(username, password, new TokenAPI.LoginCallback() {
            @Override
            public void onSuccess(TokenResponse result) {
                runOnUiThread(() -> {
                    Log.d("LoginActivity", "Handle Login succeeded");

                    User current = result.getUser();
                    String token = result.getToken();

                    // set the current user
                    UserManager userManager = UserManager.getInstance();
                    userManager.login(current, token);
                    String message = "Hello " + current.getUsername() + "!";
                    Toast.makeText(LoginActivity.this, message, Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                });
            }

            @Override
            public void onError(String message) {
                new android.app.AlertDialog.Builder(LoginActivity.this)
                        .setTitle("Login Error")
                        .setMessage(message)
                        .setPositiveButton("OK", (dialog, which) -> dialog.dismiss())
                        .show();
            }
        });
    }

}