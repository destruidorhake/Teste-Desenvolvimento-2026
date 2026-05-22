package com.gustavo.people_api.utils;

import java.util.Map;
import java.util.Locale;

// Procura nacionalidade baseado em ISO
public class CountryMapper {
    public static String getCountryName(String isoCode) {
        if (isoCode == null || isoCode.length() != 2) {
            return "Nacionalidade não encontrada";
        }
        Locale ptBr = new Locale("pt", "BR");
        Locale countryLocale = new Locale("", isoCode.toUpperCase());

        // Retorna o nome do país traduzido
        String countryName = countryLocale.getDisplayCountry(ptBr);

        if (countryName.equals(isoCode.toUpperCase())) {
            return "Nacionalidade não encontrada";
        }
        return countryName;
    }
}
