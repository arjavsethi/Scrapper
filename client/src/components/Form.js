"use client"
import xlsx from "json-as-xlsx"
import React, {useState} from 'react'
import axios from 'axios';
export const Form = () => {
  const [productName ,setproductName] =  useState(null);
  const [noOfProduct ,setnoOfProduct] =  useState(null);
  const [loading, setLoading] = useState(false);
  const [product , setproduct] = useState(null);
 const onSubmit =async (e) =>{
  setLoading(true);
  e.preventDefault();
       const data = await   axios.post("http://localhost:4000/productDetails",{
            productName,
            noOfProduct
          })
         
          const product = data?.data?.data;
          console.log(product)
          const xlsxSheet = [{
            sheet : "AWS PRODUCT SCRAPPER" ,
            columns : [
              {
                label : "title",
                value : "title"
              },
              {
                label : "price",
                value : "price"
              },
              {
                label : "image",
                value : "image"
              },
              {
                label : "url",
                value : "url"
              },
              {
                label : "rating",
                value : "rating"
              },
              {
                label : "ranking",
                value : "ranking"
              },
              {
                label : "originalPrice",
                value : "originalPrice"
              },
              {
                label : "discount",
                value : "discount"
              },
              {
                label : "noOFReviews",
                value : "noOFReviews"
              },
              {
                label : "isDotd",
                value : "isDotd"
              },
              {
                label : "isFreeDelivery",
                value : "isFreeDelivery"
              },

            ],
            content : product
  } ]
          let settings = {
            fileName: "MySpreadsheet",
          }
          let x = [
            {
              sheet: "Adults",
              columns: [
                { label: "User", value: "user" }, // Top level data
                { label: "Age", value: "age", format: '# "years"' }, // Custom format
                { label: "Phone", value: (row) => row?.more?.phone ?? "" }, // Run functions
              ],
              content: [
                { user: "Andrea", age: 20, more: { phone: "11111111" } },
                { user: "Luis", age: 21, more: { phone: "12345678" } },
              ],
            },
            {
              sheet: "Children",
              columns: [
                { label: "User", value: "user" }, // Top level data
                { label: "Age", value: "age", format: '# "years"' }, // Custom format
                { label: "Phone", value: (row) => row?.more?.phone ?? "" }, // Run functions
              ],
              content: [
                { user: "Manuel", age: 16, more: { phone: "99999999" } },
                { user: "Ana", age: 17, more: { phone: "87654321" } },
              ],
            },
          ]
          xlsx(xlsxSheet, settings)
 }
  return (
    <div className="App bg-white h-screen w-screen relative overflow-hidden flex flex-col justify-center items-center">
    <div className="h-40-r w-40-r rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 absolute left-2/3 -top-56"></div>
    <div className="h-35-r w-35-r rounded-full bg-gradient-to-r from-purple-300 via-blue-400 to-emerald-400 absolute top-96 -left-20 "></div>
    <div className="container h-96 w-96 bg-opacity-10 rounded-2xl relative z-2 shadow-5xl border border-r-0 border-b-0 border-opacity-30 backdrop-filler backdrop-blur-sm overflow-hidden">
      <form
        className="h-full flex flex-col justify-evenly items-center"
      >
        <h1 className="prose prose-base text-black text-2xl tracking-wider cursor-none">
          Amazon SCRAPER
        </h1>
        <input
          type="text"
          required
          onChange={(e)=>{
            setproductName(e.target.value);
          }}
          placeholder="Name of the Product"
          className="input-text"
        />
         <input
          type="number"
          required
          onChange={(e)=>{
            setnoOfProduct(e.target.value);
          }}
          placeholder="Number of product"
          className="input-text"
        />
     

        <button
          onClick={onSubmit}
          type="button"
          className="prose prose-base text-white cursor-pointer px-5 py-1 rounded-full bg-gradient-to-r from-emerald-300 to-emerald-400 bg-opacity-50 hover:bg-opacity-80"
        >
          Download CSV
        </button>
      </form>
    </div>
  </div>
  )
}
