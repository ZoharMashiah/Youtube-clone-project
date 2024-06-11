package com.example.youtube_clone;

import android.annotation.SuppressLint;
import android.content.DialogInterface;
import android.content.Intent;
import android.widget.MediaController;
import android.net.Uri;
import android.os.Bundle;
import android.widget.MediaController;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.youtube_clone.databinding.ActivityAddVideoBinding;
import com.example.youtube_clone.databinding.ActivityVideoShowBinding;

import java.util.Calendar;

public class videoShowActivity extends AppCompatActivity {

    private ActivityVideoShowBinding binding;

    @SuppressLint("SetTextI18n")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityVideoShowBinding.inflate(getLayoutInflater());

        setContentView(binding.getRoot());

        RecyclerView recyclerView = findViewById(R.id.commentsRecyclerView);

        final commentsAdapter[] adapter = {new commentsAdapter(this,Videos.getInstance().currentVideo.getComments())};

        recyclerView.setAdapter(adapter[0]);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));


        int views = Videos.getInstance().currentVideo.getViews();
        long publication_date = Videos.getInstance().currentVideo.getPublication_date();
        String viewers = views > 999 ? views > 999999 ? ((views / 1000000) + "M") : ((views / 1000) + "K") : Integer.toString(views);
        long time = ((Calendar.getInstance().getTime().getTime() - publication_date) / 60000);
        String timeStr = time > 60? time > 1140?time>43200?time >525600? ((time/525600) +" years ago"):((time/43200) +" monthes ago"):((time/1140) +" days ago"):((time/60) +" hours ago"):(time +" minuets ago");

        binding.title.setText(Videos.getInstance().currentVideo.getTitle());
        binding.views.setText(viewers);
        binding.description.setText(Videos.getInstance().currentVideo.getDescription());
        binding.counterLike.setText(Integer.toString(Videos.getInstance().currentVideo.getLike()));
        binding.counterDislike.setText(Integer.toString(Videos.getInstance().currentVideo.getDislike()));
        binding.video.setVideoURI(Videos.getInstance().currentVideo.getVideo());
//        MediaController mediaController = new MediaController(this);
//        binding.video.setMediaController(mediaController);
//        mediaController.setAnchorView(binding.video);
        binding.video.start();
        binding.date.setText(timeStr);

        Uri videoUri = Videos.getInstance().currentVideo.getVideo();
        if (videoUri != null) {
            binding.video.setVideoURI(videoUri);
            MediaController mediaController = new MediaController(this);
            binding.video.setMediaController(mediaController);
            mediaController.setAnchorView(binding.video);

            // Start the video
            binding.video.start();
        } else {
            Toast.makeText(this, "Video URI is not available", Toast.LENGTH_SHORT).show();
        }

        binding.imageButtonHomeOriginal.setOnClickListener(v -> {
            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
        });

        binding.submitComment.setOnClickListener(v -> {
            if(Users.getInstance().currentUser != null) {
                Comment newComment = new Comment(Videos.getInstance().currentVideo.getNextId(),
                        binding.addComment.getText().toString(),
                        Users.getInstance().currentUser.getUsername(), Calendar.getInstance().getTime().getTime(),
                        Users.getInstance().currentUser.getProfileImage());

                Videos.getInstance().currentVideo.addComment(newComment);

                adapter[0] = new commentsAdapter(this, Videos.getInstance().currentVideo.getComments());
                recyclerView.setAdapter(adapter[0]);
                recyclerView.setLayoutManager(new LinearLayoutManager(this));
            }else{
                AlertDialog.Builder builder = new AlertDialog.Builder(this);

                // Set the message show for the Alert time
                builder.setMessage("You need to have a user to add a comment!");

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