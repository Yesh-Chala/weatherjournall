/* Declaring the Global Variables of API Key and Url */
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "ede5d1c59a09219a114b8d201f947200&units=imperial"
const generate = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();
let newTime = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();

/******************************************************************************************** */
// The event listener that listens for the clickgenerate.addEventListener("click", gettingData);
generate.addEventListener("click", gettingData);


///Function to handle the event
function gettingData() {
      // Getting the information entered by the user
    const zip = document.getElementById("zip").value;
    const userFeeling = document.getElementById("feelings").value;
  // The function to get weather from the API
    getWeatherDAta(baseUrl+zip+"&appid="+apiKey).then(function(data){
        postData("http://localhost:8080/send",{
        temp: data.main.temp,
        date: newDate,
        time: newTime,
        content: userFeeling
        }).then(updateUI); // Invoking the function to dyanamically add the content to the DOM
    });   
    };

/********************************************************************************************** */    


  // This would fetch the actual data from the API
  const getWeatherDAta = async (url) => {
    const res = await fetch(url);
    try{
        const data = res.json();
        //console.log(data);
        return data;
    } catch{
        console.error("Error happened alert!!!!");
    };
};

/************************************************************************************************ */

  // Adding the fetched results to the array.
  const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
  
    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    } catch (error) {
      console.error("Oh my god err!!!!");
    }
  };

  /************************************************************************************************ */

    // To dyanamically update the content on to the DOM
    const updateUI = async () => {
    const req = await fetch("http://localhost:8080/bring");
    try {
      const allData = await req.json();
                // updating the new values

      document.getElementById("date").innerHTML = "Date:"+allData.date+" "+"Time:"+allData.time;
      document.getElementById("temp").innerHTML = "temperature:"+allData.temp+"kelvin";
      document.getElementById("content").innerHTML = "My Feeling:"+allData.content;
      console.log("Mission accomplished!!");
    } catch (error) {
      console.error("error bro!!");
    }
  };