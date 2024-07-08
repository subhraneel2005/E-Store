"use client"

import React from 'react'
import {productsData} from "@/components/products"
import ProductCard from './ProductCard'
import { useRouter } from 'next/navigation';

function Homepage() {

    const router = useRouter();

    const handleClick = (id:number) => {
        router.push(`/products/${id}`)
    }

  return (
    <div className='min-h-screen w-full'>
        <img src='/banner1.png' alt='bannerImage' className='w-full overflow-hidden h-[190px] md:h-[270px]'/>
        <div className='w-full px-4 grid grid-cols-3'>
            {productsData.map((product) => (
                <div onClick={() => handleClick(product._id)}>
                    <ProductCard _id={product._id} title={product.title} image={product.image} brand={product.brand} category={product.category} description={product.des} isNew={product.isNew} oldPrice={product.oldPrice} price={product.price} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Homepage