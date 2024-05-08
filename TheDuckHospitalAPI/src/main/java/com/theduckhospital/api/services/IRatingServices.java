package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.admin.AddRatingRequest;
import com.theduckhospital.api.dto.request.chat.MessagesResponse;
import com.theduckhospital.api.dto.request.chat.SendMessageRequest;
import com.theduckhospital.api.dto.response.RatingResponse;
import com.theduckhospital.api.dto.response.chat.ConversationResponse;
import com.theduckhospital.api.entity.Rating;

import java.util.List;
import java.util.UUID;

public interface IRatingServices {
    Rating addRating(AddRatingRequest request);
    RatingResponse getRatingByBookingId(UUID bookingId);
}
