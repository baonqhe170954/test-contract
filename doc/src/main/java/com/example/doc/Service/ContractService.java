package com.example.doc.Service;

import com.example.doc.Entity.Contract;
import com.example.doc.Repository.ContractRepository;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.List;

@Service
public class ContractService {

    @Autowired
    private ContractRepository repository;

    // SAVE
    public Contract save(Contract contract) {
        return repository.save(contract);
    }

    // GET ALL  ← thêm cái này

    public List<Contract> findAll() {
        return repository.findAll();
    }

    // GENERATE DOCX
    public byte[] generateContract(String id) throws Exception {

        Contract contract = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        InputStream is = new ClassPathResource("templates/contract-template.docx").getInputStream();

        XWPFDocument document = new XWPFDocument(is);

        for (XWPFParagraph paragraph : document.getParagraphs()) {

            for (XWPFRun run : paragraph.getRuns()) {

                String text = run.getText(0);

                if (text != null) {

                    text = text.replace("${fullName}", contract.getFullName());
                    text = text.replace("${address}", contract.getAddress());
                    text = text.replace("${phone}", contract.getPhone());
                    text = text.replace("${email}", contract.getEmail());

                    run.setText(text, 0);
                }
            }
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        document.write(out);
        document.close();

        return out.toByteArray();
    }
}
