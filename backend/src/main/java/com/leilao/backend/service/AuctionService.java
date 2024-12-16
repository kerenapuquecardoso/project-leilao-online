package com.leilao.backend.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilao.backend.entity.Auction;
import com.leilao.backend.entity.Person;
import com.leilao.backend.repository.AuctionRepository;
import com.leilao.backend.security.AuthPersonProvider;


@Service
public class AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private AuthPersonProvider authPersonProvider;

    private String decodeImageBase64 (String base64, String title) {
        byte[] imageByte = Base64.getDecoder().decode(base64);
        String name = title.replaceAll("\\s+", "_") + ".png";
        String path = "src/main/resources/images/" + name;
        try (FileOutputStream fos = new FileOutputStream(new File(path))) {
            fos.write(imageByte);
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar a imagem", e);
        }
        return path;
    }

    public Auction create(Auction auction) {
        String base64 = auction.getCaminhoImagem();
        String path = decodeImageBase64(base64, auction.getTitle());
        auction.setCaminhoImagem(path);
        auction.setPerson(authPersonProvider.getAuthenticatedUser());

        return auctionRepository.save(auction);
    }

    public Auction update(Auction auction) {
        String base64 = auction.getCaminhoImagem();
        String path = decodeImageBase64(base64, auction.getTitle());
        Auction auctionSaved = auctionRepository.findById(auction.getId())
                .orElseThrow(() -> new NoSuchElementException("Leilão não encontrado"));

        auctionSaved.setTitle(auction.getTitle());
        auctionSaved.setDescription(auction.getDescription());
        auctionSaved.setStartDateTime(auction.getStartDateTime());
        auctionSaved.setCaminhoImagem(path);
        auctionSaved.setEndDateTime(auction.getEndDateTime());
        auctionSaved.setStatus(auction.getStatus());
        auctionSaved.setObservation(auction.getObservation());
        auctionSaved.setIncrementValue(auction.getIncrementValue());
        return auctionRepository.save(auctionSaved);
    }

    public void delete(Long id) {
        Auction auctionSaved = auctionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Leilão não encontrado"));
        auctionRepository.delete(auctionSaved);
    }

    public List<Auction> listAll() {
        Person authenticatedUser = authPersonProvider.getAuthenticatedUser();
        return auctionRepository.findByPerson(authenticatedUser);
    }

    public List<Auction> listAllPublic() {
        return auctionRepository.findAll();
    }

    public Auction findById(Long id) {
        Person authenticatedUser = authPersonProvider.getAuthenticatedUser();
        Auction auction = auctionRepository.findByIdAndPerson(id, authenticatedUser);
        if (auction == null) {
            throw new NoSuchElementException("Leilão não encontrado ou não pertence ao usuário autenticado");
        }
        return auction;
    }
}