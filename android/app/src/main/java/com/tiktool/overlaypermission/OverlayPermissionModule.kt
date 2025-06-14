package com.tiktool.overlaypermission

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class OverlayPermissionModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {
    private var permissionPromise: Promise? = null
    private val OVERLAY_PERMISSION_REQ_CODE = 1234

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = "OverlayPermission"

    @ReactMethod
    fun check(promise: Promise) {
        val granted = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Settings.canDrawOverlays(reactApplicationContext)
        } else {
            true
        }
        promise.resolve(granted)
    }

    @ReactMethod
    fun request(promise: Promise) {
        val currentActivity = currentActivity
        if (currentActivity == null) {
            promise.reject("NO_ACTIVITY", "Không tìm thấy Activity hiện tại")
            return
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(currentActivity)) {
                permissionPromise = promise
                val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                    Uri.parse("package:" + currentActivity.packageName))
                currentActivity.startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE)
            } else {
                promise.resolve(true)
            }
        } else {
            promise.resolve(true)
        }
    }

    override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode == OVERLAY_PERMISSION_REQ_CODE && permissionPromise != null) {
            val granted = Settings.canDrawOverlays(reactApplicationContext)
            permissionPromise?.resolve(granted)
            permissionPromise = null
        }
    }

    override fun onNewIntent(intent: Intent?) {}
}
