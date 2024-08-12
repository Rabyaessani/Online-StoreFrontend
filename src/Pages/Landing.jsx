import React from 'react'
import { Hero,FeaturedProducts } from '../Components'
import { formatPrice, CustomFetch,generateAmountOptions } from "../util";


const url = '/products?featured=true'

export const loader = async() =>{
const response = await CustomFetch(url)
// console.log(response.data.data)
const products = response.data.data;
return {products}
}

const Landing = () => {
  return (
    <>
    <Hero/>
    <FeaturedProducts/>
    </>
  )
}

export default Landing