// CDF stands for Current Date Forecaste
// FF stands for Future Forecast
//value for input form
var searchInput = document.querySelector("#search-input")

//search button call
var searchBtn = document.querySelector("#search-btn")

//Current date forecast element call
var CDFDiv = document.querySelector("#CDF-Div")

//array to hold strings that will generate buttons for the search history
var searchHistory = []

// global variable to hold searched city
var searchTerm = ""

//weather api key
var apiKey = "5bdea9a85704cee38790f2d31b062496"

//obj with different cards are needed to append infomation to 
const cards = {
    card1: document.querySelector("[data-day= '0']"),
    card2: document.querySelector("[data-day= '1']"),
    card3: document.querySelector("[data-day= '2']"),
    card4: document.querySelector("[data-day= '3']"),
    card5: document.querySelector("[data-day= '4']"),
}


var saveSearches = function(){
    localStorage.setItem("search-history", JSON.stringify(searchHistory))
}

var loadSearches = function() {
    localStorage.getItem("search-history")
}

//fetch weather api function
var fetchWeatherApi = function(search){

    var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q="
    + search
    + "&appid="
    + apiKey

    fetch(apiUrlCurrent).then(function(response){
        if (response.ok){
            response.json().then(function(data){

                var lat = data.coord.lat
                
                var lon = data.coord.lon
            
                
                var apiUrlOneCall = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&exclude=minutely,hourly&lat="
                + lat
                +"&lon="
                + lon
                +"&appid="
                +apiKey

                fetch(apiUrlOneCall).then(function(response) {
                    if(response.ok){
                        response.json().then(function(data) {

                            currentForecastDisplay(data)
                            futureForecastDisplay(data)
                        })
                    }else{
                        console.log("Error with fetch call")
                    }
                    
                })

            })
        } else{
            console.log("Error with fetch call")
        }
    })
}


//function to make current day display
var currentForecastDisplay = function(data){
    var iconId = data.current.weather[0].icon


    var classes = {
        CDFDiv: "col-12 border border-2 ps-2",
        CDFOther: "bottom-margin",
    }

    CDFDiv.classList = classes.CDFDiv
    

    var CDFTitle = document.createElement("h2")
    CDFTitle.classList = classes.CDFOther
    
    CDFTitle.innerHTML = searchTerm.charAt(0).toUpperCase()+searchTerm.slice(1)
    + "<img src='https://openweathermap.org/img/wn/"
    + iconId
    +".png'/>"
    CDFDiv.appendChild(CDFTitle)
   

    var CDFTemp = document.createElement("p")
    CDFTemp.classList = classes.CDFOther
    CDFTemp.innerHTML = "Temp: <span id='CDF-temp'>"
    + data.current.temp 
    + "</span> F°"
    CDFDiv.appendChild(CDFTemp)
   
    

    var CDFWind = document.createElement("p")
    CDFWind.classList = classes.CDFOther
    CDFWind.innerHTML = "Wind: <span id='CDF-wind'>"
    + data.current.wind_speed
    +"</span> MPH"
    CDFDiv.appendChild(CDFWind)
   
    

    var CDFHumidity = document.createElement("p")
    CDFHumidity.classList = classes.CDFOther
    CDFHumidity.innerHTML = "Humidity: <span id='CDF-humidity'>"
    + data.current.humidity
    +"</span> %"
    CDFDiv.appendChild(CDFHumidity)
   
    

    var CDFUVIndex = document.createElement("p")
    CDFUVIndex.classList = classes.CDFOther
    CDFUVIndex.innerHTML = "UV Index: <span id='CDF-UV-index'>"
    + data.current.uvi
    +"</span>"
    CDFDiv.appendChild(CDFUVIndex)
   

}


var futureForecastDisplay = function(data){

    var FFHeader = document.querySelector("#FF-header")
    FFHeader.innerHTML = "<h3>5-Day Forecast</h3>"

    var tempArr = []
    Object.values(cards).forEach(val => tempArr.push(val))



    for(var i = 0; i < tempArr.length; i++) {
        var dateUnix = data.daily[i].dt
        // convert to milliseconds
        var dateFormat = new Date(dateUnix*1000)
        var dateYear = dateFormat.getFullYear()
        var dateMonth = dateFormat.getMonth()+1
        var dateDay = dateFormat.getDate()
        var date = dateMonth +"/" + dateDay + "/" + dateYear

        var iconId = data.daily[i+1].weather[0].icon
        

        var classes = {
            cardTitle: "card-title",
            cardText: "card-text",
        }


        var infoObj ={
            temp: "Temp: <span data-day-temp='1'>"
            + data.daily[i].temp.day 
            +"</span> F°",
            wind: "Wind: <span data-day-wind='1'>"
            + data.daily[i].wind_speed
            +"</span> MPH",
            humidity:"Humidity: <span data-day-humidity='1'>"
            + data.daily[i].humidity
            +"</span> %",
        }


        var tempDay = tempArr[i]
        tempDay.classList = "card bg-color text-white"


        var FFDate= document.createElement("h5")
        FFDate.classList = classes.cardTitle
        FFDate.textContent = date
        tempDay.appendChild(FFDate)

        var FFIcon = document.createElement("img")
        FFIcon.src = "https://openweathermap.org/img/wn/"
        +iconId
        +".png"
        FFIcon.style.width = "40%"
        FFIcon.style.height = "40%"
        tempDay.appendChild(FFIcon)


        var FFTemp = document.createElement('p')
        FFTemp.classList = classes.cardText
        FFTemp.innerHTML = infoObj.temp
        tempDay.appendChild(FFTemp)
        


        var FFWind = document.createElement('p')
        FFWind.classList = classes.cardText
        FFWind.innerHTML = infoObj.wind
        tempDay.appendChild(FFWind)
        


        var FFHumidity = document.createElement('p')
        FFHumidity.classList = classes.cardText
        FFHumidity.innerHTML = infoObj.humidity
        tempDay.appendChild(FFHumidity)

    }
}



//when button on form is clicked get value and fetch
searchBtn.addEventListener("click",function(){
    CDFDiv.innerHTML = ""
    CDFDiv.classList = ""

    var tempArr = []
    Object.values(cards).forEach(val => tempArr.push(val))
    for(var i = 0; i < tempArr.length; i++) {
        tempArr[i].innerHTML = ""
    }

    searchTerm = searchInput.value

    searchHistory.push(searchTerm)
    saveSearches()
    fetchWeatherApi(searchTerm)
})

