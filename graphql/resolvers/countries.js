const countriesAndCitiesList = require("../../model/countriesAndCities");
const CountriesAndUnicodes = require("../../model/countriesAndUnicodes");

/**
 * @type {import("../types").IRGetCountriesAndCities}
 */
function getCountriesAndCities(parent, args) {
    const limit = args.limit || 10
    const page = args.page || 1
    const search = args.country || ""

    /**
     * @type {import("../types").IRGetCountriesAndCitiesResponse[]}
     */
    const countriesAndCities = [];

    if (search) {
        // Search for the country
        const filteredCountry = countriesAndCitiesList.find((country) => country.country.toLowerCase().trim() === search.toLowerCase().trim());
        // if the country is not found, return all countries
        if (!filteredCountry) return countriesAndCities;

        const unicodes = CountriesAndUnicodes.find((country) => country.Name.toLowerCase().trim() === filteredCountry?.country.toLowerCase().trim());
        countriesAndCities.push({
            country: filteredCountry?.country,
            cities: filteredCountry?.cities,
            iso2: unicodes?.Iso2,
            iso3: unicodes?.Iso3,
        })
        return countriesAndCities
    }

    for (let i = (page - 1) * limit; i < page * limit && i < countriesAndCitiesList.length; i++) {
        const unicodes = CountriesAndUnicodes.find((country) => country.Name.toLowerCase().trim() === countriesAndCitiesList[i].country.toLowerCase().trim());
        countriesAndCities.push({
            country: countriesAndCitiesList[i].country,
            cities: countriesAndCitiesList[i].cities,
            iso2: unicodes?.Iso2,
            iso3: unicodes?.Iso3,
        })
    }

    return countriesAndCities
}

module.exports = {
    getCountriesAndCities
}