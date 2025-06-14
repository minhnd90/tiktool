package com.tiktool

import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.provider.Settings
import android.text.TextUtils
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
            val flatName1 = context.packageName + SERVICE_CLASS_NAME
            val flatName2 = context.packageName + "/" + flatName1
            val isEnabled = !TextUtils.isEmpty(enabledServices) && enabledServices.split(":").any { it == flatName1 || it == flatName2 }
            promise.resolve(isEnabled)
        } catch (e: Exception) {
            promise.reject("ERR_CHECK_SERVICE", e)
        }
    }

    /**
     * Mở màn hình cài đặt chi tiết của TikToolAccessibilityService.
     */
    @ReactMethod
    fun openAccessibilitySettings() {
        val context: Context = reactApplicationContext
        val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS).apply {
            // Tạo ComponentName để mở trực tiếp cài đặt của TikToolAccessibilityService
            val componentName = ComponentName(context.packageName, context.packageName + SERVICE_CLASS_NAME)
            putExtra(":settings:fragment_args_key", componentName.flattenToString())
            putExtra(":settings:show_fragment_args", android.os.Bundle().apply {
                putString(":settings:fragment_args_key", componentName.flattenToString())
            })
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        try {
            context.startActivity(intent)
        } catch (e: Exception) {
            // Fallback về màn hình danh sách Accessibility nếu không mở được trực tiếp
            val fallbackIntent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
            fallbackIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(fallbackIntent)
        }
    }

    private companion object {
        const val SERVICE_CLASS_NAME = ".TikToolAccessibilityService"
    }

}
