package com.example.youtube_clone;

import android.app.AlertDialog;
import android.content.Context;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.youtube_clone.api.commentAPI.commentAPI;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

public class commentsAdapter extends RecyclerView.Adapter<commentsAdapter.MyViewHolder>{

    Context context;
    List<CommentData> commentsArray;
    commentRecycler commentRecycler;
    public commentsAdapter(Context context,  List<CommentData> commentsArray, commentRecycler commentRecycler){
        this.context = context;
        if(commentsArray == null){
            this.commentsArray = new ArrayList<>();
        }else
            this.commentsArray = commentsArray;
        this.commentRecycler = commentRecycler;
    }

    @NonNull
    @Override
    public commentsAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.comment, parent,false);

        return new commentsAdapter.MyViewHolder(view, commentRecycler);
    }

    @Override
    public void onBindViewHolder(@NonNull commentsAdapter.MyViewHolder holder, int position) {
        CommentData comment = commentsArray.get(position);
        holder.tvAuthor.setText(commentsArray.get(position).getUser().getUsername());
        holder.tvComment.setText(commentsArray.get(position).getTitle());
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            byte[] bytes = decodeBase64(commentsArray.get(position).getUser().getPhoto());
            holder.userImage.setImageBitmap(BitmapFactory.decodeByteArray(bytes, 0, bytes.length));
        }

        if (UserManager.getInstance().getCurrentUser() != null && comment.getUser().get_id().equals(UserManager.getInstance().getCurrentUser().get_id())) {
            holder.editButton.setVisibility(View.VISIBLE);
            holder.deleteButton.setVisibility(View.VISIBLE);

            holder.editButton.setOnClickListener(v -> showEditCommentDialog(comment, position));
//            holder.deleteButton.setOnClickListener(v -> commentsArray.remove(position));
        } else {
            holder.editButton.setVisibility(View.GONE);
            holder.deleteButton.setVisibility(View.GONE);
        }
    }

    @Override
    public int getItemCount() {
        return commentsArray.size();
    }

    private void showEditCommentDialog(CommentData comment, int position) {
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
                CommentViewModel commentViewModel = new CommentViewModel();
                VideoN video = null;
                if(ViewModelsSingelton.getInstance(context.getApplicationContext()).getVideosViewModel().getCurrentVideo() != null){
                    video = ViewModelsSingelton.getInstance(context.getApplicationContext()).getVideosViewModel().getCurrentVideo().getValue();
                }
                if(video != null) {
                    commentViewModel.updateComment(video.getUser().get_id(),
                            video.get_id(),
                            comment.get_id(),
                            comment);
                }
            }
        });
        builder.setNegativeButton("Cancel", (dialog, which) -> dialog.cancel());

        builder.show();
    }

    public byte[] decodeBase64(String base64String) {
        if (base64String.contains(",")) {
            base64String = base64String.split(",")[1];
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            return Base64.getDecoder().decode(base64String);
        }
        return null;
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
        ImageView userImage;


        public MyViewHolder(@NonNull View itemView, commentRecycler commentRecycler) {
            super(itemView);

            tvAuthor = itemView.findViewById(R.id.author);
            tvComment = itemView.findViewById(R.id.commentContent);
            editButton = itemView.findViewById(R.id.editButton);
            deleteButton = itemView.findViewById(R.id.deleteButton);
            userImage = itemView.findViewById(R.id.user_avatar);

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
