package com.example.youtube_clone;


import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.Calendar;

public class VideosAdapter extends RecyclerView.Adapter<VideosAdapter.MyViewHolder> {
    Context context;
    ArrayList<Video> videos;
    RecyclerViewInterface recyclerViewInterface;

    public VideosAdapter(Context context, ArrayList<Video> videos, RecyclerViewInterface recyclerViewInterface) {
        this.context = context;
        this.videos = videos;
        this.recyclerViewInterface = recyclerViewInterface;
    }

    @NonNull
    @Override
    public VideosAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.recycler_view_video, parent, false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull VideosAdapter.MyViewHolder holder, int position) {
        int views = videos.get(position).getViews();
        long publication_date = videos.get(position).getPublication_date();
        String viewers = views > 999 ? views > 999999 ? ((views / 1000000) + "M") : ((views / 1000) + "K") : Integer.toString(views);
        long time = ((Calendar.getInstance().getTime().getTime() - publication_date) / 60000);
        String timeStr = time > 60 ? time > 1140 ? time > 43200 ? time > 525600 ? ((time / 525600) + " years ago") : ((time / 43200) + " monthes ago") : ((time / 1140) + " days ago") : ((time / 60) + " hours ago") : (time + " minuets ago");
        String info = videos.get(position).getUser() + "·" + viewers + "views·" + timeStr;

        holder.videoImage.setImageURI(videos.get(position).getIcon());
        holder.userImage.setImageURI(videos.get(position).getUser_image());
        holder.title.setText(videos.get(position).getTitle());
        holder.videoInfo.setText(info);
        holder.parent.setOnClickListener(v -> {
            recyclerViewInterface.onItemClick(videos.get(position));
        });
    }

    @Override
    public int getItemCount() {
        return videos.size();
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {

        ImageView videoImage;
        ImageView userImage;
        TextView title;
        TextView videoInfo;
        LinearLayout parent;
        public View itemView;


        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            this.itemView = itemView;
            videoImage = itemView.findViewById(R.id.imageView4);
            userImage = itemView.findViewById(R.id.imageView5);
            title = itemView.findViewById(R.id.textView3);
            videoInfo = itemView.findViewById(R.id.textView4);
            parent = itemView.findViewById(R.id.parentLayout);
        }
    }
}
