import Image from "next/image";
import React, { useState } from "react";

interface IPropsProduct {
    name: string;
    price: string;
    image: string;
    imageAlt: string;
    quantity: number;
    addProduct: (product: string, quantity: number) => void;
    removeProduct: (product: string, quantity: number) => void;
}

export default function Product(props: IPropsProduct) {
    const [count, setCount] = useState(props.quantity);

    const addProduct = () => {
        setCount(count => count + 1);

        props.addProduct(props.name, count + 1);
    };

    const removeProduct = () => {
        setCount(count => count - 1);

        props.removeProduct(props.name, count - 1);
    };

    return (
        <div className="w-full relative p-4 border border-[rgba(0,0,0,0.1)] rounded-md grid grid-cols-1 md:grid-cols-[80px_auto_70px] md:gap-x-5 items-center">
            <div>
                <Image
                    src={props.image}
                    alt={props.imageAlt}
                    width={200}
                    height={200}
                    className="block w-32 h-32 md:w-20 md:h-20 object-cover mb-6 md:mb-0 rounded-md"
                />
            </div>

            <div className="mb-6 md:mb-0 md:col-start-2 md:col-end-4">
                <h3 className="text-sm uppercase font-semibold mb-8 md:mb-4 text-center md:text-left">
                    {props.name}
                </h3>

                <div className="max-w-xs md:mr-auto md:inline-block mb-4 md:mb-0">
                    <h4 className="block mb-4 font-medium text-text uppercase text-xs text-center md:text-left">
                        Quantidade
                    </h4>

                    <div className="relative flex items-center justify-center">
                        <button
                            onClick={removeProduct}
                            type="button"
                            className="flex-shrink-0 bg-gray-200 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-7 w-7 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                        >
                            <svg
                                className="w-2.5 h-2.5 text-gray-900"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h16"
                                />
                            </svg>
                        </button>
                        <p className="mx-4">{count}</p>
                        <button
                            onClick={addProduct}
                            type="button"
                            className="flex-shrink-0 bg-gray-200 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-7 w-7 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                        >
                            <svg
                                className="w-2.5 h-2.5 text-gray-900"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 1v16M1 9h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between md:flex-col md:ml-auto md:absolute md:bottom-4 md:right-4 md:items-end">
                <h4 className="flex items-center justify-center flex-col md:mb-2 font-medium text-text uppercase text-xs text-center md:items-end">
                    Preço
                    <span className="text-[10px] font-bold">Unidade</span>
                </h4>
                <p className="bg-gray-200 p-2 rounded-md text-sm">R$ {props.price}</p>
            </div>
        </div>
    );
}
