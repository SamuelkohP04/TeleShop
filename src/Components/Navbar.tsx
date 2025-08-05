import { useState } from "react";

import { useRouter } from "next/navigation";

import { auth } from "@/app/firebase/config";
import { db } from "@/app/firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import CartCard from "./CartCard";

function Navbar() {
    const [cart, setCart] = useState<object>(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") as string) : {})
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const router = useRouter();
    const products: Product[] = [{ id: "1", cat: "Crystal", name: "crystal1", desc: "this is a crystal", image: "/crystal1.png", images: [], price: 10.2, amount: 1 }, { id: "2", cat: "Statue", name: "PiXiu 貔貅", desc: "Golden Lion Statue", image: "/lion2.png", images: [], price: 10.2, amount: 1 }, { id: "3", cat: "Incense", name: "Incense Burner (倒流香)", desc: "Incense Burner", image: "/incense2.png", images: [], price: 10.2, amount: 1 }, { id: "4", cat: "Incense", name: "Rose Wood Incense Burner", desc: "Rose Wood Incense Burner", image: "/incense3.png", images: [], price: 10.2, amount: 1 }]

    onAuthStateChanged(auth, (user) => {
        if (user && user.email) setIsLoggedIn(true);
    });

    function handleLogout(): void {
        signOut(auth)
            .then(() => {
                router.push("/login")
            });
    }

    async function handleCheckout(): Promise<void> {
        if (auth.currentUser) {
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                cart: cart
            });

            localStorage.removeItem("cart");
        }

        setCart([]);
    }
    
    if (isLoggedIn) {
        return (
            <div className="w-full h-20 flex justify-center bg-neutral-200">
                <div className="w-3/4 h-full flex justify-between items-center text-2xl font-bold max-lg:w-5/6">
                    <h1 onClick={() => router.push("/")}>LOGO</h1>
                    <div className="flex gap-8">
                        <Sheet>
                            <div className="flex gap-8 max-lg:gap-4">
                                <SheetTrigger className="flex items-center gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>
                                    <div className="w-8 h-8 flex justify-center items-center bg-white rounded-full text-base">{cart ? Object.keys(cart).length : 0}</div>
                                </SheetTrigger>
                                <Button className="font-semibold max-lg:hidden" variant="link"  onClick={() => router.push("/products")}>Products</Button>
                                <Button className="font-semibold max-lg:hidden" variant="link" onClick={handleLogout}>Logout</Button>
                            </div>
                            <SheetContent className="flex flex-col justify-between bg-neutral-200 overflow-scroll pb-0">
                                <SheetHeader className="flex flex-col gap-4">
                                    <div>
                                        <SheetTitle className="text-2xl">Cart</SheetTitle>
                                        <SheetDescription>
                                            You have {cart ? Object.keys(cart).length : 0} items in your cart
                                        </SheetDescription>
                                    </div>
                                    {Object.keys(cart).map((key: string) => {
                                        const product: Product = products.filter((product: Product) => product.id === key)[0];

                                        return (
                                            <CartCard key={product.id} product={product} setCart={setCart} />
                                        );
                                    })}
                                </SheetHeader>
                                <div className="sticky bottom-0 bg-neutral-200 py-4">
                                    <Dialog>
                                        <DialogTrigger className="w-full bg-white rounded-md text-sm text-black font-medium py-2.5 hover:bg-neutral-300" onClick={handleCheckout}>Checkout</DialogTrigger>
                                        <DialogContent className="bg-neutral-200">
                                            <DialogHeader className="flex flex-col gap-2">
                                                <div>
                                                    <DialogTitle>Successful Checkout</DialogTitle>
                                                    <DialogDescription>
                                                        Thank you for your purchase!
                                                    </DialogDescription>
                                                </div>
                                                <div className="flex justify-center items-center">
                                                    <svg className="w-1/3 h-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path className="fill-green-500" d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                                                </div>
                                                <h1 className="text-center">Head over to Telegram to complete the purchase</h1>
                                                <DialogClose asChild>
                                                    <Button className="bg-white text-black hover:bg-neutral-300">Next</Button>
                                                </DialogClose>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </SheetContent>
                        </Sheet>
                        <Sheet>
                            <div className="flex gap-8 lg:hidden max-lg:gap-4">
                                <SheetTrigger className="flex items-center gap-4">
                                    <svg className="fill-black" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                                </SheetTrigger>
                            </div>
                            <SheetContent className="flex flex-col justify-between bg-neutral-200 overflow-scroll pb-0">
                                <SheetHeader className="flex flex-col gap-4">
                                    <div>
                                        <SheetTitle className="text-2xl">Menu</SheetTitle>
                                    </div>
                                    <Button className="font-semibold" variant="link"  onClick={() => router.push("/products")}>Products</Button>
                                    <Button className="font-semibold" variant="link" onClick={handleLogout}>Logout</Button>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-20 flex justify-center bg-neutral-200">
            <div className="w-3/4 h-full flex justify-between items-center text-2xl font-bold">
                <h1 onClick={() => router.push("/")}>LOGO</h1>
                <Sheet>
                    <div className="flex gap-8">
                        <Button className="font-semibold" variant="link" onClick={() => router.push("/login")}>Login</Button>
                    </div>
                    <SheetContent className="bg-neutral-200 overflow-scroll">
                        <SheetHeader className="flex flex-col gap-4">
                            <div>
                                <SheetTitle className="text-2xl">Cart</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </SheetDescription>
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}

export default Navbar