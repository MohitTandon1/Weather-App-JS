import {dom} from './dom';

const events = function () {
    
    async function getSearch(searchBar) {
        try {
            const value = (document.getElementById(searchBar).value).toLowerCase();
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=903507f17d707fecd352d38301efba77&units=metric`;
            const url2 = `http://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=903507f17d707fecd352d38301efba77&unitsimperial`;
            const response = await fetch(url, { mode: 'cors' });
            const response2 = await fetch(url2, { mode: 'cors' });
            const cityData = await response.json();
            const cityData2 = await response2.json();
            showFlow(cityData);
        } catch (error) {
            console.error('Error:', error);
            alert('Could not find the location');
        }
    };  

    async function getForecast() {
        try {
            const value = (document.getElementById('search').value).toLowerCase();            
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&appid=903507f17d707fecd352d38301efba77`;            
            const response = await fetch(url, { mode: 'cors' });
            const cityData = await response.json();
            console.log(cityData.list)
            forecastFlow(cityData);
        } catch (error) {
            console.error('Error:', error);
            alert('Could not find the location');
        }
    }; 

    function showFlow(data) {        
        dom().clearForms();
        dom().fillCard(data);
        dom().imageSwitch(data, 'image');
        dom().show('search');
    };

    function forecastFlow(data) {
        dom().clearForms();
        dom().createCard(data);
        dom().show('forecast');
    }

    return { getSearch, showFlow, getForecast, }
};

export { events }