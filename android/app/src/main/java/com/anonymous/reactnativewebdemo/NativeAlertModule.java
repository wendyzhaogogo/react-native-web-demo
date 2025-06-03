package com.anonymous.reactnativewebdemo;

import android.app.AlertDialog;
import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class NativeAlertModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public NativeAlertModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "NativeAlert";
    }

    @ReactMethod
    public void showAlert(String title, String message, Promise promise) {
        try {
            Context context = getCurrentActivity();
            if (context == null) {
                promise.reject("ERROR", "Activity context is null");
                return;
            }

            new AlertDialog.Builder(context)
                .setTitle(title)
                .setMessage(message)
                .setPositiveButton("OK", (dialog, which) -> {
                    promise.resolve(null);
                })
                .show();
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }
} 