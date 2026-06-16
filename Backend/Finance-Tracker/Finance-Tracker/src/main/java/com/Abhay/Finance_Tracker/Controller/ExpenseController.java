package com.Abhay.Finance_Tracker.Controller;

import com.Abhay.Finance_Tracker.Model.Expense;
import com.Abhay.Finance_Tracker.repository.ExpenseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseRepository repository;

    public ExpenseController(ExpenseRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Expense> getExpenses() {
        return repository.findAll();
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return repository.save(expense);
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable String id, @RequestBody Expense updatedExpense) {

        Expense expense = repository.findById(id).orElseThrow();

        expense.setCategory(updatedExpense.getCategory());
        expense.setAmount(updatedExpense.getAmount());

        return repository.save(expense);
    }

    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable String id) {

        repository.deleteById(id);
        return "Expense deleted successfully";
    }
}