const express = require("express");
const axios = require('axios');
const router = express.Router();


//routing
module.exports = function(){
    router.get('/', async (req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
        const countries = response.data;
        res.json(countries);
    })

    router.get('/country-info/:countryCode',  async (req,res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        const { countryCode } = req.params;

        try {
            // border countries
            const bordersResponse= await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
            const borders = bordersResponse.data.borders;
            // flag URL
            const flagResponse = await axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', {iso2: countryCode});
            const flagUrl = flagResponse.data.data.flag;
            const replaceIso2ToIso3 = flagResponse.data.data.iso3;

            // population data
            const populationResponse = await axios.post('https://countriesnow.space/api/v0.1/countries/population',{iso3:replaceIso2ToIso3});
            const populationData = populationResponse.data.data;


            // combining results
            const countryInfo = {
                borders,
                populationData,
                flagUrl
            }

            res.json(countryInfo);
        } catch (error) {
            console.log(error);
        }
    })

    return router;
}