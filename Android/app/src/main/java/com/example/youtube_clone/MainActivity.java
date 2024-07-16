package com.example.youtube_clone;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.SearchView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;

import com.example.youtube_clone.databinding.ActivityMainBinding;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity implements RecyclerViewInterface {

    private ActivityMainBinding binding;
    private ArrayList<Video> videos;
    private final String[] categories = {"All", "Music", "Mixes", "JavaScript", "Gaming", "Bouldering",
            "Display devices", "AI", "Computer Hardware", "Table News", "Inventions", "News", "Comedy clubs", "Skills", "3D printing"};

    private final Button[] myButton = new Button[categories.length];

    private ViewModel viewModel;
    VideosAdapter[] adapter;
    private VideosViewModel videosViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());

        // apply dark mode prefs, has to be before setContent
        DarkModeUtils.applyDarkMode(DarkModeUtils.isDarkMode());

        setContentView(binding.getRoot());

        viewModel = new ViewModelProvider(this).get(ViewModel.class);

        binding.themeToggleButton.setOnClickListener(v -> {
            DarkModeUtils.toggleDarkMode();
            recreate(); // has to recreate the app because its a system-wide change
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


        binding.buttonAddVid.setOnClickListener(v -> {
            if (UserManager.getInstance().getCurrentUser() != null) {
                Intent intent = new Intent(this, addVideoActivity.class);
                startActivity(intent);
            } else {
                new android.app.AlertDialog.Builder(this)
                        .setMessage("You must log in to add a video!")
                        .setPositiveButton("OK", (dialog, which) -> dialog.dismiss())
                        .show();
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
        if (videosViewModel.getFeed().getValue() != null) {

            adapter = new VideosAdapter[]{new VideosAdapter(this, videosViewModel.getFeed().getValue(), this)};
            binding.mRecyclerView.setAdapter(adapter[0]);
            binding.mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        }

        for (int index = 0; index < categories.length; index++) {
            myButton[index] = new Button(this); // initialize the button here
            myButton[index].setText(categories[index]);
            myButton[index].setBackgroundColor(ContextCompat.getColor(this, R.color.primary));
            myButton[index].setTextColor(ContextCompat.getColor(this, R.color.on_primary));
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.WRAP_CONTENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
            );
            params.setMargins(10, 10, 10, 10);
            myButton[index].setLayoutParams(params);
            myButton[index].setTextColor(ContextCompat.getColor(this, R.color.white));

            int finalIndex = index;
            myButton[index].setOnClickListener(v -> {
                videosViewModel.filterVideos(false, categories[finalIndex]);
                if (videosViewModel.getFeed().getValue() != null) {
                    adapter[0] = new VideosAdapter(this, videosViewModel.getFeed().getValue(), this);
                    binding.mRecyclerView.setAdapter(adapter[0]);
                    binding.mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
                }
            });
            binding.categories.addView(myButton[index]);

            Context context = this;

            binding.search.setOnClickListener(v -> binding.search.setIconified(false));
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

            binding.search.setOnCloseListener(() -> {
                Videos.getInstance().filterdVideos = videos;
                adapter[0] = new VideosAdapter(context, videosViewModel.getFeed().getValue(), (RecyclerViewInterface) context);
                binding.mRecyclerView.setAdapter(adapter[0]);
                binding.mRecyclerView.setLayoutManager(new LinearLayoutManager(context));
                return false;
            });
        }
    }

    @Override
    public void onItemClick(VideoN video) {
        videosViewModel.setCurrentVideo(video);
        Intent intent = new Intent(this, videoShowActivity.class);
        startActivity(intent);
    }
}