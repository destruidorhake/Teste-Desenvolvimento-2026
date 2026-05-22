package com.gustavo.people_api.service;

import com.gustavo.people_api.dto.NationalityResponse;
import com.gustavo.people_api.entity.Person;
import com.gustavo.people_api.repository.PersonRepository;
import com.gustavo.people_api.utils.CountryMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class PersonService {

    @Autowired
    private PersonRepository repository;

    @Autowired
    private RestTemplate restTemplate;

    // CREATE
    public Person create(Person person) {

        if (repository.existsByEmail(person.getEmail())) {
            throw new RuntimeException("E-mail já cadastrado");
        }

        if (repository.existsByDocument(person.getDocument())) {
            throw new RuntimeException("Documento já cadastrado");
        }

        return repository.save(person);
    }

    // LIST
    public List<Person> list() {
        return repository.findAll();
    }

    // FIND BY ID
    public Person findById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Pessoa não encontrada"));
    }

    // DELETE
    public void delete(Long id) {

        Person person = findById(id);

        repository.delete(person);
    }

    // NATIONALITY
    public String findNationality(Long id) {

        Person person = findById(id);

        String firstName =
                person.getName().split(" ")[0];

        String url =
                "https://api.nationalize.io/?name=" + firstName;

        NationalityResponse response =
                restTemplate.getForObject(
                        url,
                        NationalityResponse.class
                );

        if (response != null &&
                response.getCountry() != null &&
                !response.getCountry().isEmpty()) {

            String countryCode =
                    response.getCountry().get(0).getCountry_id();

            double probability =
                    response.getCountry().get(0).getProbability();

            String countryName =
                    CountryMapper.getCountryName(countryCode);

            return countryName +
                    " (" + String.format("%.2f", probability * 100) + "%)";
        }
        return "Nacionalidade não encontrada";
    }
}