package com.example.youtube_clone;

import android.annotation.SuppressLint;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.util.Base64;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.MediaController;
import android.widget.Toast;
import android.widget.VideoView;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.LiveData;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.youtube_clone.api.videoAPI.VideoApi;
import com.example.youtube_clone.databinding.ActivityVideoShowBinding;
import com.example.youtube_clone.utils.Base64Utils;
import com.example.youtube_clone.utils.FileUtils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Objects;

public class videoShowActivity extends AppCompatActivity implements commentRecycler, RecyclerViewInterface {

    private ActivityVideoShowBinding binding;
    private commentsAdapter[] adapter;

    private List<CommentData> listComments;

    private commentAPI commentApi;

    @SuppressLint("SetTextI18n")

    private final ArrayList<VideoN> videos = new ArrayList<>();
    private MediaPlayer mediaPlayer;
    private VideoView videoView;

    private VideosViewModel videosViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityVideoShowBinding.inflate(getLayoutInflater());

        setContentView(binding.getRoot());

        videosViewModel = ViewModelsSingelton.getInstance().getVideosViewModel();

        videosViewModel.getCurrentVideo().observe(this, video -> {
            if (video != null) {
                LiveData<VideoN> videoNew = videosViewModel.getVideo(video.getUser()._id, video.get_id());
                if (videoNew.getValue() == null)
                    binding.title.setText("Loading...");
                videoNew.observe(this, videoN1 -> {

                    videoView = binding.video;

                    RecyclerView recyclerView = findViewById(R.id.commentsRecyclerView);

        //adapter = new commentsAdapter[]{new commentsAdapter(this, Videos.getInstance().currentVideo.getComments(), this)};

//        recyclerView.setAdapter(adapter[0]);
//        recyclerView.setLayoutManager(new LinearLayoutManager(this));


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


                    binding.like.setOnClickListener(v -> {
                        if (UserManager.getInstance().getCurrentUser() != null) {
                            binding.counterLike.setText(Integer.toString(video.getLike()));
                            binding.counterDislike.setText(Integer.toString(video.getDislike()));
                        } else {
                            AlertDialog.Builder builder = new AlertDialog.Builder(this)
                                    .setMessage("You need to have a user to add a like!")
                                    .setTitle("Alert !")
                                    .setCancelable(false)
                                    .setPositiveButton("Cancel", (dialog, which) -> {
                                        dialog.cancel();
                                    });

                            AlertDialog alertDialog = builder.create();
                            alertDialog.show();
                        }
                    });

                    binding.dislike.setOnClickListener(v -> {
                        if (UserManager.getInstance().getCurrentUser() != null) {
                            binding.counterLike.setText(Integer.toString(video.getLike()));
                            binding.counterDislike.setText(Integer.toString(video.getDislike()));
                        } else {
                            AlertDialog.Builder builder = new AlertDialog.Builder(this)
                                    .setMessage("You need to have a user to add a dislike!")
                                    .setTitle("Alert !")
                                    .setCancelable(false)
                                    .setPositiveButton("Cancel", (dialog, which) -> {
                                        dialog.cancel();
                                    });

                            AlertDialog alertDialog = builder.create();
                            alertDialog.show();
                        }
                    });

//        binding.submitComment.setOnClickListener(v -> {
//            if (Users.getInstance().currentUser != null) {
//                Comment newComment = new Comment(Videos.getInstance().currentVideo.getNextId(),
//                        binding.addComment.getText().toString(),
//                        Users.getInstance().currentUser.getUsername(), Calendar.getInstance().getTime().getTime(),
//                        Users.getInstance().currentUser.getProfileImage());
//
//                //Videos.getInstance().currentVideo.addComment(newComment);
//
//                //adapter[0] = new commentsAdapter(this, Videos.getInstance().currentVideo.getComments(), this);
//                recyclerView.setAdapter(adapter[0]);
//                recyclerView.setLayoutManager(new LinearLayoutManager(this));
//            } else {
//                AlertDialog.Builder builder = new AlertDialog.Builder(this);
//
//                // Set the message show for the Alert time
//                builder.setMessage("You need to have a user to add a comment!");
//
//                // Set Alert Title
//                builder.setTitle("Alert !");
//
//                // Set Cancelable false for when the user clicks on the outside the Dialog Box then it will remain show
//                builder.setCancelable(false);
//
//                // Set the positive button with yes name Lambda OnClickListener method is use of DialogInterface interface.
//                builder.setPositiveButton("Cancel", (DialogInterface.OnClickListener) (dialog, which) -> {
//                    // When the user click yes button then app will close
//                    dialog.cancel();
//                });
//
//                // Create the Alert dialog
//                AlertDialog alertDialog = builder.create();
//                // Show the Alert Dialog box
//                alertDialog.show();
//            }
//        });

            if(videosViewModel.getVideos().getValue() != null) {
                for (VideoN vid : videosViewModel.getVideos().getValue()) {
                    if (!vid.get_id().equals(videoN1.get_id())) {
                        videos.add(vid);
                    }
                }
        final VideosAdapter[] adapterVid = {new VideosAdapter(this, videos, this)};
        binding.videos.setAdapter(adapterVid[0]);
        binding.videos.setLayoutManager(new LinearLayoutManager(this));
        }
        });}});}

    @Override
    public void deleteElement(int position) {
        //Videos.getInstance().deleteComment(Videos.getInstance().currentVideo.getComments().get(position).getId());
        adapter[0].notifyItemRemoved(position);
    }

    @Override
    public void onItemClick(VideoN video) {
        videosViewModel.setCurrentVideo(video);
    }

    public byte[] decodeBase64(String base64String) {
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

    private void showAlertDialog(String title, String description, VideoN videoN) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);

        LinearLayout layout = new LinearLayout(this);
        layout.setOrientation(LinearLayout.VERTICAL);

        EditText titleEditText = new EditText(this);
        titleEditText.setText(title);
        titleEditText.setHint("Enter title");
        layout.addView(titleEditText);

        EditText descriptionEditText = new EditText(this);
        descriptionEditText.setText(description);
        descriptionEditText.setHint("Enter description");
        layout.addView(descriptionEditText);

        builder.setView(layout);

        builder.setPositiveButton("Save", (dialogInterface, i) -> {
            videoN.setTitle(titleEditText.getText().toString());
            videoN.setDescription(descriptionEditText.getText().toString());
            videosViewModel.editVideo(videoN.getUser()._id, videoN.get_id(), videoN);
            binding.title.setText(titleEditText.getText().toString());
            binding.description.setText(descriptionEditText.getText().toString());
            videosViewModel.reload();
        });

        builder.setNegativeButton("Cancel", (dialogInterface, i) -> {
            dialogInterface.dismiss();
        });

        AlertDialog dialog = builder.create();
        dialog.show();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mediaPlayer != null) {
            mediaPlayer.release();
        }
    }
}
