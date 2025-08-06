"use client"

import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);
    const [category, setCategory] = useState<string>("Crystal");
    let productList: Product[] = [];

    useEffect(() => {
        setProducts([
            { id: "1", cat: "Crystal", name: "crystal1", desc: "this is a crystal", image: "/crystal1.png", images: [], price: 10.2, amount: 1 },
            { id: "2", cat: "Statue", name: "PiXiu 貔貅", desc: "Golden Lion Statue", image: "/lion2.png", images: [], price: 10.2, amount: 1 },
            { id: "3", cat: "Incense", name: "Incense Burner (倒流香)", desc: "Incense Burner", image: "/incense2.png", images: [], price: 10.2, amount: 1 },
            { id: "4", cat: "Incense", name: "Rose Wood Incense Burner", desc: "Rose Wood Incense Burner", image: "/incense3.png", images: [], price: 10.2, amount: 1 }
        ]);
    }, []);

    return (
        <>
            <Navbar cart={cart} setCart={setCart} />
            <div className="w-full h-screen flex justify-center items-center bg-neutral-200">
                <div className="w-4/5 h-full flex max-lg:w-full max-lg:flex-col">
                    <div className="w-1/5 flex flex-col p-8 max-lg:w-full max-lg:flex-row max-lg:justify-center max-lg:p-0  max-lg:gap-8">
                        <h1 className="border-b-[1px] border-black text-xl font-semibold py-8 max-lg:hidden">Categories</h1>
                        <div className="flex items-center border-b-[1px] border-black py-8 gap-4 max-lg:border-0" onClick={() => setCategory("Crystal")}>
                            <img className="w-12 h-12 rounded-full object-cover max-lg:hidden" src="/crystal1.png" />
                            <h1 className="text-lg">Crystals</h1>
                        </div>
                        <div className="flex items-center border-b-[1px] border-black py-8 gap-4 max-lg:border-0" onClick={() => setCategory("Incense")}>
                            <img className="w-12 h-12 rounded-full object-cover max-lg:hidden" src="/incense1.png" />
                            <h1 className="text-lg">Incense Burners</h1>
                        </div>
                        <div className="flex items-center border-b-[1px] border-black py-8 gap-4 max-lg:border-0" onClick={() => setCategory("Statue")}>
                            <img className="w-12 h-12 rounded-full object-cover  max-lg:hidden" src="/lion1.png" />
                            <h1 className="text-lg">Statues</h1>
                        </div>
                    </div>
                    <div className="w-4/5 flex flex-col px-16 py-8 gap-8 max-lg:w-full">
                        <h1 className="text-7xl font-semibold">{category}</h1>
                        <p className="text-xl">Explore our collection of crystals, perfect for bringing balance, harmony, and positive energy into your life. Whether for healing, décor, or a thoughtful gift, find the perfect piece to inspire and uplift.</p>
                        {products.filter((product: Product) => product.cat === category).map((product: Product, index: number) => {
                            if (index % 3 === 0) productList = [];

                            productList.push(product);

                            if ((index + 1) % 3 === 0) {
                                return (
                                    <div className="flex gap-8 max-lg:flex-col max-lg:pb-8" key={index}>
                                        {productList.map((product2: Product) => {
                                            if (product2.cat === category) {
                                                return (
                                                    <ProductCard
                                                        key={product2.id}
                                                        product={product2}
                                                        image={product2.image}
                                                        /*setCart={setCart}*/
                                                    />
                                                );
                                            }
                                        })}
                                    </div>
                                );
                            }

                            if (index === products.filter((product: Product) => product.cat === category).length - 1) {
                                return (
                                    <div className="flex gap-8 max-lg:flex-col max-lg:pb-8" key={index}>
                                        {productList.map((product2: Product) => {
                                            if (product2.cat === category) {
                                                return (
                                                    <ProductCard
                                                        key={product2.id}
                                                        product={product2}
                                                        image={product2.image}
                                                        /*setCart={setCart}*/
                                                    />
                                                );
                                            }
                                        })}

                                        {Array(3 - productList.length).fill(0).map((_, index: number) => {
                                            return (
                                                <div className="w-1/3" key={index}></div>
                                            );
                                        })}
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
