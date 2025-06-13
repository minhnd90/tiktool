package com.tiktool

import android.content.pm.PackageManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * Module native kiểm tra app đã cài đặt qua package name.
 */
class AppInstalledUtilsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "AppInstalledUtils"

    /**
     * Kiểm tra app đã cài đặt qua package name.
     */
    @ReactMethod
    fun isAppInstalled(packageName: String, promise: Promise) {
        try {
            val pm = reactApplicationContext.packageManager
            pm.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES)
            promise.resolve(true)
        } catch (e: PackageManager.NameNotFoundException) {
            promise.resolve(false)
        } catch (e: Exception) {
            promise.reject("ERR_CHECK_APP", e)
        }
    }
}
