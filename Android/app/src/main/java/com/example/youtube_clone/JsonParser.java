package com.example.youtube_clone;

import android.content.Context;
import android.util.Log;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;

public class JsonParser {
    private static final String TAG = "JsonParser";

    public static ArrayList<LocalVideo> parseVideosJson(String jsonString) {
        if (jsonString != null) {
            Log.d(TAG, "JSON string: " + jsonString);  // Log the JSON string
            try {
                Gson gson = new Gson();
                Type videoListType = new TypeToken<ArrayList<LocalVideo>>() {}.getType();
                ArrayList<LocalVideo> videos = gson.fromJson(jsonString, videoListType);
                Log.d(TAG, "JSON parsed successfully");
                return videos;
            } catch (JsonSyntaxException e) {
                Log.e(TAG, "Error parsing JSON", e);
            }
        } else {
            Log.e(TAG, "Error reading JSON file");
        }
        return new ArrayList<>();
    }
}
