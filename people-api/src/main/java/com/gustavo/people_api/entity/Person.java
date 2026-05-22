package com.gustavo.people_api.entity;

import com.gustavo.people_api.enums.DocumentType;
import com.gustavo.people_api.validation.ValidDocument;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@ValidDocument
@Table(name = "persons")
@Data
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Tipo de documento obrigatório")
    private DocumentType documentType;

    @NotBlank(message = "Documento é obrigatório")
    private String document;

    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @NotBlank(message = "Sobrenome é obrigatório")
    private String lastname;

    @Email(message = "E-mail inválido")
    @NotBlank(message = "E-mail é obrigatório")
    private String email;

    @AssertTrue(message = "Documento inválido para o tipo selecionado")
    public boolean isValidDocument() {

        if (document == null || documentType == null) {
            return false;
        }

        return switch (documentType) {

            case CPF -> document.matches("\\d{11}");

            case RG -> document.matches("\\d{7,12}");

            case CNPJ -> document.matches("\\d{14}");

            case OUTRO -> document.length() >= 5;
        };
    }
}