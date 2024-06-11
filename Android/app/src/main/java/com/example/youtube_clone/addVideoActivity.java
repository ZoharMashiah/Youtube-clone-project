package com.example.youtube_clone;

import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;

import androidx.activity.EdgeToEdge;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.youtube_clone.databinding.ActivityAddVideoBinding;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;

public class addVideoActivity extends AppCompatActivity{

    private ActivityAddVideoBinding binding;

    ActivityResultLauncher<String> mTakePhoto;

    ActivityResultLauncher<String> mTakeVideo;

    Uri selectedImageUri = null;

    Uri selectedVideoUri = null;

    private final String[] categories = {"Music", "Mixes", "JavaScript", "Gaming", "Bouldering",
            "Display devices", "AI", "Computer Hardware", "Table News", "Inventions", "News", "Comedy clubs", "Skills", "3D printing"};

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
                        selectedVideoUri = o;
                    }
                }
        );

        binding.imageButtonBack.setOnClickListener(v -> {
            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
        });

        binding.imageUploadImage.setOnClickListener(v -> mTakePhoto.launch("image/*"));

        binding.imageUploadVideo.setOnClickListener(v -> mTakeVideo.launch("video/*"));

        binding.button6.setOnClickListener(v -> {
            if (!binding.editTextText.getText().toString().isEmpty() && !binding.editTextText2.getText().toString().isEmpty() && this.selectedImageUri!=null&& this.selectedVideoUri!=null) {
                Video newVideo = new Video(Videos.getInstance().getNextId(), binding.editTextText.getText().toString(), binding.editTextText2.getText().toString(),
                        Users.getInstance().currentUser.getUsername(), Users.getInstance().currentUser.getProfileImage(),
                        binding.category.getSelectedItem().toString(), Calendar.getInstance().getTime().getTime(), this.selectedImageUri,
                        0, 0, 0, new ArrayList<>(), this.selectedVideoUri);
                Videos.getInstance().videos.add(newVideo);
                Intent intent = new Intent(this, MainActivity.class);
                startActivity(intent);
            } else {
                AlertDialog.Builder builder = new AlertDialog.Builder(this);

                // Set the message show for the Alert time
                builder.setMessage("You need to fill all the fields!");

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
}