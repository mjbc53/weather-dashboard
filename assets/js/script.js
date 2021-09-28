//value for input form
var searchInput = document.querySelector("#search-input")

//search button call
var searchBtn = document.querySelector("#search-btn")

//Current date forecast element call
var currentDateForcast = document.querySelector("#current-date-forecast")


//weather api key
var apiKey = "5bdea9a85704cee38790f2d31b062496"


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
var currentDayDisplay = function(){
    var classes = ["col-12 border border-2 ps-2", "bottom-margin"]
    var CDFDiv = document.querySelector("#CDF-Div")
    CDFDiv.classList = classes[0]
    currentDateForcast.appendChild(CDFDiv)

    var CDFTitle = document.createElement("h2")
    CDFTitle.classList = classes[1]
    CDFTitle.textContent = "atlanta"
    CDFDiv.appendChild(CDFTitle)
   

    var CDFTemp = document.createElement("p")
    CDFTemp.classList = classes[1]
    CDFTemp.innerHTML = "Temp: <span id='CDF-temp'></span>"
    CDFDiv.appendChild(CDFTemp)
   
    

    var CDFWind = document.createElement("p")
    CDFWind.classList = classes[1]
    CDFWind.innerHTML = "Wind: <span id='CDF-wind'></span>"
    CDFDiv.appendChild(CDFWind)
   
    

    var CDFHumidity = document.createElement("p")
    CDFHumidity.classList = classes[1]
    CDFHumidity.innerHTML = "Humidity: <span id='CDF-humidity'></span>"
    CDFDiv.appendChild(CDFHumidity)
   
    

    var CDFUVIndex = document.createElement("p")
    CDFUVIndex.classList = classes[1]
    CDFUVIndex.innerHTML = "UV Index: <span id='CDF-UV-index'></span>"
    CDFDiv.appendChild(CDFUVIndex)
   

}




//when button on form is clicked get value and fetch
searchBtn.addEventListener("click",function(){
    var searchTerm = searchInput.value
    fetchWeatherApi(searchTerm)
})

currentDayDisplay()