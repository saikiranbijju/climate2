window.addEventListener('load',()=>{
    let long;
    let lat;
    //let temperatureDescription = document.querySelector(".temperature-description");
    //let temperatureDegree = document.querySelector('.temperature-degree');
    //let locationTimeZone = document.querySelector('.location-timezone');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy ="https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/5fd0a9e654ac5cfd8e3a2fd73fc8ca7f/${lat},${long}`;
             fetch(api)
             .then(response =>{
                 return response.json();
                })
            .then(data =>{
                console.log(data);
                
                document.querySelector(".temperatue-degree").textContent = data.currently.temperature;
                document.querySelector(".temperatue-description").textContent = data.currently.summary;
                document.querySelector(".location-timezone").textContent = data.timezone;
                
                //temperatureDescription.textContent = summary;
            setIcons(data.currently.icon,document.querySelector(".icon"));
        
             });
        });


    }
    function setIcons(icon,iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }
});