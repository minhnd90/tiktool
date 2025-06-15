package com.tiktool.overlay

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule

/**
 * Module tổng hợp: xin quyền overlay, kiểm tra quyền, show/hide overlay.
 */
@ReactModule(name = OverlayModule.NAME)
class OverlayModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {
    companion object {
        const val NAME = "OverlayModule"
        private const val OVERLAY_PERMISSION_REQ_CODE = 1234
    }
    private var permissionPromise: Promise? = null

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = NAME

    @ReactMethod
    fun checkOverlayPermission(promise: Promise) {
        val granted = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Settings.canDrawOverlays(reactContext)
        } else {
            true
        }
        promise.resolve(granted)
    }

    @ReactMethod
    fun requestOverlayPermission(promise: Promise) {
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
            val granted = Settings.canDrawOverlays(reactContext)
            permissionPromise?.resolve(granted)
            permissionPromise = null
        }
    }
    override fun onNewIntent(intent: Intent?) {}

    @ReactMethod
    fun showOverlay() {
        val context = reactContext
        val intent = Intent(context, OverlayService::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startService(intent)
    }

    @ReactMethod
    fun hideOverlay() {
        val context = reactContext
        val intent = Intent(context, OverlayService::class.java)
        context.stopService(intent)
    }
}
