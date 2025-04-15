// Currency exchange rate API for reference
const Base_URL='https://latest.currency-api.pages.dev/v1/currencies/eur.json';

const btn=document.querySelector('.MyBtn');

let dropdownSe=document.querySelectorAll('.container select');

//Adding option to the dropdown menu
for(let selects of dropdownSe){

//Traversing through all the options and adding them to the dropdown as options
    for(code in countryList){
       let newOpts=document.createElement("option");
       newOpts.value=code;
       newOpts.innerText=code;
       selects.append(newOpts);

       //Making INR as default from country
       if(selects.name==="from" && code==="INR"){
          newOpts.selected="selected";
       }

     //Making USD as default to country
      else if(selects.name==="to"&& code==="USD"){
           newOpts.selected="selected";
      }
      
    }

      //If any option is selected, then the flag should be updated
       selects.addEventListener('change',(evt)=>{    
          updateFlag(evt.target);
      })

}

//Adding the country flag to the dropdown for the selected currency
function updateFlag(evt){
        let currCode=evt.value;
        let flagTag=countryList[currCode];
        let newSrc=`https://flagsapi.com/${flagTag}/flat/64.png`;
        evt.parentElement.querySelector("img").src=newSrc;
}

//Getting the informatin from the form when button is clicked
btn.addEventListener('click',async (e)=>{

    //Preventing the default behaviour of the form
    e.preventDefault();
    let amount=document.querySelector('#amounts').value;
    let fromCountry=dropdownSe[0].value;
    fromCountry=fromCountry.toLowerCase();
    let toCountry=dropdownSe[1].value;
    toCountry=toCountry.toLowerCase();

    // The API returns the exchange rate for the selected currency
    let url=`https://latest.currency-api.pages.dev/v1/currencies/${fromCountry}.json`;

    // Using fetch API to get the data from the URL
    let response=await fetch(url);

    // The data is in JSON format, so we need to parse it to get the exchange rate
    let data=await response.json();
    let exchangeRate=data[fromCountry][toCountry];

    //Calculating final amount in other currency
    let result=amount*exchangeRate;
    let msg=document.querySelector('.result p');

    //Using string interpolation to display the result
    msg.innerText=`${amount} ${fromCountry.toUpperCase()} = ${result.toFixed(2)} ${toCountry.toUpperCase()}`;
    msg.style.border=" 2px solid #CBA35C";
 });