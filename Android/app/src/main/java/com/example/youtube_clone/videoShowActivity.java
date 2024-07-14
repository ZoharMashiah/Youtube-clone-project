package com.example.youtube_clone;

import android.annotation.SuppressLint;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.widget.MediaController;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.youtube_clone.databinding.ActivityVideoShowBinding;

import java.util.ArrayList;
import java.util.Calendar;

public class videoShowActivity extends AppCompatActivity implements commentRecycler, RecyclerViewInterface {

    private ActivityVideoShowBinding binding;
    private commentsAdapter[] adapter;

    @SuppressLint("SetTextI18n")

    private static final String PREFS_NAME = "prefs";
    private static final String PREF_DARK_MODE = "dark_mode";
    private final ArrayList<Video> videos = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityVideoShowBinding.inflate(getLayoutInflater());

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

        RecyclerView recyclerView = findViewById(R.id.commentsRecyclerView);

        adapter = new commentsAdapter[]{new commentsAdapter(this, Videos.getInstance().currentVideo.getComments(), this)};

        recyclerView.setAdapter(adapter[0]);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));


        int views = Videos.getInstance().currentVideo.getViews();
        long publication_date = Videos.getInstance().currentVideo.getPublication_date();
        String viewers = views > 999 ? views > 999999 ? ((views / 1000000) + "M") : ((views / 1000) + "K") : Integer.toString(views);
        long time = ((Calendar.getInstance().getTime().getTime() - publication_date) / 60000);
        String timeStr = time > 60 ? time > 1140 ? time > 43200 ? time > 525600 ? ((time / 525600) + " years ago") : ((time / 43200) + " months ago") : ((time / 1140) + " days ago") : ((time / 60) + " hours ago") : (time + " minutes ago");

        binding.title.setText(Videos.getInstance().currentVideo.getTitle());
        binding.views.setText(viewers);
        binding.description.setText(Videos.getInstance().currentVideo.getDescription());
        binding.counterLike.setText(Integer.toString(Videos.getInstance().currentVideo.getLike().size()));
        binding.counterDislike.setText(Integer.toString(Videos.getInstance().currentVideo.getDislike().size()));
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

        binding.like.setOnClickListener(v -> {
            if (Users.getInstance().currentUser != null) {
                Videos.getInstance().currentVideo.addLike(Users.getInstance().currentUser.getUsername());
                binding.counterLike.setText(Integer.toString(Videos.getInstance().currentVideo.getLike().size()));
                binding.counterDislike.setText(Integer.toString(Videos.getInstance().currentVideo.getDislike().size()));
            } else {
                AlertDialog.Builder builder = new AlertDialog.Builder(this);

                // Set the message show for the Alert time
                builder.setMessage("You need to have a user to add a like!");

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

        binding.dislike.setOnClickListener(v -> {
            if (Users.getInstance().currentUser != null) {
                Videos.getInstance().currentVideo.addDislike(Users.getInstance().currentUser.getUsername());
                binding.counterLike.setText(Integer.toString(Videos.getInstance().currentVideo.getLike().size()));
                binding.counterDislike.setText(Integer.toString(Videos.getInstance().currentVideo.getDislike().size()));
            } else {
                AlertDialog.Builder builder = new AlertDialog.Builder(this);

                // Set the message show for the Alert time
                builder.setMessage("You need to have a user to add a dislike!");

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

        binding.submitComment.setOnClickListener(v -> {
            if (Users.getInstance().currentUser != null) {
                Comment newComment = new Comment(Videos.getInstance().currentVideo.getNextId(),
                        binding.addComment.getText().toString(),
                        Users.getInstance().currentUser.getUsername(), Calendar.getInstance().getTime().getTime(),
                        Users.getInstance().currentUser.getProfileImage());

                Videos.getInstance().currentVideo.addComment(newComment);

                adapter[0] = new commentsAdapter(this, Videos.getInstance().currentVideo.getComments(), this);
                recyclerView.setAdapter(adapter[0]);
                recyclerView.setLayoutManager(new LinearLayoutManager(this));
            } else {
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

        for (Video vid : Videos.getInstance().videos) {
            if (vid.getId() != Videos.getInstance().currentVideo.getId()) {
                videos.add(vid);
            }
        }
        final VideosAdapter[] adapterVid = {new VideosAdapter(this, videos, this)};
        binding.videos.setAdapter(adapterVid[0]);
        binding.videos.setLayoutManager(new LinearLayoutManager(this));
    }

    @Override
    public void deleteElement(int position) {
        Videos.getInstance().deleteComment(Videos.getInstance().currentVideo.getComments().get(position).getId());
        adapter[0].notifyItemRemoved(position);
    }

    @Override
    public void onItemClick(Video video) {
        Videos.getInstance().currentVideo = video;
        Intent intent = new Intent(this, videoShowActivity.class);
        startActivity(intent);
    }
}