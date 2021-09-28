//value for input form
var searchInput = document.querySelector("#search-input")


//search button call
var searchBtn = document.querySelector("#search-btn")


var apiKey = "5bdea9a85704cee38790f2d31b062496"



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







searchBtn.addEventListener("click",function(){
    var searchTerm = searchInput.value
    fetchWeatherApi(searchTerm)
})

