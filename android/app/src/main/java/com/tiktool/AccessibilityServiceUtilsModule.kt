package com.tiktool

import android.content.Context
import android.provider.Settings
import android.text.TextUtils
import android.content.Intent
import android.app.Activity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

/**
 * Module native kiểm tra và mở cài đặt Accessibility Service cho TikTool.
 */
class AccessibilityServiceUtilsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "AccessibilityServiceUtils"

    /**
     * Kiểm tra dịch vụ TikToolAccessibilityService đã được bật chưa.
     */
    @ReactMethod
    fun isServiceEnabled(promise: Promise) {
        try {
            val context: Context = reactApplicationContext
            val enabledServices = Settings.Secure.getString(
                context.contentResolver,
                Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES
            )
            val expected = context.packageName + "/.TikToolAccessibilityService"
            val isEnabled = !TextUtils.isEmpty(enabledServices) &&
                enabledServices.split(":").contains(expected)
            promise.resolve(isEnabled)
        } catch (e: Exception) {
            promise.reject("ERR_CHECK_SERVICE", e)
        }
    }

    /**
     * Mở màn hình cài đặt Accessibility của hệ thống.
     */
    @ReactMethod
    fun openAccessibilitySettings() {
        val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        reactApplicationContext.startActivity(intent)
    }
}
