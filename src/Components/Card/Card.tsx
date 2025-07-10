import React, {useState} from 'react'
import './Card.css'
import Button from "../Button/Button";


interface Product {
    product: {
        title: string;
        Image: string;
        price: number;
        id: number;
    };
};

function Card({product}: Product}) {
    const [count, setCount] = useState(0);

    const {title, Image, price, id } = product;

    const handleIncrement = () => {
        setCount(count+1);
        onAdd(food);
    };
    const handleDecrement = () => {
        setCount(count-1);
        onRemove(food);
    };
  return (
    <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt="">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>
</a>
  )
}

export default Card
