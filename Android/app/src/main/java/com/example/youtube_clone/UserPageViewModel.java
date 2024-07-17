package com.example.youtube_clone;

import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.youtube_clone.api.userAPI.UserAPI;
import com.example.youtube_clone.api.videoAPI.VideoApi;

import java.util.List;

public class UserPageViewModel extends ViewModel {
    private final MutableLiveData<User> userLiveData = new MutableLiveData<>();
    private final MutableLiveData<List<VideoN>> userVideosLiveData = new MutableLiveData<>();
    private final MutableLiveData<String> messageLiveData = new MutableLiveData<>();
    private final MutableLiveData<Boolean> userDeletedLiveData = new MutableLiveData<>();
    private final UserAPI userAPI = new UserAPI();
    private final VideoApi videoApi = new VideoApi(null, null);

    public UserPageViewModel() {
    }

    public void loadUser(String userId) {
        userAPI.getUser(userId, new UserAPI.UserCallback() {
            @Override
            public void onSuccess(User fetchedUser, String message) {
                userLiveData.setValue(fetchedUser);
                loadUserVideos(fetchedUser.get_id());
                Log.i("UserViewModel", "User loaded successfully");
            }

            @Override
            public void onError(String errorMessage) {
                messageLiveData.setValue(errorMessage);
                Log.e("VideoAPI", "error fetching user videos: " + errorMessage);
            }
        });
    }

    private void loadUserVideos(String userId) {
        videoApi.getUserVideos(userId).observeForever(userVideosLiveData::setValue);
    }

    public void updateUser(User updatedUser) {
        userAPI.updateUser(updatedUser, new UserAPI.UserCallback() {
            @Override
            public void onSuccess(User user, String message) {
                Log.i("UserPage", "Changes to the user have been saved");
                userLiveData.setValue(user);
                UserManager.getInstance().setCurrentUser(user);
            }

            @Override
            public void onError(String message) {
                Log.d("UseViewModel", message);
                messageLiveData.setValue("Error updating user");
            }
        });
    }

    public void deleteUser(User user) {
        userAPI.delete(user, new UserAPI.UserCallback() {
            @Override
            public void onSuccess(User user, String message) {
                messageLiveData.setValue("Deleted user successfully");
                UserManager.getInstance().logout();
            }

            @Override
            public void onError(String message) {
                Log.d("UseViewModel", message);
                messageLiveData.setValue("Error deleting user");
            }
        });
    }

    public LiveData<User> getUserLiveData() {
        return userLiveData;
    }

    public LiveData<List<VideoN>> getUserVideosLiveData() {
        return userVideosLiveData;
    }

    public LiveData<String> getMessageLiveData() {
        return messageLiveData;
    }


    public LiveData<Boolean> getUserDeletedLiveData() {
        return userDeletedLiveData;
    }
}