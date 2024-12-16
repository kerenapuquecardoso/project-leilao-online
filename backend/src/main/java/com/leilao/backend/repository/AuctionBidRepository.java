package com.leilao.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leilao.backend.entity.AuctionBid;

public interface AuctionBidRepository extends JpaRepository<AuctionBid, Long> {

}