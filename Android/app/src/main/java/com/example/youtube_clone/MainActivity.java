package com.example.youtube_clone;

import static com.example.youtube_clone.ResourceUtil.getResourceUri;

import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;

import com.example.youtube_clone.databinding.ActivityMainBinding;


import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import com.example.youtube_clone.databinding.ActivityLoginBinding;
import com.example.youtube_clone.databinding.ActivityMainBinding;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class MainActivity extends AppCompatActivity implements RecyclerViewInterface{

    private ActivityMainBinding binding;

    private ArrayList<Video> videos;
    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        if(Videos.getInstance().videos.isEmpty()) {
            String jsonString = loadJSONFromAsset();

            videos = loadVideosFromJson(JsonParser.parseVideosJson(jsonString));

            Videos.getInstance().videos = videos;
        } else {
            videos = Videos.getInstance().videos;
        }

        binding.imageButtonAddVid.setOnClickListener(v -> {
            if(Users.getInstance().currentUser != null) {
                Intent intent = new Intent(this, addVideoActivity.class);
                startActivity(intent);
            }else {
                AlertDialog.Builder builder = new AlertDialog.Builder(this);

                // Set the message show for the Alert time
                builder.setMessage("You need to have a user to add a video!");

                // Set Alert Title
                builder.setTitle("Alert !");

                // Set Cancelable false for when the user clicks on the outside the Dialog Box then it will remain show
                builder.setCancelable(false);

                // Set the positive button with yes name Lambda OnClickListener method is use of DialogInterface interface.
                builder.setPositiveButton("Cancle", (DialogInterface.OnClickListener) (dialog, which) -> {
                    // When the user click yes button then app will close
                    dialog.cancel();
                });

                // Create the Alert dialog
                AlertDialog alertDialog = builder.create();
                // Show the Alert Dialog box
                alertDialog.show();
            }
        });

        if(Users.getInstance().currentUser != null) {
            binding.imageButton14.setImageURI(Users.getInstance().currentUser.getProfileImage());
        } else {
            binding.imageButton14.setOnClickListener(v -> {
                Intent intent = new Intent(this, LoginActivity.class);
                startActivity(intent);
            });
        }

        VideosAdapter adapter = new VideosAdapter(this, videos,this);
        binding.mRecyclerView.setAdapter(adapter);
        binding.mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
    }

    private ArrayList<Video> loadVideosFromJson(ArrayList<LocalVideo> vids) {
        ArrayList<Video> Videos = new ArrayList<>();
        for (LocalVideo lv: vids) {
            Video video = new Video(lv.getId(), lv.getTitle(), lv.getDescription(), lv.getUser(),
                    getResesource(lv.getUser_image()), lv.getCategory(), lv.getPublication_date(),
                    getResesource(lv.getIcon()),lv.getViews(),lv.getLike(),lv.getDislike(),lv.getComments(),
                    getResesource(lv.getVideo()));
            Log.e("Main",video.getIcon().toString());
            Videos.add(video);
        }
        return Videos;
    }

    public String loadJSONFromAsset() {
        String json = null;
        try {
            InputStream is = getResources().openRawResource(R.raw.videos);
            int size = is.available();
            byte[] buffer = new byte[size];
            is.read(buffer);
            is.close();
            json = new String(buffer, "UTF-8");
        } catch (IOException ex) {
            ex.printStackTrace();
            return null;
        }
        return json;
    }

    private Uri getResesource(String videoIdentifier){
        switch (videoIdentifier){
            case "video_image1.png":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video_image1);
            case "video1.mp4":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video1);
            case "video_image2.png":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video_image2);
            case "video2.mp4":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video2);
            case "video_image3.png":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video_image3);
            case "video3.mp4":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video3);
            case "video_image4.png":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video_image4);
            case "video4.mp4":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video4);
            case "video_image5.png":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video_image5);
            case "video5.mp4":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video5);
            case "video_image6.png":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video_image6);
            case "video6.mp4":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video6);
            case "video_image7.png":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video_image7);
            case "video7.mp4":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video7);
            case "video_image8.png":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video_image8);
            case "video8.mp4":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video8);
            case "video_image9.png":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video_image9);
            case "video9.mp4":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video9);
            case "video_image10.png":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video_image10);
            case "video10.mp4":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video10);
            case "video_image11.png":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video_image11);
            case "video11.mp4":
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video11);
            default:
                return Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.video_image1);
        }
    }

    @Override
    public void onItemClick(Video video) {
        Videos.getInstance().currentVideo = video;
        Intent intent = new Intent(this, videoShowActivity.class);
        intent.putExtra("video", video);
        startActivity(intent);
    }
}