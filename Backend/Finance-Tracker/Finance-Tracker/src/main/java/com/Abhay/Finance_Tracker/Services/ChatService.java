package com.Abhay.Finance_Tracker.Services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class ChatService {

    private final RestTemplate restTemplate;

    public ChatService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String askAI(String question)
    {
        String url =
                "http://localhost:11434/api/generate";

        Map<String,Object> request =
                Map.of(
                        "model","gemma:2b",
                        "prompt",question,
                        "stream",false
                );

        Map<?, ?> response =
        restTemplate.postForObject(
                url,
                request,
                Map.class
        );

        return response.get("response")
                .toString();
    }
}