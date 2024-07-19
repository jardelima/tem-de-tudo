"use client";

import Product from "@components/Product";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import API from "../../../products.json";

export default function Balcao() {
    return (
        <section className="w-full h-screen overflow-hidden bg-light py-8">
            <div className="container flex items-start justify-start flex-col h-screen">
                <h3 className="text-xl text-text">
                    Você está no <strong>Balcão</strong>
                </h3>
                <div className="flex items-start justify-start flex-col w-full mt-10">
                    <div className="flex items-start justify-start flex-col w-full mb-10">
                        <label
                            htmlFor="name"
                            className="mb-2 text-sm uppercase text-text font-medium"
                        >
                            Nome do cliente
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full h-10 border border-[rgba(0,0,0,0.2)] rounded-md bg-light outline-none px-4"
                        />
                    </div>

                    <div className={`w-full h-[550px] md:h-[800px] pb-20 overflow-scroll`}>
                        {API.commerce.map(item => (
                            <div key={item.category} className="w-full mb-8 last:mb-0">
                                <h3 className="text-xl font-semibold text-text mb-4">
                                    {item.category}
                                </h3>

                                <div className="grid grid-cols-2 gap-5 w-full">
                                    {item.products.map(product => (
                                        <Product
                                            key={product.name}
                                            name={product.name}
                                            image={product.image}
                                            imageAlt={product.imageAlt}
                                            price={product.price}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 bg-light w-full py-4 border-t border-t-[rgba(0,0,0,0.1)]">
                    <div className="container flex items-center justify-between">
                        <Link
                            href={"/"}
                            className="items-center justify-start bg-light border border-primary-400 inline-flex px-4 py-2 rounded-full"
                        >
                            <FaArrowLeft className="fill-primary-400" />
                            <p className="text-primary-400 font-semibold uppercase text-sm ml-2">
                                voltar
                            </p>
                        </Link>
                        <button className="items-center justify-start bg-primary-400 inline-flex px-4 py-2 rounded-full">
                            <p className="text-light font-semibold uppercase text-sm">
                                finalizar pedido
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
