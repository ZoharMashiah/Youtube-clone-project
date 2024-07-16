package com.example.youtube_clone;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Base64;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class FormatConverters {
    private FormatConverters() {
    }

    // Convert Video URI to Base64
    public static String videoUriToBase64(Context context, Uri videoUri) throws IOException {
        byte[] videoBytes = uriToByteArray(context, videoUri);
        return "data:video/mp4;base64," + byteArrayToBase64(videoBytes);
    }

    // Convert Image URI to Base64
    public static String imageUriToBase64(Context context, Uri imageUri) throws IOException {
        Bitmap bitmap = uriToBitmap(context, imageUri);
        return "data:image/jpeg;base64," + bitmapToBase64(bitmap);
    }

    public static Bitmap base64ToBitmap(String base64String) {
        String base64Image = base64String;
        if (base64String.contains(",")) {
            base64Image = base64String.split(",")[1];
        }

        byte[] decodedBytes = Base64.decode(base64Image, Base64.DEFAULT);
        return BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length);
    }

    // Convert Bitmap to Base64 for images
    private static String bitmapToBase64(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();
        return Base64.encodeToString(byteArray, Base64.NO_WRAP);
    }


    // Convert URI to Bitmap for images
    public static Bitmap uriToBitmap(Context context, Uri uri) throws IOException {
        return MediaStore.Images.Media.getBitmap(context.getContentResolver(), uri);
    }

    // Convert URI to Byte Array for videos
    private static byte[] uriToByteArray(Context context, Uri uri) throws IOException {
        InputStream inputStream = context.getContentResolver().openInputStream(uri);
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len;
        while ((len = inputStream.read(buffer)) != -1) {
            byteArrayOutputStream.write(buffer, 0, len);
        }
        return byteArrayOutputStream.toByteArray();
    }

    // Convert Byte Array to Base64 for videos
    private static String byteArrayToBase64(byte[] byteArray) {
        return Base64.encodeToString(byteArray, Base64.NO_WRAP);
    }
}