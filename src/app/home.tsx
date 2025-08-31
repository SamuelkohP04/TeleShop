"use client"

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import ProductCard from "../components/ProductCard";
import { Product } from "../types";

import { AspectRatio } from "../components/ui/aspect-ratio"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import Navbar from "../components/Navbar";

function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);
    const router = useRouter();

    useEffect(() => {
        //setProducts([{ id: "1", name: "crystal1", desc: "this is a crystal", price: 10.2, amount: 1 }, { id: "2", name: "crystal2", desc: "this is a crystal", price: 10.2, amount: 1 }, { id: "3", name: "crystal3", desc: "this is a crystal", price: 10.2, amount: 1 }, { id: "4", name: "crystal4", desc: "this is a crystal", price: 10.2, amount: 1 }]);
        setProducts([{ id: "1", cat: "Crystal", name: "crystal1", desc: "this is a crystal", image: "/crystal1.png", images: [], price: 10.2, amount: 1 }, { id: "2", cat: "Statue", name: "PiXiu 貔貅", desc: "Golden Lion Statue", image: "/lion1.png", images: [], price: 10.2, amount: 1 }, { id: "3", cat: "Incense", name: "Incense Burner (倒流香)", desc: "Incense Burner", image: "/incense1.png", images: [], price: 10.2, amount: 1 }, { id: "4", cat: "Incense", name: "Rose Wood Incense Burner", desc: "Rose Wood Incense Burner", image: "/incense3.png", images: [], price: 10.2, amount: 1 }]);
    }, []);

    return (
        <>
            <Navbar cart={cart} setCart={setCart} />
            <div className="w-full h-full flex flex-col items-center pb-8 gap-8">
                <img className="w-full h-96 object-cover" src="https://mooncatcrystals.com/cdn/shop/articles/Aura-and-Other-Treated-Crystals-Why-I-Love-Them-Now-Mooncat-Crystals-759.jpg?v=1727646557&width=2048" />
                <div className="w-5/6 h-full flex flex-col justify-center items-center gap-8">
                    <h1 className="text-7xl font-semibold">Our Products</h1>
                    <h1 className="text-xl">Our products combine innovation, quality, and style to enhance your everyday life.</h1>
                    <div className="w-full h-full flex gap-8 max-lg:flex-col">
                        <Card className="w-1/3 grid grid-cols-1 overflow-hidden px-8 max-lg:w-full" onClick={() => router.push("/products")}>
                            <CardHeader className="flex flex-col justify-between row-start-1 col-start-1 px-0 pb-0 gap-2">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-4">
                                        <CardTitle className="text-5xl">Statues</CardTitle>
                                    </div>
                                    <p className="w-2/5 text-xl">Shop now</p>
                                </div>
                            </CardHeader>
                            <CardContent className="flex relative left-1/2 top-1/4 row-start-1 col-start-1 -rotate-6 px-0 gap-4">
                                <AspectRatio ratio={16 / 9}>
                                    <img src="/lion1.png" />
                                </AspectRatio>
                            </CardContent>
                        </Card>
                        <Card className="w-1/3 grid grid-cols-1 overflow-hidden px-8 max-lg:w-full" onClick={() => router.push("/products")}>
                            <CardHeader className="flex flex-col justify-between row-start-1 col-start-1 px-0 pb-0 gap-2">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-4">
                                        <CardTitle className="text-5xl">Incense Burners</CardTitle>
                                    </div>
                                    <p className="w-2/5 text-xl">Shop now</p>
                                </div>
                            </CardHeader>
                            <CardContent className="flex relative left-1/4 top-1/4 row-start-1 col-start-1 -rotate-6 px-0 gap-4">
                                <AspectRatio ratio={16 / 9}>
                                    <img src="/incense1.png" />
                                </AspectRatio>
                            </CardContent>
                        </Card>
                        <Card className="w-1/3 grid grid-cols-1 overflow-hidden px-8 max-lg:w-full" onClick={() => router.push("/products")}>
                            <CardHeader className="flex flex-col justify-between row-start-1 col-start-1 px-0 pb-0 gap-2">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-4">
                                        <CardTitle className="text-5xl">Crystals</CardTitle>
                                    </div>
                                    <p className="w-2/5 text-xl">Shop now</p>
                                </div>
                            </CardHeader>
                            <CardContent className="flex relative left-1/3 top-1/4 row-start-1 col-start-1 -rotate-6 px-0 gap-4">
                                <AspectRatio ratio={16 / 9}>
                                    <img src="/crystal1.png" />
                                </AspectRatio>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home