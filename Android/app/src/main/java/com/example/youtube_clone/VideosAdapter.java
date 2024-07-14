package com.example.youtube_clone;


import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Calendar;
import java.util.List;

public class VideosAdapter extends RecyclerView.Adapter<VideosAdapter.MyViewHolder> {
    Context context;
    List<VideoN> videos;
    RecyclerViewInterface recyclerViewInterface;

    public VideosAdapter(Context context, List<VideoN> videos, RecyclerViewInterface recyclerViewInterface) {
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
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        int views = videos.get(position).getViews();
        long publication_date = videos.get(position).getPublication_date().getTime();
        String viewers = views > 999 ? views > 999999 ? ((views / 1000000) + "M") : ((views / 1000) + "K") : Integer.toString(views);
        long time = ((Calendar.getInstance().getTime().getTime() - publication_date) / 60000);
        String timeStr = time > 60 ? time > 1140 ? time > 43200 ? time > 525600 ? ((time / 525600) + " years ago") : ((time / 43200) + " months ago") : ((time / 1140) + " days ago") : ((time / 60) + " hours ago") : (time + " minutes ago");
        String info = videos.get(position).getUser().username + "·" + viewers + "views·" + timeStr;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            byte [] bytes = decodeBase64(videos.get(position).getIcon());
            holder.videoImage.setImageBitmap(BitmapFactory.decodeByteArray(bytes, 0, bytes.length));
            bytes = decodeBase64(videos.get(position).getIcon());
            holder.videoImage.setImageBitmap(BitmapFactory.decodeByteArray(bytes, 0, bytes.length));
            bytes = decodeBase64(videos.get(position).getUser().photo);
            holder.userImage.setImageBitmap(BitmapFactory.decodeByteArray(bytes, 0, bytes.length));
        }
        holder.title.setText(videos.get(position).getTitle());
        holder.videoInfo.setText(info);
        holder.parent.setOnClickListener(v -> {
            recyclerViewInterface.onItemClick(videos.get(position));
        });
    }

    public byte[] decodeBase64(String base64String) {
        // Remove the prefix if it exists (e.g., "data:image/png;base64,")
        if (base64String.contains(",")) {
            base64String = base64String.split(",")[1];
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            return Base64.getDecoder().decode(base64String);
        }
        return null;
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
            videoImage = itemView.findViewById(R.id.videoImg);
            userImage = itemView.findViewById(R.id.userImg);
            title = itemView.findViewById(R.id.videoTitle);
            videoInfo = itemView.findViewById(R.id.videoInfo);
            parent = itemView.findViewById(R.id.parentLayout);
        }
    }
}
