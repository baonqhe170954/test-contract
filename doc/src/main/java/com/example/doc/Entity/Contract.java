package com.example.doc.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "contracts")
@Data
public class Contract {

    @Id
    private String id;

    private String fullName;
    private String address;
    private String phone;
    private String email;
}

