package com.example.doc.Repository;

import com.example.doc.Entity.Contract;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContractRepository extends MongoRepository<Contract, String> {
}

