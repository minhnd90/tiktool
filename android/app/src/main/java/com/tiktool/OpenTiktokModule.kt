package com.tiktool

import android.content.Intent
import android.content.pm.PackageManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * Module native để mở app TikTok theo package name.
 */
class OpenTiktokModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "OpenTiktokUtils"

    /**
     * Mở app TikTok theo package name.
     */
    @ReactMethod
    fun openTiktokByPackage(packageName: String, promise: Promise) {
        try {
            val context = reactApplicationContext
            val pm = context.packageManager
            val launchIntent: Intent? = pm.getLaunchIntentForPackage(packageName)
            if (launchIntent != null) {
                launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(launchIntent)
                promise.resolve(true)
            } else {
                promise.resolve(false)
            }
        } catch (e: Exception) {
            promise.reject("ERR_OPEN_TIKTOK", e)
        }
    }
}
