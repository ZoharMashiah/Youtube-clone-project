package com.example.youtube_clone;

import android.annotation.SuppressLint;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;
import android.widget.MediaController;
import android.widget.Toast;
import android.widget.VideoView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.lifecycle.MutableLiveData;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.youtube_clone.api.commentAPI.commentAPI;
import com.example.youtube_clone.api.videoAPI.VideoApi;
import com.example.youtube_clone.databinding.ActivityVideoShowBinding;
import com.example.youtube_clone.utils.Base64Utils;
import com.example.youtube_clone.utils.FileUtils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;

public class videoShowActivity extends AppCompatActivity implements commentRecycler, RecyclerViewInterface {

    private ActivityVideoShowBinding binding;
    private commentsAdapter[] adapter;

    private List<CommentData> listComments;

    private commentAPI commentApi;

    @SuppressLint("SetTextI18n")

    private static final String PREFS_NAME = "prefs";
    private static final String PREF_DARK_MODE = "dark_mode";
    private final ArrayList<VideoN> videos = new ArrayList<>();
    private MediaPlayer mediaPlayer;
    private VideoView videoView;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityVideoShowBinding.inflate(getLayoutInflater());

        setContentView(binding.getRoot());

        VideoApi videoApi = new VideoApi();

        MutableLiveData<VideoN> videoN = videoApi.getVideo(Videos.getInstance().currentVideo.getUser()._id, Videos.getInstance().currentVideo.get_id());
        if(videoN.getValue() == null)
            binding.title.setText("Loding...");
        videoN.observe(this, videoN1 -> {

        // Load the saved theme preference
        SharedPreferences preferences = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
        boolean isDarkMode = preferences.getBoolean(PREF_DARK_MODE, false);
        if (isDarkMode) {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
        } else {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        }

//        binding.themeToggleButton.setOnClickListener(v -> {
//            // Toggle dark mode
//            boolean isDarkMode1 = (AppCompatDelegate.getDefaultNightMode() == AppCompatDelegate.MODE_NIGHT_YES);
//            if (isDarkMode1) {
//                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
//            } else {
//                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
//            }
//
//            // Save the theme preference
//            SharedPreferences.Editor editor = preferences.edit();
//            editor.putBoolean(PREF_DARK_MODE, !isDarkMode1);
//            editor.apply();
//        });
        videoView = binding.video;

        RecyclerView recyclerView = findViewById(R.id.commentsRecyclerView);

        commentApi = new commentAPI();
        commentApi.getLocalComments().observe(this,v->{
            adapter = new commentsAdapter[]{new commentsAdapter(this, v , this)};
            listComments = v;
            recyclerView.setAdapter(adapter[0]);
            recyclerView.setLayoutManager(new LinearLayoutManager(this));
        });
            commentApi.getAllComments(Videos.getInstance().currentVideo.getUser().get_id(), Videos.getInstance().currentVideo.get_id());


        int views = videoN1.getViews();
        long publication_date = videoN1.getPublication_date().getTime();
        String viewers = views > 999 ? views > 999999 ? ((views / 1000000) + "M") : ((views / 1000) + "K") : Integer.toString(views);
        long time = ((Calendar.getInstance().getTime().getTime() - publication_date) / 60000);
        String timeStr = time > 60 ? time > 1140 ? time > 43200 ? time > 525600 ? ((time / 525600) + " years ago") : ((time / 43200) + " months ago") : ((time / 1140) + " days ago") : ((time / 60) + " hours ago") : (time + " minutes ago");

        binding.title.setText(videoN1.getTitle());
        binding.views.setText(viewers + " views");
        binding.description.setText(videoN1.getDescription());
        binding.counterLike.setText(Integer.toString(videoN1.getLike()));
        binding.counterDislike.setText(Integer.toString(videoN1.getDislike()));
//        binding.video.setVideo(ByteArrayInputStream(decodeBase64(Videos.getInstance().currentVideo.getVideo())));
        try {
            byte[] decodedBytes = Base64Utils.decodeBase64(videoN1.video);
            File videoFile = FileUtils.saveVideoToFile(this, decodedBytes);
            playVideo(videoFile);
        } catch (IOException e) {
            e.printStackTrace();
            Toast.makeText(this, "Failed to process video", Toast.LENGTH_LONG).show();
        }
        binding.video.start();
        binding.date.setText(timeStr);

//        binding..setOnClickListener(v -> {
//            Intent intent = new Intent(this, MainActivity.class);
//            startActivity(intent);
//        });

        binding.like.setOnClickListener(v -> {
            if (Users.getInstance().currentUser != null) {
                //Videos.getInstance().currentVideo.addLike(Users.getInstance().currentUser.getUsername());
                binding.counterLike.setText(Integer.toString(Videos.getInstance().currentVideo.getLike()));
                binding.counterDislike.setText(Integer.toString(Videos.getInstance().currentVideo.getDislike()));
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
                //Videos.getInstance().currentVideo.addDislike(Users.getInstance().currentUser.getUsername());
                binding.counterLike.setText(Integer.toString(Videos.getInstance().currentVideo.getLike()));
                binding.counterDislike.setText(Integer.toString(Videos.getInstance().currentVideo.getDislike()));
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
            if (UserManager.getInstance().getCurrentUser() != null) {
                CommentData newComment = new CommentData("",
                        Videos.getInstance().currentVideo.get_id(),
                        new ArrayList<>(),
                new SmallUser(UserManager.getInstance().getCurrentUser().get_id(),UserManager.getInstance().getCurrentUser().getUsername(),
                        UserManager.getInstance().getCurrentUser().getProfilePicture()),
                binding.addComment.getText().toString(),
                Calendar.getInstance().getTime().getTime());
                commentApi.postComment(Videos.getInstance().currentVideo.getUser().get_id(),
                        Videos.getInstance().currentVideo.get_id(),
                        newComment);


                //Videos.getInstance().currentVideo.addComment(newComment);

                //adapter[0] = new commentsAdapter(this, Videos.getInstance().currentVideo.getComments(), this);
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

            if(videoApi.getVideos().getValue() != null) {
                for (VideoN vid : Objects.requireNonNull(videoApi.getVideos().getValue())) {
                    if (vid.get_id() != Videos.getInstance().currentVideo.get_id()) {
                        videos.add(vid);
                    }
                }
        final VideosAdapter[] adapterVid = {new VideosAdapter(this, videos, this)};
        binding.videos.setAdapter(adapterVid[0]);
        binding.videos.setLayoutManager(new LinearLayoutManager(this));
        }
        });}

    @Override
    public void deleteElement(int position) {
       commentApi.deleteComment(Videos.getInstance().currentVideo.getUser().get_id(),
               Videos.getInstance().currentVideo.get_id(),
               listComments.get(position).get_id());
        adapter[0].notifyItemRemoved(position);
    }

    @Override
    public void onItemClick(VideoN video) {
//        Videos.getInstance().currentVideo = video;
        Intent intent = new Intent(this, videoShowActivity.class);
        startActivity(intent);
    }
    public byte[] decodeBase64(String base64String) {
        // Remove the prefix if it exists (e.g., "data:video/mp4;base64,")
        if (base64String.contains(",")) {
            base64String = base64String.split(",")[1];
        }
        return Base64.decode(base64String, Base64.DEFAULT);
    }

    private void playVideo(File videoFile) {
        if (videoFile.exists()) {
            videoView.setVideoPath(videoFile.getAbsolutePath());
            MediaController mediaController = new MediaController(this);
            binding.video.setMediaController(mediaController);
            mediaController.setAnchorView(binding.video);

            // Start the video
            binding.video.start();
        } else {
            Toast.makeText(this, "Video file not found", Toast.LENGTH_LONG).show();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mediaPlayer != null) {
            mediaPlayer.release();
        }
    }
}
