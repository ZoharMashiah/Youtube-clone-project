package com.example.youtube_clone;
import androidx.room.TypeConverter;

import com.google.gson.Gson;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class Converters {
    private static Gson gson = new Gson();

    // SmallUser Converters
    @TypeConverter
    public static String fromSmallUser(SmallUser user) {
        return user != null ? gson.toJson(user) : null;
    }

    @TypeConverter
    public static SmallUser fromStringToSmallUser(String value) {
        return value != null ? gson.fromJson(value, SmallUser.class) : null;
    }
    @TypeConverter
    public static String fromList(List<String> list) {
        return list != null ? String.join(",", list) : null;
    }

    @TypeConverter
    public static List<String> fromString(String value) {
        return value != null ? Arrays.asList(value.split(",")) : null;
    }

    // Date Converters
    @TypeConverter
    public static Long fromDate(Date date) {
        return date != null ? date.getTime() : null;
    }

    @TypeConverter
    public static Date fromLong(Long value) {
        return value != null ? new Date(value) : null;
    }
}

