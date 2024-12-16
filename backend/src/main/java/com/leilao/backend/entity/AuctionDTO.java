package com.leilao.backend.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuctionDTO {
    String title;
    String description;
    LocalDateTime startDateTime;
    LocalDateTime endDateTime;
    String status;
    String observation;
    String base64;
    Double incrementValue;
    Double valueBid;
    String emailUserBid;
}



