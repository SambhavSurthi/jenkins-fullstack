package com.habit_tracker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

@RestController
@RequestMapping("/api/quotes")
@CrossOrigin(origins = "*")
public class QuoteController {

    private final RestClient restClient = RestClient.create();

    @GetMapping("/random")
    public ResponseEntity<Object> randomQuote() {
        // Using zenquotes.io free API
        Object response = restClient.get()
                .uri("https://zenquotes.io/api/random")
                .retrieve()
                .body(Object.class);
        return ResponseEntity.ok(response);
    }
}


