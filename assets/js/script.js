//value for input form
var searchInput = document.querySelector("#search-input")

//search button call
var searchBtn = document.querySelector("#search-btn")

//Current date forecast element call
var currentDateForcast = document.querySelector("#current-date-forecast")
var CDFDiv = document.querySelector("#CDF-Div")

//array to hold strings that will generate buttons for the search history
var searchHistory = []

var search = ""

var searchTerm = ""

//weather api key
var apiKey = "5bdea9a85704cee38790f2d31b062496"

//different cards need to append infomation to 
const cards = {
    card1: document.querySelector("[data-day= '0']"),
    card2: document.querySelector("[data-day= '1']"),
    card3: document.querySelector("[data-day= '2']"),
    card4: document.querySelector("[data-day= '3']"),
    card5: document.querySelector("[data-day= '4']"),
}


var saveSearches = function(){
    localStorage.setItem("search history", JSON.stringify(searchHistory))
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
                console.log(data)
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
    currentDateForcast.appendChild(CDFDiv)

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
    //debugger

    var FFHeader = document.querySelector("#FF-header")
    console.log(FFHeader)
    FFHeader.innerHTML = "<h3>5-Day Forecast</h3>"

    var tempArr = []
    Object.values(cards).forEach(val => tempArr.push(val))
    console.log(tempArr)


    for(var i = 0; i < tempArr.length; i++) {
        var dateUnix = data.daily[i].dt
        var dateFormat = new Date(dateUnix*1000)
        var dateYear = dateFormat.getFullYear()
        var dateMonth = dateFormat.getMonth()
        var dateDay = dateFormat.getDay()
        var date = dateMonth +"/" + dateDay + "/" + dateYear

        var classes = {
            cardTitle: "card-title",
            cardText: "card-text",
        }


        var infoObj ={
            temp: "temp:<span data-day-temp='1'></span>",
            wind: "wind:<span data-day-wind='1'></span>",
            humidity:"Humidity:<span data-day-humidity='1'></span>",
        }


        console.log(i)
        console.log(tempArr[i])
        var tempDay = tempArr[i]
        console.log(tempDay)
        tempDay.className = "card"


        var h5 = document.createElement("h5")
        h5.classList = classes.cardTitle
        h5.textContent = "05/06/2020"
        tempDay.appendChild(h5)



        var FFTemp = document.createElement('p')
        FFTemp.classList = classes.cardText
        FFTemp.innerHTML = infoObj.temp
        tempDay.appendChild(FFTemp)
        console.log(FFTemp)


        var FFWind = document.createElement('p')
        FFWind.classList = classes.cardText
        FFWind.innerHTML = infoObj.wind
        tempDay.appendChild(FFWind)
        console.log(FFWind)


        var FFHumidity = document.createElement('p')
        FFHumidity.classList = classes.cardText
        FFHumidity.innerHTML = infoObj.humidity
        tempDay.appendChild(FFHumidity)
        console.log(FFHumidity)

    }
}



//when button on form is clicked get value and fetch
searchBtn.addEventListener("click",function(){
    CDFDiv.innerHTML = ""
    CDFDiv.classList = ""

    // var tempArr = []
    // Object.values(cards).forEach(val => tempArr.push(val))
    // for(var i = 0; i < tempArr.length; i++) {
    //     tempArr[i].innerHTML = ""
    // }

    searchTerm = searchInput.value
    console.log(searchHistory)
    searchHistory.push(searchTerm)
    saveSearches()
    fetchWeatherApi(searchTerm)
})

//futureForecastDisplay()
//currentForecastDisplay()