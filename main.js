/// <reference path = "jQuery.js"/>


(function() { //IIFE

    $(() => { // document ready

        //show all countries
        $("#showAll").click(function() {
            $("#allCards").empty();
            $("#error").html("");
            getCountries(`https://restcountries.eu/rest/v2/all`)
                .then(arr => displayCountry(arr))
                .catch(err => alert("" + err.statusText));
        });

         //restrict numerical input and special characters
        $("#userInput").keypress(function(key) {
            //8 - (backspace)
            //32 - (space)
            if ((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90) && (key.charCode != 45 && key.charCode != 8 && key.charCode != 32)) return false;
        });


         //search countries and display results
        $("#search").click(function() {
            $("#error").html("");
            $("#allCards").empty();
            let val = $("#userInput").val();
            // console.log(val);
            getCountries(`https://restcountries.eu/rest/v2/name/${val}`)
                .then(arr => displayCountry(arr))
                .catch(err => $("#error").html("" + err.statusText + ": please enter a valid country."));
        });


        //call and obtain API data
        function getCountries(url) {
            return new Promise((resolve, reject) => {
                $.getJSON(url, result => resolve(result))
                    .fail(err => reject(err));
            })
        }

        //create country cards and display specific information from API
        function displayCountry(countries) {
            for (let country of countries) {
                const name = country.name;
                const domain = country.topLevelDomain;
                const capital = country.capital;
                const currency = country.currencies[0].name + " " + country.currencies[0].symbol + " " + country.currencies[0].code;
                const flag = country.flag;
                const countryCard = `
           <div class="col-lg-3 col-sm-4">
            <div class="card mb-3" style="max-width: 18rem;>
            <div class="row no-gutters">
            <img src="${flag}" class="card-img" alt="country flag">
            <div class="card-header"><h3>${name}</h3></div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item"><span><b>Top level domain:</b> <span class="answer">${domain}</span></li>
                    <li class="list-group-item"><span><b>Capital:</b> <span class="answer">${capital}</span> </li>
                    <li class="list-group-item"><span><b>Currencies:</b> <span class="answer">${currency}</span> </li>
                </ul>
                </div>
            </div>
            </div>
            </div>
           
        `
                $("#allCards").append(countryCard);
            }
        };

    });
})();