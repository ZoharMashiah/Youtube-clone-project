package com.example.youtube_clone;

import android.content.Context;
import android.net.Uri;
import android.util.Log;

public class ResourceUtil {
    private static final String TAG = "ResourceUtil";

    static Uri getResourceUri(Context context, String resourcePath) {
        // Convert resource path to URI
        return Uri.parse("android.resource://" + context.getPackageName() + "/" + context.getResources().getIdentifier(resourcePath, null, context.getPackageName()));
    }
}
