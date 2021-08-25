key = "b54be5b1349676c04d403d8a4c977392";
var nameCity ="Nukus"
var url=`http://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${key}`

const citycurrent = (name)=>{
 return url = `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}`
    
}

const inputcity = document.querySelector("#city");
const btnsubmit =document.querySelector(".btnsubmit");






let cityname="";
inputcity.addEventListener("change", function(e){
       cityname = e.target.value 
})

btnsubmit.addEventListener("click", (event)=>{
    event.preventDefault();
    const newurl = citycurrent(cityname)
    const clone = new Weathermake(newurl, cityname);
    clone.dataFetcher()
    clone.otherfunctions()
})



class Weathermake{
    constructor(url_api, nameofcity){
        this.url = url_api;
        this.city = nameofcity;
    }

    otherfunctions(){
        
    }







    dataFetcher(){
        const Xmlquery = new XMLHttpRequest();
        Xmlquery.open("GET", this.url)
        Xmlquery.addEventListener("load", function(){
            const data = Xmlquery.response;
            const puredata = JSON.parse(data)
            console.log(puredata);

// qalanin' atin belgilep qoyi  w
            const CityName = document.querySelector(".top1 h3")
            CityName.textContent = puredata.name;
//hazirgi waqttag'i temperaturani korsetiw
        
            const Temperature = document.querySelector(".gradus span")
            Temperature.textContent = KelvintoCelcium(puredata.main.feels_like);
             
//hawa rayi qnday 
            const HowItIslike = document.querySelector(".state")
            HowItIslike.textContent = puredata.weather[0].description
//wind spped qanshe /samal tezligi 
            const windspeed = document.querySelector(".wind-speed h5 span")
            windspeed.textContent = Math.floor(puredata.wind.speed*3.6)

//hummidity scale 
            const Humidity = document.querySelector(".humidity span")             
            Humidity.textContent = puredata.main.humidity
//max tempereture 
            const maxtemperature = document.querySelector(".maximum span")            
            maxtemperature.textContent = KelvintoCelcium(puredata.main.temp_min)
            
//mainicon of app

            const MainIcon = document.querySelector(".top3 #mainicon")
            MainIcon.classList.remove("wi-day-cloudy")
            MainIcon.classList.add(IconRender(puredata.weather[0].description, puredata.wind.speed, puredata.sys.sunrise, puredata.sys.sunset))
            console.log(IconRender(puredata.weather[0].description));
// weather temperature per hours

        function timely(){
        const currenttime = new Date()
        
        const Hours = document.querySelectorAll(".day1 .dayname")
        Hours.forEach((item, index )=> {
            
            if(index===0){
                item.textContent= `${currenttime.getHours()+1}:00`
            }
            else if(index===1){
                item.textContent= `${currenttime.getHours()+2}:00`
            }
            else if(index===2){
                item.textContent=`${currenttime.getHours()+3}:00`
            }
            else if(index===3){
                item.textContent=`${currenttime.getHours()+4}:00`
            }

        })
        const Temps = document.querySelectorAll(".day1 .kaizen")
        console.log(Temps);
        var averagetemp = KelvintoCelcium(puredata.main.temp_max)-KelvintoCelcium(puredata.main.temp_min);
        Temps.forEach((item,index)=>{
            if(currenttime.getHours()>10 && currenttime.getHours()<16){
            if(index===0){
                item.textContent = KelvintoCelcium(puredata.main.feels_like-averagetemp);
            }
            else if(index===1){
                item.textContent = KelvintoCelcium(puredata.main.feels_like-averagetemp/3);
            }
            else if(index===2){
                item.textContent = KelvintoCelcium(puredata.main.feels_like-averagetemp/4);
            }
            else if(index===3){
                item.textContent = KelvintoCelcium(puredata.main.feels_like-averagetemp/5);
            }
         
        }
        else{
            if(index===0){
                item.textContent = KelvintoCelcium(puredata.main.feels_like-averagetemp);
            }
            else if(index===1){
                item.textContent = KelvintoCelcium(puredata.main.feels_like-averagetemp-3);
            }
            else if(index===2){
                item.textContent = KelvintoCelcium(puredata.main.feels_like-averagetemp-4);
            }
            else if(index===3){
                item.textContent = KelvintoCelcium(puredata.main.feels_like-averagetemp-5);
            }
        }
        })

        
        }
        
        timely()



        })
        Xmlquery.send();
    }
}




function KelvintoCelcium(Feels){
    const Feelslike = Math.floor(Feels-273.16);
    return Feelslike
}


const newurl = citycurrent("nukus")
    const clone = new Weathermake(newurl, "nukus");
    clone.dataFetcher()
    clone.otherfunctions()




function IconRender(stateofweather, speed=3, sunrise, sunset){
    const timezone = new Date();
    
    // SunRiseSet(sunset)[0]
    var setHours = SunRiseSet(sunset)[0]
    var setMinutes = SunRiseSet(sunset)[1]

    var riseHours = SunRiseSet(sunrise)[0]
    var riseMinutes = SunRiseSet(sunrise)[1]
    
    var currenthour = timezone.getHours();
    var currentMinutes = timezone.getMinutes();
    
    function hourCompare (sethour, setminute, risehour, riseminute, currenthour, currentminute ) {
        if(risehour<currenthour && sethour>currenthour){
            return true
        }else{
            if(risehour >= currenthour || sethour<= currenthour){
                // if(riseminute < currentminute && setminute > currentminute){
                //     return true
                // }else{
                //     return false
                // }
                return false
            }
            
        }
    }

    console.log(hourCompare(setHours, setMinutes, riseHours, riseMinutes, currenthour, currentMinutes))

    var MODE = hourCompare(setHours, setMinutes, riseHours, riseMinutes, currenthour, currentMinutes)

    switch(stateofweather){
        case "cloudy": 
            if(speed<10){
                return "wi-day-cloudy";
            } else {
                return "wi-day-cloudy-gusts"
            };

        case "rainy" : 
            if(MODE){
                return "wi-day-rain";
            }else{
                return "wi-night-alt-sleet"
            };
        
        case "clear sky":
             if(MODE){
                return "wi-day-sunny";
            }else{
                return "wi-night-clear"
            };
             
        case "overcast clouds":
             if(MODE){
                return "wi-day-sunny-overcast";
            }else{
                return "wi-night-alt-cloudy"
            } break;
             
        case "scattered clouds": 
            if(MODE){
                return "wi-day-cloudy-high";
                }else{
                    return "wi-night-alt-cloudy"
            }
        
        case "broken clouds": 
           if(MODE){
            return "wi-day-cloudy-high";
            }else{
                return "wi-night-alt-cloudy-high"
        }
             

        case "light rain":
            if(MODE){
                return "wi-day-sleet";
            }else{
                return "wi-night-alt-showers"
            }
             
        // default: return "wi-day-sunny";

    }
}


function SunRiseSet(sunrise){
    let unix_timestamp = sunrise 
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2)+':' + seconds.substr(-2);
        console.log(formattedTime)
        return [hours, Number(minutes.substr(-2))]
        
}