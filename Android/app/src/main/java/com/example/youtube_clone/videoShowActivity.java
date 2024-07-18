package com.example.youtube_clone;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.service.voice.VoiceInteractionSession;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.MediaController;
import android.widget.Toast;
import android.widget.VideoView;
import android.window.OnBackInvokedDispatcher;

import androidx.activity.OnBackPressedCallback;
import androidx.activity.OnBackPressedDispatcher;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.os.BuildCompat;
import androidx.lifecycle.LiveData;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

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

    @SuppressLint("SetTextI18n")

    private final ArrayList<VideoN> videos = new ArrayList<>();
    private MediaPlayer mediaPlayer;
    private VideoView videoView;

    private VideosViewModel videosViewModel;
    private VoiceInteractionSession onBackPressedDispatcher;

    @SuppressLint("SetTextI18n")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityVideoShowBinding.inflate(getLayoutInflater());

        setContentView(binding.getRoot());

        videosViewModel = ViewModelsSingelton.getInstance(getApplicationContext()).getVideosViewModel();

        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                videosViewModel.reload();
                finish();
            }
        });

        videosViewModel.getCurrentVideo().observe(this, video -> {
            if (video != null) {
                LiveData<VideoN> videoNew = videosViewModel.getVideo(video.getUser()._id, video.get_id());
                if (videoNew.getValue() == null)
                    binding.title.setText("Loading...");
                videoNew.observe(this, videoN1 -> {

                    videoView = binding.video;

                    RecyclerView recyclerView = findViewById(R.id.commentsRecyclerView);

                    if(UserManager.getInstance().getCurrentUser() == null || !Objects.requireNonNull(videosViewModel.getCurrentVideo().getValue()).getUser().get_id().equals(UserManager.getInstance().getCurrentUser().get_id())){
                        binding.editBtn.setVisibility(View.INVISIBLE);
                        binding.deleteBtn.setVisibility(View.INVISIBLE);
                    } else {
                        binding.editBtn.setOnClickListener(v -> {
                            showAlertDialog(videoN1.getTitle(), videoN1.getDescription(), videosViewModel.getCurrentVideo().getValue());
                        });
                        binding.deleteBtn.setOnClickListener(v -> {
                            videosViewModel.delete(videoN1.getUser().get_id(),videoN1.get_id());
                            videosViewModel.reload();
                            finish();
                        });
                    }

//                    adapter = new commentsAdapter[]{new commentsAdapter(this, Videos.getInstance().currentVideo.getComments(), this)};
//                    recyclerView.setAdapter(adapter[0]);
//                    recyclerView.setLayoutManager(new LinearLayoutManager(this));


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
                            videosViewModel.doAction(video.getUser().get_id(), video.get_id(), UserManager.getInstance().getCurrentUser().get_id(), "like");
                            if(UserManager.getInstance().getCurrentUser().getLikedVideos().contains(video.get_id())){
                                UserManager.getInstance().getCurrentUser().getLikedVideos().remove(video.get_id());
                                binding.counterDislike.setText(Integer.toString(video.getDislike()));
                                video.setLike(video.getLike()-1);
                                Objects.requireNonNull(videosViewModel.getCurrentVideo().getValue()).setLike(video.getLike());
                                binding.counterLike.setText(Integer.toString(video.getLike()));
                            } else {
                                if (UserManager.getInstance().getCurrentUser().getDislikedVideos().contains(video.get_id())) {
                                    UserManager.getInstance().getCurrentUser().getDislikedVideos().remove(video.get_id());
                                    video.setDislike(video.getDislike()-1);
                                    Objects.requireNonNull(videosViewModel.getCurrentVideo().getValue()).setDislike(video.getDislike());
                                    binding.counterDislike.setText(Integer.toString(video.getDislike()));
                                }
                                UserManager.getInstance().getCurrentUser().getLikedVideos().add(video.get_id());
                                video.setLike(video.getLike()+1);
                                Objects.requireNonNull(videosViewModel.getCurrentVideo().getValue()).setLike(video.getLike());
                                binding.counterLike.setText(Integer.toString(video.getLike()));
                            }
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
                            videosViewModel.doAction(video.getUser().get_id(), video.get_id(), UserManager.getInstance().getCurrentUser().get_id(), "dislike");
                            if(UserManager.getInstance().getCurrentUser().getDislikedVideos().contains(video.get_id())){
                                UserManager.getInstance().getCurrentUser().getDislikedVideos().remove(video.get_id());
                                binding.counterLike.setText(Integer.toString(video.getLike()));
                                video.setDislike(video.getDislike()-1);
                                Objects.requireNonNull(videosViewModel.getCurrentVideo().getValue()).setDislike(video.getDislike());
                                binding.counterDislike.setText(Integer.toString(video.getDislike()));
                            } else {
                                if (UserManager.getInstance().getCurrentUser().getLikedVideos().contains(video.get_id())) {
                                    UserManager.getInstance().getCurrentUser().getLikedVideos().remove(video.get_id());
                                    video.setLike(video.getLike()-1);
                                    Objects.requireNonNull(videosViewModel.getCurrentVideo().getValue()).setLike(video.getLike());
                                    binding.counterLike.setText(Integer.toString(video.getLike()));
                                }
                                UserManager.getInstance().getCurrentUser().getDislikedVideos().add(video.get_id());
                                video.setDislike(video.getDislike()+1);
                                Objects.requireNonNull(videosViewModel.getCurrentVideo().getValue()).setDislike(video.getDislike());
                                binding.counterDislike.setText(Integer.toString(video.getDislike()));
                            }
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

                    if (videosViewModel.getVideos().getValue() != null) {
                        for (VideoN vid : videosViewModel.getVideos().getValue()) {
                            if (!vid.get_id().equals(videoN1.get_id())) {
                                videos.add(vid);
                            }
                        }
                        final VideosAdapter[] adapterVid = {new VideosAdapter(this, videos, this)};
                        binding.videos.setAdapter(adapterVid[0]);
                        binding.videos.setLayoutManager(new LinearLayoutManager(this));
                    }
                });
            }
        });
    }

    @Override
    public void deleteElement(int position) {
        adapter[0].notifyItemRemoved(position);
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

    @Override
    public void onItemClick(VideoN video) {
        videosViewModel.setCurrentVideo(video);
    }

    @Override
    public void onUserImageClick(VideoN video) {
        Intent intent = new Intent(this, UserPage.class);
        intent.putExtra("userId", video.getUser().get_id());
        startActivity(intent);
    }
}
