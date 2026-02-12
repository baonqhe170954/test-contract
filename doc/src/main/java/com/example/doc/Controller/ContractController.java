package com.example.doc.Controller;

import com.example.doc.Entity.Contract;
import com.example.doc.Service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contracts")
@CrossOrigin(origins = "http://localhost:3000")
public class ContractController {

    @Autowired
    private ContractService service;

    @PostMapping
    public Contract create(@RequestBody Contract contract) {
        return service.save(contract);
    }

    @GetMapping("/export/{id}")
    public ResponseEntity<byte[]> export(@PathVariable String id) throws Exception {
        byte[] file = service.generateContract(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=contract.docx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(file);
    }
}
