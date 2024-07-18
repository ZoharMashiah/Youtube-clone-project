package com.example.youtube_clone;

import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.example.youtube_clone.databinding.ActivityAddVideoBinding;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;

public class addVideoActivity extends AppCompatActivity implements
        AdapterView.OnItemSelectedListener {

    private UserPageViewModel userPageViewModel;

    private ActivityAddVideoBinding binding;

    ActivityResultLauncher<String> mTakePhoto;

    ActivityResultLauncher<String> mTakeVideo;

    Uri selectedImageUri = null;
    String selectedImage;

    Uri selectedVideoUri = null;
    String selectedVideo;

    private final String[] categories = {"Music", "Mixes", "JavaScript", "Gaming", "Bouldering",
            "Display devices", "AI", "Computer Hardware", "Table News", "Inventions", "News", "Comedy clubs", "Skills", "3D printing"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityAddVideoBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        userPageViewModel = new UserPageViewModel();

        mTakePhoto = registerForActivityResult(
                new ActivityResultContracts.GetContent(),
                o -> selectedImageUri = o
        );

        mTakeVideo = registerForActivityResult(
                new ActivityResultContracts.GetContent(),
                new ActivityResultCallback<Uri>() {
                    @Override
                    public void onActivityResult(Uri o) {
                        selectedVideoUri = o;
                    }
                }
        );


        binding.uploadImage.setOnClickListener(v -> mTakePhoto.launch("image/*"));

        binding.imageUploadVideo.setOnClickListener(v -> mTakeVideo.launch("video/*"));

        Spinner spin = (Spinner) findViewById(R.id.category);
        spin.setOnItemSelectedListener(this);

        //Creating the ArrayAdapter instance having the country list
        ArrayAdapter<String> aa = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, categories);
        aa.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        //Setting the ArrayAdapter data on the Spinner
        spin.setAdapter(aa);

        binding.button6.setOnClickListener(v -> {
            if (!binding.editTextText.getText().toString().isEmpty() && !binding.editTextText2.getText().toString().isEmpty() && this.selectedImageUri != null && this.selectedVideoUri != null) {
                try {
                    selectedImage = FormatConverters.imageUriToBase64(this, selectedImageUri);
                    selectedVideo = FormatConverters.videoUriToBase64(this, selectedVideoUri);
                } catch (IOException e) {
                    e.printStackTrace();
                    Toast.makeText(this, "Failed to upload image, but the user has been created.", Toast.LENGTH_SHORT).show();
                }

                User user = UserManager.getInstance().getCurrentUser();
                VideoN videoN = new VideoN(null, user.get_id(), new SmallUser(user.get_id(), user.getUsername(), user.getProfilePicture()),
                        binding.editTextText.getText().toString(), binding.editTextText2.getText().toString(), binding.category.getSelectedItem().toString(), Calendar.getInstance().getTime(), 0, 0, 0, new ArrayList<>(),
                        selectedImage, selectedVideo);
                userPageViewModel.addVideoToUserList(videoN);  // add to the user page using live view
                ViewModelsSingelton.getInstance().getVideosViewModel().add(UserManager.getInstance().getCurrentUser().get_id(), videoN);
                ViewModelsSingelton.getInstance().getVideosViewModel().reload();
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

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {

    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }
}