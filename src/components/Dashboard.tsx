"use client"

import React from 'react'
import { useUser } from '@clerk/nextjs'
import { FaHome, FaBox, FaChartLine, FaUser, FaEdit, FaTrash } from 'react-icons/fa'
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Label } from './ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from 'next/navigation';

function Dashboard() {
  const { user } = useUser();

  const menuItems = [
    { name: 'Home', icon: <FaHome />, route: '/home' },
    { name: 'Products', icon: <FaBox />, route: '/dashboard/products' },
    { name: 'Statistics', icon: <FaChartLine />, route: '/dashboard/statistics' },
    { name: 'Profile', icon: <FaUser />, route: '/dashboard/profile' }
  ];

  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' }
  ];

  if(!user){
    const router = useRouter();
    router.push('/sign-in');
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white md:flex hidden flex-col">
        <nav className="mt-6 flex-1">
          <ul>
            {menuItems.map(item => (
              <li key={item.name} className="px-6 py-2 hover:bg-gray-700 cursor-pointer flex items-center">
                {item.icon}
                <span className="ml-4">{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold mb-6">Welcome, {user?.firstName}</h1>
        {/* Add Product Section */}
        <div className="mb-6 bg-blue-400 p-5 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
         <div className='space-y-6'>
         <Input placeholder='Product Name'/>
         <Input placeholder='Product Details'/>
         <Input placeholder='Price'/>
         
         <div>
         <Label htmlFor="picture" className='text-gray-700 ml-3'>Product Picture</Label>
        <Input id="picture" type="file" />
         </div>

         <Button>Add</Button>
         </div>
        </div>
        {/* Products Table */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4">Your Products</h2>
          <Table>
            <TableCaption>A list of your products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="text-right flex justify-end space-x-4">
                    <Popover>
                        <PopoverTrigger>
                            <FaEdit className="text-blue-500 cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className='space-y-6'>
                            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
                                <Input placeholder='Product Name'/>
                                <Input placeholder='Product Details'/>
                                <Input placeholder='Price'/>
                                
                                <div>
                                <Label htmlFor="picture" className='text-gray-500 ml-3'>Product Picture</Label>
                                <Input id="picture" type="file" />
                                </div>

                                <Button>Save</Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <FaTrash className="text-red-500 cursor-pointer" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
