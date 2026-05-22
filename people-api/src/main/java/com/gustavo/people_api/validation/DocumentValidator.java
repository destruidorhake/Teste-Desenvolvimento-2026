package com.gustavo.people_api.validation;

import com.gustavo.people_api.entity.Person;
import com.gustavo.people_api.enums.DocumentType;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DocumentValidator
        implements ConstraintValidator<ValidDocument, Person> {

    @Override
    public boolean isValid(
            Person person,
            ConstraintValidatorContext context
    ) {

        if (person == null ||
                person.getDocument() == null ||
                person.getDocumentType() == null) {

            return false;
        }

        String document =
                person.getDocument().replaceAll("\\D", "");

        DocumentType type =
                person.getDocumentType();

        return switch (type) {

            case CPF -> document.matches("\\d{11}");

            case RG -> document.matches("\\d{9}");

            case CNPJ -> document.matches("\\d{14}");

            case OUTRO -> document.length() >= 5;
        };
    }
}