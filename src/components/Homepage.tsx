"use client"

import React from 'react'
import {productsData} from "@/components/products"
import ProductCard from './ProductCard'
import { useRouter } from 'next/navigation';
import SkeletonLoader from './SkeletonLoader';
import { useUser } from '@clerk/nextjs';

function Homepage() {

    const router = useRouter();

    const handleClick = (id:number) => {
        router.push(`/products/${id}`)
    }

    const {user} = useUser();

    const dashoardHandler = () => {
        if(!user){
            router.push("/sign-in")
        }
        else{
            router.push("/dashboard")
        }
    }

  return (
    <div className='min-h-screen w-full'>
        <img onClick={dashoardHandler} src='/banner1.png' alt='bannerImage' className='w-full overflow-hidden h-[190px] cursor-pointer md:h-[270px]'/>
        <div className='w-full px-4 grid grid-cols-1 md:grid-cols-3'>
            {productsData.map((product) => (
                product ? (<div onClick={() => handleClick(product._id)}>
                <ProductCard _id={product._id} title={product.title} image={product.image} brand={product.brand} category={product.category} description={product.des} isNew={product.isNew} oldPrice={product.oldPrice} price={product.price} />
            </div>) : <SkeletonLoader/>
            ))}
        </div>
    </div>
  )
}

export default Homepage