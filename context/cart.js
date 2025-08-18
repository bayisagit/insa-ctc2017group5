"use client"

import { createContext,useState,useEffect} from "react"


export const cartContext=createContext()

export const CartProvider= ({children})=>{

    const [cartItems,setCartItems]=useState([])

    const addToCart=()=>{

    }

    const removeFromCart=()=>{


    }

    const clearCart=()=>{}

    const getCart= ()=>{




    }
    return <cartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCart }} >
        {children}
    </cartContext.Provider>

}
