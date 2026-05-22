package com.gustavo.people_api.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = DocumentValidator.class)

@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)

public @interface ValidDocument {

    String message() default "Documento inválido";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}