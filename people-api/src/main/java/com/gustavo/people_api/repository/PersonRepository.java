package com.gustavo.people_api.repository;

import com.gustavo.people_api.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository
        extends JpaRepository<Person, Long> {

    boolean existsByEmail(String email);

    boolean existsByDocument(String document);
}