package com.example.youtube_clone;

import androidx.lifecycle.MutableLiveData;

public class ViewModel extends androidx.lifecycle.ViewModel {
    private MutableLiveData<String> foo;

    public MutableLiveData<String> getfoo() {
        if (foo == null) {
            foo = new MutableLiveData<>();
        }

        return foo;
    }
}
