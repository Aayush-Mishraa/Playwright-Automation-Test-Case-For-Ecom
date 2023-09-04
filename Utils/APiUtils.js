// class APiUtils
// {
//     // to call the class object we will make a constructor

//     constructor(apiContext,loginPayload)
//     {
//         this.apiContext = apiContext;
//         this.loginPayload = loginPayload;
//     }
//     async getToken()

//     {
//         const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
//         {
//             data:this.loginPayload 
//         })

//         // expect(loginResponse.ok()).toBeTruthy();
//         const loginResponseJson=  await loginResponse.json();
//         const token = loginResponseJson.token;
//         console.log(token);  
//         return token; //this will give token 
//     }


//     async createOrder(orderPayload)
//     {
//     let response = {}; //create a dummy object so for this obect we add the poperties
//     response.token = await this.getToken();
//     const orderResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
//     {
//        data:orderPayload,
//        Headers:
//        {
//           'Autherization': response.token, //we directly call the method of gettoken and it inject the token dynamicly at the the run time in the header 
//           'content-type' : 'application/json'
//        }
//     })
//     const orderResponseJson = await orderResponse.json();
//     console.log(orderResponseJson);
//     const orderId = orderResponseJson.orders[0];
//     response.orderId = orderId;
//     return response;  //now this holeds tow thinks oderid + token 


//    }
// }


// // we have to export the class to visible to other class 
// module.exports ={APiUtils};


class APiUtils
{

    constructor(apiContext,loginPayLoad)
    {
        this.apiContext =apiContext; 
        this.loginPayLoad = loginPayLoad;
        
    }

    async getToken()
     {
        const loginResponse =  await  this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayLoad
         } )//200,201,
        const loginResponseJson = await loginResponse.json();
        const token =loginResponseJson.token;
        console.log(token);
        return token;

    }

    async createOrder(orderPayLoad)
    {
        let response = {};
       response.token = await this.getToken();
    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
   {
    data : orderPayLoad,
    headers:{
                'Authorization' :response.token,
                'Content-Type'  : 'application/json'
            },

   })
   const orderResponseJson =await orderResponse.json();
   console.log(orderResponseJson);
  const orderId = orderResponseJson.orders[0];
   response.orderId = orderId;

   return response;
}

    }
module.exports = {APiUtils};




