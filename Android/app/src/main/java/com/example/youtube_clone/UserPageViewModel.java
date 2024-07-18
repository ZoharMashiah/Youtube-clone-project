package com.example.youtube_clone;

import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.youtube_clone.api.userAPI.UserAPI;
import com.example.youtube_clone.api.videoAPI.VideoApi;

import java.util.ArrayList;
import java.util.List;

public class UserPageViewModel extends ViewModel {
    private final MutableLiveData<User> userLiveData = new MutableLiveData<>();
    private final MutableLiveData<List<VideoN>> userVideosLiveData = new MutableLiveData<>();
    private final MutableLiveData<String> messageLiveData = new MutableLiveData<>();
    private final MutableLiveData<Boolean> userDeletedLiveData = new MutableLiveData<>();
    private List<VideoN> currCachedVideos = null;
    private final UserAPI userAPI = new UserAPI();
    private final VideoApi videoApi = new VideoApi(null, null);

    public UserPageViewModel() {
    }

    public void loadUser(String userId) {
        User currentUser = UserManager.getInstance().getCurrentUser();

        if (userId.equals(currentUser.get_id())) {
            userLiveData.setValue(currentUser);

            if (currCachedVideos != null) {
                userVideosLiveData.setValue(currCachedVideos);
            } else {
                loadUserVideos(currentUser.get_id(), true);
            }

        } else {
            fetchUserAndVideos(userId);
        }
        int x = 3;
    }


    public void fetchUserAndVideos(String userId) {
        userAPI.getUser(userId, new UserAPI.UserCallback() {
            @Override
            public void onSuccess(User fetchedUser, String message) {
                userLiveData.setValue(fetchedUser);
                loadUserVideos(fetchedUser.get_id(), false);
                Log.i("UserViewModel", "User loaded successfully");
            }

            @Override
            public void onError(String errorMessage) {
                messageLiveData.setValue(errorMessage);
                Log.e("VideoAPI", "error fetching user videos: " + errorMessage);
            }
        });
    }

    private void loadUserVideos(String userId, boolean isCurrentUser) {
        Log.d("UserViewModel", "Loading videos for user: " + userId);
        videoApi.getUserVideos(userId, new VideoApi.VideoCallback() {
            @Override
            public void onSuccess(List<VideoN> videoList) {
                if (isCurrentUser) {
                    currCachedVideos = new ArrayList<>(videoList);
                }
                userVideosLiveData.setValue(videoList);
                Log.d("UserViewModel", "Received video list: " + videoList.size());
            }

            @Override
            public void onError(String errorMessage) {
                userVideosLiveData.setValue(new ArrayList<>());
                messageLiveData.setValue(errorMessage);
                Log.e("UserViewModel", "Error loading videos: " + errorMessage);
            }
        });


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

    public void addVideoToUserList(VideoN newVideo) {
        if (newVideo != null) {
            List<VideoN> currentList = userVideosLiveData.getValue();
            if (currentList == null) {
                currentList = new ArrayList<>();
            }
            currentList.add(newVideo);
            userVideosLiveData.setValue(currentList);
        }
    }
}