"use client"

import { useState, useEffect } from "react";

import { useRouter, useParams } from "next/navigation";

import { auth } from "@/app/firebase/config";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

function ProductsId() {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);
    const [productImage, setProductImage] = useState<string | null>(null);
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const product: Product = products.filter((product: Product) => product.id === params.id)[0];

    useEffect(() => {
        setProducts([{ id: "1", cat: "Crystal", name: "crystal1", desc: "this is a crystal", image: "/crystal1.png", images: [], price: 10.2, amount: 1 }, { id: "2", cat: "Statue", name: "PiXiu 貔貅", desc: "Golden Lion Statue", image: "/lion1.png", images: [], price: 10.2, amount: 1 }, { id: "3", cat: "Incense", name: "Incense Burner (倒流香)", desc: "Incense Burner", image: "/incense1.png", images: [], price: 10.2, amount: 1 }, { id: "4", cat: "Incense", name: "Rose Wood Incense Burner", desc: "Rose Wood Incense Burner", image: "/incense3.png", images: [], price: 10.2, amount: 1 }]);
    }, []);

    useEffect(() => {
        if (product) setProductImage(product.image);
    }, [product]);

    function handleAddCart(e: any): void {
        e.stopPropagation();

        if (auth.currentUser) {
            if (cart.some((cartProduct: Product) => cartProduct.id === product.id)) {
                product.amount += 1;
                setCart([...cart]);
                toast({
                    title: `Increased ${product.name} to ${product.amount}`
                });
            } else {
                setCart((cart: Product[]) => [...cart, product]);
                toast({
                    title: `Added ${product.name} to cart!`
                });
            }
        } else {
            router.push("/login");
        }
    }

    if (product) {
        return (
            <>
                <Navbar cart={cart} setCart={setCart} />
                <div className="w-full h-screen flex justify-center bg-neutral-200">
                    <div className="w-2/3 h-2/3 flex gap-8 max-lg:w-full max-lg:flex-col max-lg:px-8">
                        <div className="w-3/5 flex gap-4 max-lg:w-full max-lg:flex-col">
                            <div className="w-1/6 flex flex-col gap-4 max-lg:hidden">
                                <img className="h-1/6 bg-white rounded object-cover" src={product.image} onClick={() => setProductImage(product.image)}/>
                                {product.images.map((image: string, index: number) => {
                                    return (
                                        <img className="h-1/6 bg-white rounded object-cover" key={index} src={image} onClick={() => setProductImage(image)}/>
                                    );
                                })}
                            </div>
                            <img className="min-w-[83.333333%] bg-white rounded object-cover" src={productImage} />
                        </div>
                        <div className="w-2/5 flex flex-col justify-between max-lg:w-full max-lg:gap-16">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-5xl font-semibold">{product.name}</h1>
                                <h1 className="text-lg font-semibold">{product.cat}</h1>
                                <h1>{product.desc}</h1>
                                <h1 className="text-2xl font-semibold">${product.price.toFixed(2)}</h1>
                            </div>
                            <Button onClick={handleAddCart}>Add to cart</Button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ProductsId