package com.Abhay.Finance_Tracker.repository;

import com.Abhay.Finance_Tracker.Model.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExpenseRepository
        extends MongoRepository<Expense, String> {
}