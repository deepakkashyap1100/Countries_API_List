export const countryApi= async ()=>{ 
    try {
        const response= await fetch('https://restcountries.com/v3.1/all');
        const apiData= response.json();
        // console.dir(apiData,'apidata');
        // console.log(typeof(apiData));
        return apiData;
      } catch (error) {
        console.log(error) 
      }

}

