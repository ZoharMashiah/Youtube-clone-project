package com.example.youtube_clone;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.Instrumentation;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.ImageView;

import androidx.activity.EdgeToEdge;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.youtube_clone.databinding.ActivityLoginBinding;
import com.example.youtube_clone.databinding.ActivitySignupBinding;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

public class SignupActivity extends AppCompatActivity {

    // One Button
    ActivityResultLauncher<String> mTakePhoto;
    Uri selectedImageUri = null;


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
                    dateStr[0] = dayOfMonth + "/"+month+"/"+year;
                    binding.editTextDate.setText(dateStr[0]);
                }
            }, year, month, day);
            dialog.getDatePicker().setMaxDate(new Date().getTime());
            dialog.show();
        });

        binding.imageUploadImage.setOnClickListener(v -> mTakePhoto.launch("image/*"));

        binding.submitBtn.setOnClickListener(v -> {
            String username = binding.editTextUsername.getText().toString();
            String firstName = binding.editTextFirstName.getText().toString();
            String middleName = binding.editTextMiddleName.getText().toString();
            String lastName = binding.editTextLastName.getText().toString();
            String password = binding.editTextPassword.getText().toString();
            String birthDate = dateStr[0];

            if(!username.isEmpty() && Users.getInstance().getUser(username) == null && checkVallid(password)&&
                    !firstName.isEmpty() && !lastName.isEmpty()) {
                Intent intent = new Intent(this, LoginActivity.class);
                Users users = Users.getInstance();
                User newUser = new User(username, firstName, middleName, lastName, password, birthDate, selectedImageUri);
                users.users.add(newUser);
                startActivity(intent);
            } else {
                AlertDialog.Builder builder = new AlertDialog.Builder(this);

                // Set the message show for the Alert time
                builder.setMessage("You need to fill all the fields and the password should be with 2 letters 2 numbers and with at least 8 chars!");

                // Set Alert Title
                builder.setTitle("Alert !");

                // Set Cancelable false for when the user clicks on the outside the Dialog Box then it will remain show
                builder.setCancelable(false);

                // Set the positive button with yes name Lambda OnClickListener method is use of DialogInterface interface.
                builder.setPositiveButton("Cancel", (DialogInterface.OnClickListener) (dialog, which) -> {
                    // When the user click yes button then app will close
                    dialog.cancel();
                });

                // Create the Alert dialog
                AlertDialog alertDialog = builder.create();
                // Show the Alert Dialog box
                alertDialog.show();
            }
        });
    }

    private boolean checkVallid(String password) {
        int countNum = 0, countLetter = 0;

        for (int i = 0; i< password.length(); i++){
            char c = password.charAt(i);
            if((c >= 'a' && c<= 'z') || (c >= 'A' && c<= 'Z'))
                countLetter++;
            else if(c >= '0' && c <= '9')
                countNum++;
        }

        return countLetter >= 2 && countNum >= 2 && password.length() >= 8;
    }


}






