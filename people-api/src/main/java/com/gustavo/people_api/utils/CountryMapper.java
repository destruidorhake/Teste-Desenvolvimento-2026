package com.gustavo.people_api.utils;

import java.util.Map;

public class CountryMapper {

    private static final Map<String, String> countries = Map.ofEntries(

            Map.entry("BR", "Brasil"),
            Map.entry("US", "Estados Unidos"),
            Map.entry("FR", "França"),
            Map.entry("DE", "Alemanha"),
            Map.entry("IT", "Itália"),
            Map.entry("ES", "Espanha"),
            Map.entry("PT", "Portugal"),
            Map.entry("JP", "Japão"),
            Map.entry("CN", "China"),
            Map.entry("RU", "Rússia"),
            Map.entry("AR", "Argentina"),
            Map.entry("MX", "México")
    );

    public static String getCountryName(String isoCode) {

        return countries.getOrDefault(
                isoCode,
                "Nacionalidade não encontrada"
        );
    }
}