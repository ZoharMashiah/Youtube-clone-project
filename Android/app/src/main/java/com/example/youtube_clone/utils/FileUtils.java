package com.example.youtube_clone.utils;
import android.content.Context;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileUtils {
    public static File saveVideoToFile(Context context, byte[] videoBytes) throws IOException {
        File outputDir = context.getCacheDir(); // Use the cache directory
        File outputFile = File.createTempFile("video", ".mp4", outputDir);
        try (FileOutputStream fos = new FileOutputStream(outputFile)) {
            fos.write(videoBytes);
        }
        return outputFile;
    }
}
