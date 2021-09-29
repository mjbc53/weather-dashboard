//value for input form
var searchInput = document.querySelector("#search-input")

//search button call
var searchBtn = document.querySelector("#search-btn")

//Current date forecast element call
var currentDateForcast = document.querySelector("#current-date-forecast")

//array to hold strings that will generate buttons for the search history
var searchHistory = []

var search = ""
//weather api key
var apiKey = "5bdea9a85704cee38790f2d31b062496"

//different cards need to append infomation to 
const cards = {
    card1: document.querySelector("[data-day= '1']"),
    card2: document.querySelector("[data-day= '2']"),
    card3: document.querySelector("[data-day= '3']"),
    card4: document.querySelector("[data-day= '4']"),
    card5: document.querySelector("[data-day= '5']"),
}


var saveSearches = function(){
    localStorage.setItem("search history", JSON.stringify(searchHistory))
}

//fetch weather api function
var fetchWeatherApi = function(search){

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q="
    + search
    + "&appid="
    + apiKey

    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data)
            })
        } else{
            console.log("Error with fetch call")
        }
    })
}


//function to make current day display
var currentForecastDisplay = function(){
    var classes = {
        CDFDiv: "col-12 border border-2 ps-2",
        CDFOther: "bottom-margin",
    }
    var CDFDiv = document.querySelector("#CDF-Div")
    CDFDiv.classList = classes.CDFDiv
    currentDateForcast.appendChild(CDFDiv)

    var CDFTitle = document.createElement("h2")
    CDFTitle.classList = classes.CDFOther
    CDFTitle.textContent = "atlanta"
    CDFDiv.appendChild(CDFTitle)
   

    var CDFTemp = document.createElement("p")
    CDFTemp.classList = classes.CDFOther
    CDFTemp.innerHTML = "Temp: <span id='CDF-temp'></span>"
    CDFDiv.appendChild(CDFTemp)
   
    

    var CDFWind = document.createElement("p")
    CDFWind.classList = classes.CDFOther
    CDFWind.innerHTML = "Wind: <span id='CDF-wind'></span>"
    CDFDiv.appendChild(CDFWind)
   
    

    var CDFHumidity = document.createElement("p")
    CDFHumidity.classList = classes.CDFOther
    CDFHumidity.innerHTML = "Humidity: <span id='CDF-humidity'></span>"
    CDFDiv.appendChild(CDFHumidity)
   
    

    var CDFUVIndex = document.createElement("p")
    CDFUVIndex.classList = classes.CDFOther
    CDFUVIndex.innerHTML = "UV Index: <span id='CDF-UV-index'></span>"
    CDFDiv.appendChild(CDFUVIndex)
   

}


var futureForecastDisplay = function(){
    //debugger

    var FFHeader = document.querySelector("#FF-header")
    console.log(FFHeader)
    FFHeader.innerHTML = "<h3>5-Day Forecast</h3>"

    var tempArr = []
    Object.values(cards).forEach(val => tempArr.push(val))
    console.log(tempArr)


    for(var i = 0; i < tempArr.length; i++) {

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



    var p1 = document.createElement('p')
    p1.classList = classes.cardText
    p1.innerHTML = infoObj.temp
    tempDay.appendChild(p1)
    console.log(p1)


    var p2 = document.createElement('p')
    p2.classList = classes.cardText
    p2.innerHTML = infoObj.wind
    tempDay.appendChild(p2)
    console.log(p2)


    var p3 = document.createElement('p')
    p3.classList = classes.cardText
    p3.innerHTML = infoObj.humidity
    tempDay.appendChild(p3)
    console.log(p3)

    }
}



//when button on form is clicked get value and fetch
searchBtn.addEventListener("click",function(){
    var searchTerm = searchInput.value
    console.log(searchHistory)
    searchHistory.push(searchTerm)
    saveSearches()
    fetchWeatherApi(searchTerm)
})

//futureForecastDisplay()
//currentForecastDisplay()