package com.gustavo.people_api.dto;

import lombok.Data;

import java.util.List;

@Data
public class NationalityResponse {

    private List<Country> country;

    @Data
    public static class Country {

        private String country_id;
        private double probability;
    }
}