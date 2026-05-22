package com.gustavo.people_api.controller;

import com.gustavo.people_api.entity.Person;
import com.gustavo.people_api.service.PersonService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequestMapping
public class PersonController {

    @Autowired
    private PersonService service;

    // CREATE
    @PostMapping("/registrarName")
    public ResponseEntity<Person> create(
            @RequestBody @Valid Person person
    ) {

        return ResponseEntity.status(201)
                .body(service.create(person));
    }

    // LIST
    @GetMapping("/list")
    public ResponseEntity<List<Person>> list() {

        return ResponseEntity.ok(service.list());
    }

    // FIND BY ID
    @GetMapping("/list/{id}")
    public ResponseEntity<Person> findById(
            @PathVariable @Min(1) Long id
    ) {

        return ResponseEntity.ok(service.findById(id));
    }

    // DELETE
    @DeleteMapping("/list/{id}")
    public ResponseEntity<String> delete(
            @PathVariable @Min(1) Long id
    ) {

        service.delete(id);

        return ResponseEntity.ok(
                "Pessoa removida com sucesso"
        );
    }

    // NATIONALITY
    @GetMapping("/findNationalityByPerson/{id}")
    public ResponseEntity<String> findNationality(
            @PathVariable @Min(1) Long id
    ) {

        return ResponseEntity.ok(
                service.findNationality(id)
        );
    }

    // LOGOUT
    @PostMapping("/logout")
    public ResponseEntity<String> logout(
            HttpServletRequest request
    ) {

        request.getSession().invalidate();

        return ResponseEntity.ok(
                "Logout realizado"
        );
    }
}