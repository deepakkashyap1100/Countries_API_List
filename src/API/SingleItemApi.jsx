import { useParams } from "react-router-dom";
export const singleItemAPI= async({params})=>{
const params2= useParams();
// console.log(params2,'param2')
// console.log(params,"ApI page single Item")
    try {
        const response= await fetch(`https://restcountries.com/v3.1/name/${params.name}`);
        const apiData= response.json();
        return apiData; 
      } catch (error) {
        console.log(error,' error in api')  
      }
}