package com.example.theduckmobile.services;

import android.Manifest;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.telephony.SmsManager;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;

import com.example.theduckmobile.MainActivity;
import com.example.theduckmobile.R;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;

public class FirebaseCloudMessagingService extends FirebaseMessagingService {

    @Override
    public void onNewToken(@NonNull String token) {
        super.onNewToken(token);
        Log.d("FCM", String.format("%s:%s", "New Token:", token));
    }


    @Override
    public void onMessageReceived(@NonNull RemoteMessage message) {
        super.onMessageReceived(message);
        Intent intent = new Intent(this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        intent.putExtra("order", true);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_IMMUTABLE);


        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "general_channel_id")
                .setSmallIcon(R.drawable.ic_launcher_background)
                .setContentTitle(Objects.requireNonNull(message.getNotification()).getTitle())
                .setContentText(message.getNotification().getBody())
                .setContentIntent(pendingIntent)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);
        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED) {
            Log.d("FCM", "Chưa cấp quyền thông báo");
        }

        Log.d("FCM", "Đã cấp quyền thông báo");
        // Show notification
        notificationManager.notify(0, builder.build());

        // Send SMS in background
        Map<String, String> data = message.getData();
        String phoneNumber = data.get("phoneNumber");
        String messageContent = data.get("message");


        SmsManager smsManager = SmsManager.getDefault();
        smsManager.sendTextMessage(phoneNumber, null, messageContent, null, null);
        Log.d("FCM", "Đã gửi SMS cho " + phoneNumber + " với nội dung: " + messageContent);
    }

    private void sendSMS(String phoneNumber, String message) {
        try {
            SmsManager sms = SmsManager.getDefault();
            ArrayList<String> mSMSMessage = sms.divideMessage(message);
            sms.sendMultipartTextMessage(phoneNumber, null, mSMSMessage,
                    null, null);

        } catch (Exception e) {

            e.printStackTrace();
            Toast.makeText(getBaseContext(), "SMS sending failed...", Toast.LENGTH_SHORT).show();
        }
    }
}