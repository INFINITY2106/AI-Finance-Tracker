package com.Abhay.Finance_Tracker.Services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.Abhay.Finance_Tracker.repository.ExpenseRepository;
import com.Abhay.Finance_Tracker.Model.Expense;
import java.util.List;

import java.util.Map;

@Service
public class ChatService {

    private final RestTemplate restTemplate;
    private final ExpenseRepository expenseRepository;

    public ChatService(
            RestTemplate restTemplate,
            ExpenseRepository expenseRepository)
    {
        this.restTemplate = restTemplate;
        this.expenseRepository = expenseRepository;
    }

    public String askAI(String question)
    {
        List<Expense> expenses =
                expenseRepository.findAll();

                System.out.println("Expenses from DB:");
                    System.out.println(expenses);

        StringBuilder context =
                new StringBuilder();

        context.append("User Expenses:\n");

        for(Expense expense : expenses)
        {
            context.append(expense.getCategory())
                   .append(" : ₹")
                   .append(expense.getAmount())
                   .append("\n");
        }

        String finalPrompt =
                """
                You are an AI Financial Assistant.

                Use the following expense data.

                %s

                User Question:
                %s
                """
                .formatted(
                        context.toString(),
                        question
                );

                System.out.println("Final Prompt:");
                    System.out.println(finalPrompt);

        Map<String,Object> request =
                Map.of(
                        "model","gemma:2b",
                        "prompt",finalPrompt,
                        "stream",false,
                        "keep_alive","30m"
                );

        Map<?,?> response =
                restTemplate.postForObject(
                        "http://localhost:11434/api/generate",
                        request,
                        Map.class
                );

        return response.get("response").toString();
    }
}