package com.tiktool

import android.accessibilityservice.AccessibilityService
import android.view.accessibility.AccessibilityEvent
import android.util.Log

/**
 * Dịch vụ hỗ trợ tiếp cận cho TikTool.
 */
class TikToolAccessibilityService : AccessibilityService() {
    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        // TODO: Xử lý sự kiện truy cập ở đây
        Log.d("TikToolAccessibility", "Sự kiện: ${event?.eventType}")
    }

    override fun onInterrupt() {
        // TODO: Xử lý khi dịch vụ bị gián đoạn
        Log.d("TikToolAccessibility", "Dịch vụ bị gián đoạn")
    }
}
