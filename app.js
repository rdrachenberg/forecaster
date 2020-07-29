function attachEvents() {
    let submitButton = document.getElementById('submit');
    let code;
    // let url2 = `https://judgetests.firebaseio.com/forecast/today/${code}.json`;
    // let url3 = `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`;

    submitButton.addEventListener('click', function(){
        // document.getElementById('forecast').innerHTML = '';
        let searchLocation = document.getElementById('location').value; 
        searchLocation = searchLocation.toLowerCase();

        let url = 'https://judgetests.firebaseio.com/locations.json';

        if (searchLocation == 'new york' || searchLocation == 'london' || searchLocation == 'barcelona') {
            fetch(url).then(function (response) {
                if (response.ok) {
                    response.json().then(function (locations) {
                        document.getElementById('forecast').style.display = '';
                        switch (searchLocation) {
                            case 'new york':
                                code = `${locations[0].code}`;
                                
                                break;
                            case 'london':
                                code = `${locations[1].code}`;
                                
                                break;
                            case 'barcelona':
                                code = `${locations[2].code}`;
                                
                                break;
                        
                            default:
                                break;
                        }

                        return code;

                    }).then(res => {
                        // console.log(code);
                        fetch(`https://judgetests.firebaseio.com/forecast/today/${code}.json`).then(res => {
                            if(res.ok){
                                res.json().then(todayRes => {
                                    let current = document.getElementById('current');
                                    let span = document.createElement('span');

                                    let div = document.createElement('div');
                                    let conditionSymbol = '&#x2600';
                                    let degrees = '&#176;';

                                    console.log(todayRes.forecast.condition);

                                    switch (todayRes.forecast.condition) {
                                        case 'Sunny':
                                            conditionSymbol = '&#x2600;';
                                            break;
                                        case 'Partly sunny':
                                            conditionSymbol = '&#x26C5;';
                                            break;
                                        case 'Overcast':
                                            conditionSymbol = '&#x2601;';
                                            break;
                                        case 'Rain':
                                            conditionSymbol = '&#x2614;';
                                            break;

                                        default:
                                            break;
                                    }
                                    
                                    span.innerHTML = conditionSymbol;
                                    current.append(div);

                                    div.classList.add('forecasts');
                                    div.append(span);

                                    span.classList.add('condition');
                                    span.classList.add('symbol');

                                    let spanCondition = document.createElement('span');
                                    div.append(spanCondition);
                                    spanCondition.classList.add('condition');

                                    let forecastDataSpan1 = document.createElement('span');
                                    spanCondition.appendChild(forecastDataSpan1);

                                    forecastDataSpan1.innerText = todayRes.name;
                                    forecastDataSpan1.classList.add('forecast-data');

                                    let forecastDataSpan2 = document.createElement('span');
                                    spanCondition.appendChild(forecastDataSpan2);

                                    forecastDataSpan2.innerHTML = `${todayRes.forecast.high}${degrees}/${todayRes.forecast.low}${degrees}`;
                                    forecastDataSpan2.classList.add('forecast-data');

                                    let forecastDataSpan3 = document.createElement('span');
                                    spanCondition.appendChild(forecastDataSpan3);

                                    forecastDataSpan3.innerText = `${todayRes.forecast.condition}`;
                                    forecastDataSpan3.classList.add('forecast-data');
                                    // console.log(todayRes);
                                });
                            }
                        });
                    }).then(res => {
                        // console.log(code);
                        fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`).then(res => {
                            if (res.ok) {
                                res.json().then(threeDayRes => {
                                    let degrees = '&#176;';
                                    let divForecastInfo = document.createElement('div');

                                    document.getElementById('upcoming').append(divForecastInfo);
                                    divForecastInfo.classList.add('forecast-info');

                                    threeDayRes.forecast.forEach(element => {
                                        switch (element.condition) {
                                            case 'Sunny':
                                                conditionSymbol = '&#x2600;';
                                                break;
                                            case 'Partly sunny':
                                                conditionSymbol = '&#x26C5;';
                                                break;
                                            case 'Overcast':
                                                conditionSymbol = '&#x2601;';
                                                break;
                                            case 'Rain':
                                                conditionSymbol = '&#x2614;';
                                                break;

                                            default:
                                                break;
                                        }
                                        let spanUpcoming = document.createElement('span');
                                        divForecastInfo.append(spanUpcoming);
                                        spanUpcoming.classList.add('upcoming');

                                        let spanSymbol = document.createElement('span');
                                        spanUpcoming.append(spanSymbol);
                                        spanSymbol.classList.add('symbol');
                                        spanSymbol.innerHTML = conditionSymbol;

                                        let spanForecastData1 = document.createElement('span');
                                        spanUpcoming.append(spanForecastData1);
                                        spanForecastData1.classList.add('forecast-data');
                                        spanForecastData1.innerHTML = `${element.high}${degrees} / ${element.low}${degrees}`;

                                        let spanForecastData2 = document.createElement('span');
                                        spanUpcoming.append(spanForecastData2);
                                        spanForecastData2.classList.add('forecast-data');
                                        spanForecastData2.innerText = `${element.condition}`;

                                        console.log(element);
                                    });
                                    console.log(threeDayRes.forecast);
                                });
                            }
                            // console.log(res);
                        });
                    });

                } else {
                    document.getElementById('forecast').style.display = '';
                    document.getElementById('upcoming').innerHTML = `<div>Error</div>`;
                    let err = 'Error1';
                    throw err;
                }
            });

        } else {
            document.getElementById('forecast').style.display = '';
            document.getElementById('upcoming').innerHTML = `<div>Error</div>`;
            let err = 'Error2';
            throw err;
        }
        document.getElementById('location').value = '';
    });
}

attachEvents();

// Write a program that requests a weather report from a server and displays it to the user.
/*
When the user writes the name of a location and clicks“ Get Weather”, make a GET request to the server at address https: //judgetests.firebaseio.com/locations.json. The response will be an array of objects, with the following structure:
    {
        name: locationName,
        code: locationCode
    }

    Find the object, corresponding to the name that the user submitted in the input field with ID "location"
    and use its code value to make two more GET requests: •For current conditions, make a request to:
        https: //judgetests.firebaseio.com/forecast/today/{code}.json
        The response from the server will be an object with the following structure: {
            name: locationName,
            forecast: {
                low: temp,
                https: //judgetests.firebaseio.com/forecast/upcoming/{code}.json
                    The response from the server will be an object with the following structure: {
                        name: locationName,
                        forecast: [{
                            low: temp,
                            high: temp,
                            condition: condition
                        }, ...]
                    }
*/