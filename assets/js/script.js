// abbreviations
// CDF stands for Current Date Forecaste
// FF stands for Future Forecast

//input form call
var searchInput = document.querySelector("#search-input")

//search button call
var searchBtn = document.querySelector("#search-btn")

//Current date forecast element call
var CDFDiv = document.querySelector("#CDF-Div")

//History date forecast call
var historyDiv = document.querySelector("#history")

//array to hold strings that will generate buttons for the search history
//and store them in localstorage
var searchHistory = []

// global variable to hold searched city
var searchTerm = ""

// global varialbe to hold dats
var date = ""

//weather api key
var apiKey = "5bdea9a85704cee38790f2d31b062496"

//obj with different cards that are needed to append infomation to 
const cards = {
    card1: document.querySelector("[data-day= '0']"),
    card2: document.querySelector("[data-day= '1']"),
    card3: document.querySelector("[data-day= '2']"),
    card4: document.querySelector("[data-day= '3']"),
    card5: document.querySelector("[data-day= '4']"),
}

// function that will create a button for history of searches in localstorage
var createButton = function(index) {
    // create button and add attributes, classes, and text
    var btn = document.createElement("button")
    btn.setAttribute("type","button")
    btn.setAttribute("id", index)
    btn.classList = ("col-12 btn btn-secondary btn-sm mb-3")
    btn.textContent = index

    // append to history div
    historyDiv.appendChild(btn)
}

// function that converts unix time to a standard date format
var convertDate = function(unixDate) {
    // format date by multipling it by 1000 to convert it to milli seconds
    var dateFormat = new Date(unixDate*1000)
    // get year
    var dateYear = dateFormat.getFullYear()
    // get month +1 because it start at 0 
    //(call starts at 0 and goes to 11 so it always a month off)
    var dateMonth = dateFormat.getMonth()+1
    // get day
    var dateDay = dateFormat.getDate()
    // Make complete date and store it in the global variable
    date = dateMonth +"/" + dateDay + "/" + dateYear

}

// function to save search history to local storage
var saveSearches = function(){
    localStorage.setItem("search-history", JSON.stringify(searchHistory))
}


// function to load search history and create buttons
var loadSearches = function() {
    var history = JSON.parse(localStorage.getItem("search-history"))

    // if null set search history to empty
    if(!searchHistory){
        searchHistory = []
    }else{
        // index through each item in array and create buttons for search history
        history.forEach(index => createButton(index))
    }

}

//fetch weather api function
var fetchWeatherApi = function(search){

    // build first api url to get latitude and longitude
    // search is the city that they searched
    var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q="
    + search
    + "&appid="
    + apiKey

    fetch(apiUrlCurrent).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                // get latitude
                var lat = data.coord.lat
                // get longitude
                var lon = data.coord.lon
            
                // make second api call to get weather with lat and lon
                var apiUrlOneCall = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&exclude=minutely,hourly&lat="
                + lat
                +"&lon="
                + lon
                +"&appid="
                +apiKey

                fetch(apiUrlOneCall).then(function(response) {
                    if(response.ok){
                        response.json().then(function(data) {
                            // once data it gotten pass it to the tow functions
                            // below to build the page
                            currentForecastDisplay(data)
                            futureForecastDisplay(data)
                        })
                    }else{
                        // if the fetch does not work console.log
                        console.log("Error with fetch call")
                    }
                    
                })

            })
        } else{
            // if the fetch does not work console.log
            console.log("Error with fetch call")
        }
    })
}


//function to make current day display
var currentForecastDisplay = function(data){
    // get unix date and convert it to milliseconds with function below
    var unixDate= data.current.dt
    // convert fuction
    convertDate(unixDate)

    // get weather icon from fetch data
    var iconId = data.current.weather[0].icon


    // Obj with classes for elements of the CDF
    var classes = {
        CDFDiv: "col-12 border border-2 border-dark rounded ps-2 bg-color-CDF ",
        CDFOther: "bottom-margin",
    }

    // add classes to CDF div that will hold info
    CDFDiv.classList = classes.CDFDiv
    

    // create h2 element to as title
    var CDFTitle = document.createElement("h2")
    CDFTitle.classList = classes.CDFOther
    // make first letter of city searched capitalized 
    CDFTitle.innerHTML = searchTerm.charAt(0).toUpperCase()+searchTerm.slice(1)
    // add icon to header
    + "<img src='https://openweathermap.org/img/wn/"
    + iconId
    +".png'/>"
    // add date to header
    + date
    CDFDiv.appendChild(CDFTitle)
   
    // create p tag for temp info
    var CDFTemp = document.createElement("p")
    CDFTemp.classList = classes.CDFOther
    CDFTemp.innerHTML = "Temp: "
    // data call from fetch
    + data.current.temp 
    + " F°"
    CDFDiv.appendChild(CDFTemp)
   
    
    // create p tag for wind info
    var CDFWind = document.createElement("p")
    CDFWind.classList = classes.CDFOther
    CDFWind.innerHTML = "Wind: "
    // data call from fetch
    + data.current.wind_speed
    +" MPH"
    CDFDiv.appendChild(CDFWind)
   
    
    // create p tag for humidity info
    var CDFHumidity = document.createElement("p")
    CDFHumidity.classList = classes.CDFOther
    CDFHumidity.innerHTML = "Humidity: "
    // data call from fetch
    + data.current.humidity
    +" %"
    CDFDiv.appendChild(CDFHumidity)
   
    
    
    // create p tag for UV index info
    var CDFUVIndex = document.createElement("p")
    CDFUVIndex.classList = classes.CDFOther
    CDFUVIndex.innerHTML = "UV Index: <span id='uvindex'>"
    // data call from fetch
    + data.current.uvi
    +"</span>"
    CDFDiv.appendChild(CDFUVIndex)

    //apply color to uv index
    //get uv index
    var uvIndex = data.current.uvi
    console.log(uvIndex)
    //call span with uv index
    var spanUV = document.querySelector("#uvindex")
    // if function to check uv and add color to uv index on page
    if(uvIndex>0&& uvIndex<=2){
        spanUV.className = "low"
    }else if(uvIndex>=2&&uvIndex<=5){
        spanUV.className = "medium"
    }else if(uvIndex>=6&&uvIndex<=7){
        spanUV.className = "high"
    }else if(uvIndex>=8){
        spanUV.className = "veryhigh"
    }

}

// function to display future weather or 5 day forecast in cards 
var futureForecastDisplay = function(data){

    // create title for FF
    var FFHeader = document.querySelector("#FF-header")
    FFHeader.innerHTML = "<h3>5-Day Forecast</h3>"

    // create temp array that con be looped through withe card elements
    var tempArr = []
    // get values from obj cards
    Object.values(cards).forEach(val => tempArr.push(val))

    // loop to make each card with data
    for(var i = 0; i < tempArr.length; i++) {
        // get unix date and convert it to milliseconds with function below
        var unixDate = data.daily[i+1].dt
        // convert function
        convertDate(unixDate)

       // get weather icon from fetch data
        var iconId = data.daily[i+1].weather[0].icon
        
        // classes for parts of the card
        var classes = {
            cardTitle: "card-title",
            cardText: "card-text",
            dayClasses: "card bg-color-card text-white",
        }

        // Obj to hold text for each part of the cards
        var infoObj ={
            temp: "Temp: "
            // data call from fetch
            + data.daily[i].temp.day 
            +" F°",
            wind: "Wind: "
            // data call from fetch
            + data.daily[i].wind_speed
            +" MPH",
            humidity:"Humidity: "
            // data call from fetch
            + data.daily[i].humidity
            +" %",
        }

        // variable to hold div the temparr indexes to
        var tempDay = tempArr[i]
        // give tempDay classes
        tempDay.classList = classes.dayClasses

        // create h5 tag to hold date for each day
        var FFDate= document.createElement("h5")
        FFDate.classList = classes.cardTitle
        FFDate.textContent = date
        tempDay.appendChild(FFDate)

        // create img tag to hold icon and set styles
        var FFIcon = document.createElement("img")
        FFIcon.src = "https://openweathermap.org/img/wn/"
        +iconId
        +".png"
        FFIcon.style.width = "40%"
        FFIcon.style.height = "40%"
        tempDay.appendChild(FFIcon)

        // create p tag to hold temp info
        var FFTemp = document.createElement('p')
        FFTemp.classList = classes.cardText
        FFTemp.innerHTML = infoObj.temp
        tempDay.appendChild(FFTemp)
        
        // create p tag to hold wind info
        var FFWind = document.createElement('p')
        FFWind.classList = classes.cardText
        FFWind.innerHTML = infoObj.wind
        tempDay.appendChild(FFWind)
        
        // create p tag to hold humidity info
        var FFHumidity = document.createElement('p')
        FFHumidity.classList = classes.cardText
        FFHumidity.innerHTML = infoObj.humidity
        tempDay.appendChild(FFHumidity)

    }
}



//when button on form is clicked get value, fetch and append data to page
searchBtn.addEventListener("click",function(){
    // clear page of content
    CDFDiv.innerHTML = ""
    CDFDiv.classList = ""

    // clear each card of content
    var tempArr = []
    Object.values(cards).forEach(val => tempArr.push(val))
    for(var i = 0; i < tempArr.length; i++) {
        tempArr[i].innerHTML = ""
    }
    // get value in the input and store it
    searchTerm = searchInput.value

    // push to search history
    searchHistory.push(searchTerm)
    // store searches
    saveSearches()
    // create a button for search histoy
    createButton(searchTerm)
    // make a fetch call
    fetchWeatherApi(searchTerm)
})

// when button is clicked from the search history list make fetch and append
// date to page
historyDiv.addEventListener("click",function(event) {
    // get id of clicked button
    // id has name of city
    var clicked = event.target.getAttribute("id")

    // clear page of content
    CDFDiv.innerHTML = ""
    CDFDiv.classList = ""

    // clear each card of content
    var tempArr = []
    Object.values(cards).forEach(val => tempArr.push(val))
    for(var i = 0; i < tempArr.length; i++) {
        tempArr[i].innerHTML = ""
    }
    
    // check to make sure clicked has data
    if(clicked){
        // set searchedTerm to clicked
        searchTerm = clicked
        // make fetch
        fetchWeatherApi(clicked)
    }
})

// function that will load all cities searched to page
loadSearches()