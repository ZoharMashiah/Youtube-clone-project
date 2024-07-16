package com.example.youtube_clone;

import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;

import com.example.youtube_clone.api.userAPI.UserAPI;
import com.example.youtube_clone.databinding.ActivitySignupBinding;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class SignupActivity extends AppCompatActivity {

    // One Button
    ActivityResultLauncher<String> mTakePhoto;
    Uri selectedImageUri = null;
    String selectedDate;


    private UserAPI userAPI;
    private ActivitySignupBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        this.userAPI = new UserAPI();
        binding = ActivitySignupBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy", Locale.getDefault());
        Date currentDate = new Date();
        selectedDate = dateFormat.format(currentDate);
        binding.editTextDate.setText(selectedDate);

        binding.editTextDate.setOnClickListener(v -> {
            Calendar calendar = Calendar.getInstance();
            int year = calendar.get(Calendar.YEAR);
            int month = calendar.get(Calendar.MONTH);
            int day = calendar.get(Calendar.DAY_OF_MONTH);

            DatePickerDialog dialog = new DatePickerDialog(SignupActivity.this, (view, selectedYear, selectedMonth, selectedDayOfMonth) -> {
                selectedDate = String.format(Locale.getDefault(), "%02d-%02d-%04d", selectedDayOfMonth, selectedMonth, selectedYear);
                binding.editTextDate.setText(selectedDate);
            }, year, month, day);

            dialog.getDatePicker().setMaxDate(currentDate.getTime());
            dialog.show();
        });

        binding.uploadImage.setOnClickListener(v -> mTakePhoto.launch("image/*"));
        mTakePhoto = registerForActivityResult(
                new ActivityResultContracts.GetContent(),
                result -> {
                    if (result != null) {
                        binding.uploadImage.clearColorFilter();
                        selectedImageUri = result;
                        binding.uploadImage.setImageURI(selectedImageUri);
                    }
                }
        );

        binding.loginBtn.setOnClickListener(v -> {
            String username = binding.editTextUsername.getText().toString();
            String firstName = binding.editTextFirstName.getText().toString();
            String middleName = binding.editTextMiddleName.getText().toString();
            String lastName = binding.editTextLastName.getText().toString();
            String password = binding.editTextPassword.getText().toString();
            String birthDate = selectedDate;
            String photo = null;
            boolean darkMode = DarkModeUtils.isDarkMode();

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
                    try {
                        photo = FormatConverters.imageUriToBase64(this, selectedImageUri);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }

                User newUser = new User(username, password, firstName, middleName, lastName, birthDate, photo, darkMode);
                handleSignUp(newUser);
            }
        });
    }

    private void handleSignUp(User newUser) {
        userAPI.signUp(newUser, new UserAPI.UserCallback() {
            @Override
            public void onSuccess(User user, String message) {
                Toast.makeText(SignupActivity.this, message, Toast.LENGTH_SHORT).show();
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






