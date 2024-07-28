"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useAppSelector } from "../hooks/hooks";

export default function Checkout() {
    const params = useSearchParams();

    const [userHeight, setUserHeight] = useState<number | null>(null);

    const client = params.get("client");

    const reduxCart = useAppSelector(state => state.cart);

    useEffect(() => {
        if (window !== undefined) {
            setUserHeight(window.innerHeight);
        }
    }, []);

    return (
        <section className="w-full h-screen overflow-hidden bg-light py-8">
            <div className="container flex items-start justify-start flex-col h-screen">
                <h3 className="text-xl text-text">
                    Você está <strong>finalizando o pedido</strong>
                </h3>
                <div className="flex items-start justify-start flex-col w-full mt-10">
                    <div className="flex items-start justify-start flex-col w-full mb-10">
                        <p>
                            Pedido do cliente: <strong className="mx-2">{client}</strong>
                        </p>
                    </div>

                    <div
                        className={`w-full h-full pb-28 overflow-scroll`}
                        style={{ height: `${userHeight && userHeight - 230}${userHeight && "px"}` }}
                    >
                        {reduxCart && reduxCart.cart.length === 0 ? (
                            <p>Não existe produtos no carrinho</p>
                        ) : (
                            <>
                                {reduxCart.cart.map(product => (
                                    <div key={product.product}>
                                        <p>{product.product}</p>
                                        <p>{product.quantity}</p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 bg-light w-full py-4 border-t border-t-[rgba(0,0,0,0.1)]">
                    <div className="container flex items-center justify-between">
                        <Link
                            href={`/balcao?client=${client}&cart=true`}
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
