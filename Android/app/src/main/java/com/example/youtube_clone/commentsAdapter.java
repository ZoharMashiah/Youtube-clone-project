package com.example.youtube_clone;

import android.app.AlertDialog;
import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.text.Layout;
import android.view.LayoutInflater;
import android.view.TextureView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class commentsAdapter extends RecyclerView.Adapter<commentsAdapter.MyViewHolder>{

    Context context;
    ArrayList<Comment> commentsArray;
    commentRecycler commentRecycler;
    public commentsAdapter(Context context,  ArrayList<Comment> commentsArray, commentRecycler commentRecycler){
        this.context = context;
        this.commentsArray = commentsArray;
        this.commentRecycler = commentRecycler;
    }

    @NonNull
    @Override
    public commentsAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.recycler_view_comments, parent,false);

        return new commentsAdapter.MyViewHolder(view, commentRecycler);
    }

    @Override
    public void onBindViewHolder(@NonNull commentsAdapter.MyViewHolder holder, int position) {
        Comment comment = commentsArray.get(position);
        holder.tvAuthor.setText(commentsArray.get(position).getUser());
        holder.tvComment.setText(commentsArray.get(position).getTitle());

        if (Users.getInstance().currentUser != null && comment.getUser().equals(Users.getInstance().currentUser.getUsername())) {
            holder.editButton.setVisibility(View.VISIBLE);
            holder.deleteButton.setVisibility(View.VISIBLE);

            holder.editButton.setOnClickListener(v -> showEditCommentDialog(comment, position));
            //holder.deleteButton.setOnClickListener(v -> showDeleteCommentDialog(comment, position));
        } else {
            holder.editButton.setVisibility(View.GONE);
            holder.deleteButton.setVisibility(View.GONE);
        }
    }

    @Override
    public int getItemCount() {
        return commentsArray.size();
    }

    private void showEditCommentDialog(Comment comment, int position) {
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle("Edit Comment");

        // Set up the input
        final EditText input = new EditText(context);
        input.setText(comment.getTitle());
        builder.setView(input);

        // Set up the buttons
        builder.setPositiveButton("Save", (dialog, which) -> {
            String newCommentText = input.getText().toString().trim();
            if (!newCommentText.isEmpty() && !newCommentText.equals(comment.getTitle())) {
                comment.setTitle(newCommentText);
                notifyItemChanged(position);
                // Update the comment in the data source
                Videos.getInstance().updateComment(comment.getId(), newCommentText);
            }
        });
        builder.setNegativeButton("Cancel", (dialog, which) -> dialog.cancel());

        builder.show();
    }

//    private void showDeleteCommentDialog(Comment comment, int position) {
//        AlertDialog.Builder builder = new AlertDialog.Builder(context);
//        builder.setTitle("Delete Comment");
//        builder.setMessage("Are you sure you want to delete this comment?");
//
//        builder.setPositiveButton("Delete", (dialog, which) -> {
//            // Remove the comment from the data source
//            new Handler(Looper.getMainLooper()).post(() -> {
//                Videos.getInstance().deleteComment(comment.getId());
//                commentsArray.remove(position);
//                notifyItemRemoved(position);
//                notifyItemRangeChanged(position, commentsArray.size());
//            });
//        });
//        builder.setNegativeButton("Cancel", (dialog, which) -> dialog.cancel());
//
//        builder.show();
//    }

    public static class MyViewHolder extends RecyclerView.ViewHolder{

        TextView tvAuthor;
        TextView tvComment;
        Button editButton;
        Button deleteButton;


        public MyViewHolder(@NonNull View itemView, commentRecycler commentRecycler) {
            super(itemView);

            tvAuthor = itemView.findViewById(R.id.author);
            tvComment = itemView.findViewById(R.id.commentContent);
            editButton = itemView.findViewById(R.id.editButton);
            deleteButton = itemView.findViewById(R.id.deleteButton);

            deleteButton.setOnClickListener(v -> {
                if (commentRecycler != null) {
                    int pos = getAdapterPosition();

                    if(pos != RecyclerView.NO_POSITION){
                        commentRecycler.deleteElement(pos);
                    }
                }
            });
        }
    }
}
