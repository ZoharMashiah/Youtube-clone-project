package com.example.youtube_clone;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.SearchView;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.core.content.ContextCompat;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;

import com.example.youtube_clone.api.videoAPI.VideoApi;
import com.example.youtube_clone.databinding.ActivityMainBinding;
import com.example.youtube_clone.reposetories.VideoRepository;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

public class MainActivity extends AppCompatActivity implements RecyclerViewInterface {

    private ActivityMainBinding binding;

    private ArrayList<Video> videos;
    private static final String TAG = "MainActivity";

    private final String[] categories = {"All", "Music", "Mixes", "JavaScript", "Gaming", "Bouldering",
            "Display devices", "AI", "Computer Hardware", "Table News", "Inventions", "News", "Comedy clubs", "Skills", "3D printing"};

    private final Button[] myButton = new Button[categories.length];

    private static final String PREFS_NAME = "prefs";
    private static final String PREF_DARK_MODE = "dark_mode";
    private ViewModel viewModel;
    VideosAdapter[] adapter;
    private VideosViewModel videosViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        viewModel = new ViewModelProvider(this).get(ViewModel.class);

        UserManager userManager = UserManager.getInstance();
        userManager.init(MyApplication.getAppContext());


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

        videosViewModel = ViewModelsSingelton.getInstance().getVideosViewModel();

        videosViewModel.getIsFiltered().observe(this, v -> {
            adapter = new VideosAdapter[]{new VideosAdapter(this, videosViewModel.getFeed().getValue(), this)};
            binding.mRecyclerView.setAdapter(adapter[0]);
            binding.mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        });

        videosViewModel.getVideosFiltered().observe(this, videoNS -> {
            if (Boolean.TRUE.equals(videosViewModel.getIsFiltered().getValue())) {
                adapter = new VideosAdapter[]{new VideosAdapter(this, videosViewModel.getFeed().getValue(), this)};
                binding.mRecyclerView.setAdapter(adapter[0]);
                binding.mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
            }
        });

//        if (Videos.getInstance().videos.isEmpty()) {
//            String jsonString = loadJSONFromAsset();
//
//            videos = loadVideosFromJson(JsonParser.parseVideosJson(jsonString));
//
//            Videos.getInstance().videos = videos;
//        } else {
//            videos = Videos.getInstance().videos;
//        }

        binding.buttonAddVid.setOnClickListener(v -> {
            if (Users.getInstance().currentUser != null) {
                Intent intent = new Intent(this, addVideoActivity.class);
                startActivity(intent);
            } else {
                AlertDialog.Builder builder = new AlertDialog.Builder(this);

                // Set the message show for the Alert time
                builder.setMessage("You need to have a user to add a video!");

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

        binding.userButton.setOnClickListener(v -> {
            User curr = UserManager.getInstance().getCurrentUser();
            Intent intent;

            if (curr != null) {
                intent = new Intent(this, UserPage.class);
                intent.putExtra("userId", curr.get_id());
            } else {
                intent = new Intent(this, LoginActivity.class);
            }
            startActivity(intent);
        });


        videosViewModel.getFeed().observe(this, videoNS -> {
            adapter = new VideosAdapter[]{new VideosAdapter(this, videoNS, this)};
            binding.mRecyclerView.setAdapter(adapter[0]);
            binding.mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        });
        if(videoApi.getFeed().getValue() != null) {

            adapter = new VideosAdapter[]{new VideosAdapter(this, videosViewModel.getFeed().getValue(), this)};
            binding.mRecyclerView.setAdapter(adapter[0]);
            binding.mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        }

        for (int index = 0; index < categories.length; index++) {
            myButton[index] = new Button(this); //initialize the button here
            myButton[index].setText(categories[index]);
            myButton[index].setBackgroundColor(ContextCompat.getColor(this, R.color.login_blue));
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.WRAP_CONTENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
            );
            params.setMargins(10, 10, 10, 10);
            myButton[index].setLayoutParams(params);
            myButton[index].setTextColor(ContextCompat.getColor(this, R.color.white));

            int finalIndex = index;
            myButton[index].setOnClickListener(v -> {
//                if (finalIndex != 0) {
//                    Videos.getInstance().filterByCategory(categories[finalIndex]);
//                } else {
//                    Videos.getInstance().filterdVideos = videos;
//                }
                videosViewModel.filterVideos(false, categories[finalIndex]);
                if(videosViewModel.getFeed().getValue() != null){
                    adapter[0] = new VideosAdapter(this, videosViewModel.getFeed().getValue(), this);
                    binding.mRecyclerView.setAdapter(adapter[0]);
                    binding.mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
                }
            });
            binding.categories.addView(myButton[index]);

            Context context = this;

            binding.search.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    binding.search.setIconified(false);
                }
            });
            binding.search.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
                // Override onQueryTextSubmit method which is call when submit query is searched
                @Override
                public boolean onQueryTextSubmit(String query) {
                    // If the list contains the search query than filter the adapter
                    // using the filter method with the query as its argument
                    Videos.getInstance().filterByTitle(query);
                    videosViewModel.filterVideos(true, query);
                    return false;
                }

                @Override
                public boolean onQueryTextChange(String newText) {
                    return false;
                }

            });

            binding.search.setOnCloseListener(new SearchView.OnCloseListener() {
                @Override
                public boolean onClose() {
                    Videos.getInstance().filterdVideos = videos;
                    adapter[0] = new VideosAdapter(context, videosViewModel.getFeed().getValue(), (RecyclerViewInterface) context);
                    binding.mRecyclerView.setAdapter(adapter[0]);
                    binding.mRecyclerView.setLayoutManager(new LinearLayoutManager(context));
                    return false;
                }
            });
        }

    }

//    private ArrayList<Video> loadVideosFromJson(ArrayList<LocalVideo> vids) {
//        ArrayList<Video> Videos = new ArrayList<>();
//        for (LocalVideo lv : vids) {
//            ArrayList<Comment> comments = new ArrayList<>();
//            for (LocalComment lc : lv.getComments()) {
//                comments.add(new Comment(lc.getId(), lc.getTitle(), lc.getUser(), lc.getDate(), getResesource(lc.getIcon())));
//            }
//            Video video = new Video(lv.getId(), lv.getTitle(), lv.getDescription(), lv.getUser(),
//                    getResesource(lv.getUser_image()), lv.getCategory(), lv.getPublication_date(),
//                    getResesource(lv.getIcon()), lv.getViews(), lv.getLike(), lv.getDislike(), comments,
//                    getResesource(lv.getVideo()));
//            Videos.add(video);
//        }
//        return Videos;
//    }

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

//    private Uri getResesource(String videoIdentifier) {
//        switch (videoIdentifier) {
//            case "video_image1.png":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video_image1);
//            case "video1.mp4":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video1);
//            case "video_image2.png":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video_image2);
//            case "video2.mp4":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video2);
//            case "video_image3.png":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video_image3);
//            case "video3.mp4":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video3);
//            case "video_image4.png":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video_image4);
//            case "video4.mp4":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video4);
//            case "video_image5.png":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video_image5);
//            case "video5.mp4":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video5);
//            case "video_image6.png":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video_image6);
//            case "video6.mp4":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video6);
//            case "video_image7.png":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video_image7);
//            case "video7.mp4":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video7);
//            case "video_image8.png":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video_image8);
//            case "video8.mp4":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video8);
//            case "video_image9.png":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video_image9);
//            case "video9.mp4":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video9);
//            case "video_image10.png":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video_image10);
//            case "video10.mp4":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video10);
//            case "video_image11.png":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video_image11);
//            case "video11.mp4":
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video11);
//            default:
//                return Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video_image1);
//        }
//    }

    @Override
    public void onItemClick(VideoN video) {
        videosViewModel.setCurrentVideo(video);
        Intent intent = new Intent(this, videoShowActivity.class);
        startActivity(intent);
    }
}