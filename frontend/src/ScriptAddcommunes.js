const axios = require('axios');
let list1 =
[
    
    {"nom":"Belaas","wilaya":"44"},                                                                 
    ]
    
    console.log("this is the liste ");
    const succes =()=>{
        console.log("this is the liste ",index,commune);
        console.log("success ");
      
    }

    list1.map(async(commune ,index)=>{
        
       doPostRequest(commune)
      console.log(" done ! ")
        
    })

    async function doPostRequest(commune) {

        let res = await  axios.post("http://127.0.0.1:8000/api/communes/",commune);
    
        let data = res.data;
        console.log(data);
    }
    

   

    console.log("liste inserted with success");

    



