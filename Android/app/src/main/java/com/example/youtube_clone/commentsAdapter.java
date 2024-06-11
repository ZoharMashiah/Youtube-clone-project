package com.example.youtube_clone;

import android.content.Context;
import android.text.Layout;
import android.view.LayoutInflater;
import android.view.TextureView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class commentsAdapter extends RecyclerView.Adapter<commentsAdapter.MyViewHolder>{

    Context context;
    ArrayList<Comment> commentsArray;
    public commentsAdapter(Context context,  ArrayList<Comment> commentsArray){
        this.context = context;
        this.commentsArray = commentsArray;
    }

    @NonNull
    @Override
    public commentsAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.recycler_view_comments, parent,false);

        return new commentsAdapter.MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull commentsAdapter.MyViewHolder holder, int position) {
        holder.tvAuthor.setText(commentsArray.get(position).getUser());
        holder.tvComment.setText(commentsArray.get(position).getTitle());
    }

    @Override
    public int getItemCount() {
        return commentsArray.size();
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder{

        TextView tvAuthor;
        TextView tvComment;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);

            tvAuthor = itemView.findViewById(R.id.author);
            tvComment = itemView.findViewById(R.id.commentContent);


        }
    }
}
