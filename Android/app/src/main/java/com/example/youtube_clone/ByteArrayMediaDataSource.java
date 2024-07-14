package com.example.youtube_clone;
import android.media.MediaDataSource;

import java.io.IOException;

public class ByteArrayMediaDataSource extends MediaDataSource {

    private final byte[] data;

    public ByteArrayMediaDataSource(byte[] data) {
        this.data = data;
    }

    @Override
    public int readAt(long position, byte[] buffer, int offset, int size) throws IOException {
        if (position >= data.length) {
            return -1; // End of data
        }
        int length = Math.min(size, data.length - (int) position);
        System.arraycopy(data, (int) position, buffer, offset, length);
        return length;
    }

    @Override
    public long getSize() throws IOException {
        return data.length;
    }

    @Override
    public void close() throws IOException {
        // No resources to release
    }
}
