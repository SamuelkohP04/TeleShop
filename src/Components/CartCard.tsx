import { useEffect, useState } from "react";

import Image from "next/image";

import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function CartCard({ product, setCart }: { product : Product, setCart: any }) {
    const [amount, setAmount] = useState<number>(product.amount);

    function handleAdd(): void {
        setAmount((amount) => amount += 1);
    }

    function handleRemove(): void {
        setAmount((amount) => amount -= 1);
    }

    useEffect(() => {
        if (amount <= 0) setCart((cart: Product[]) => cart.filter((cartProduct: Product) => cartProduct.id !== product.id));
    }, [amount]);

    return (
        <Card className="w-full flex flex-col bg-neutral-100 border-0 rounded">
            <CardHeader>
                <AspectRatio ratio={16 / 9}>
                    <Image className="rounded object-cover" src={product.image} alt="" fill />
                </AspectRatio>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col items-start">
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.desc}</CardDescription>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-8 max-md:gap-4">
                        <Button className="w-8 h-8 bg-white rounded-full" onClick={handleAdd}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        </Button>
                        <h1>{amount}</h1>
                        <Button className="w-8 h-8 bg-white rounded-full" onClick={handleRemove}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-440v-80h560v80H200Z"/></svg>
                        </Button>
                    </div>
                    <h1>${(amount * product.price).toFixed(2)}</h1>
                </div>
            </CardContent>
        </Card>
    );
}

export default CartCard