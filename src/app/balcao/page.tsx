"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import API from "../../../products.json";
import Product from "@components/Product";
import { addItemCartRedux } from "../redux/cart/cartSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

export default function Balcao() {
    const router = useRouter();
    const params = useSearchParams();

    const cacheClient = params.get("client");
    const haveCart = params.get("cart");

    const dispatch = useAppDispatch();
    const reduxCart = useAppSelector(state => state.cart);

    const [client, setClient] = useState(cacheClient ? cacheClient : "");
    const [errorClient, setErrorClient] = useState(false);
    const [userHeight, setUserHeight] = useState<number | null>(null);
    const [cart, setCart] = useState<Array<{ product: string; quantity: number }>>(
        haveCart ? reduxCart.cart : []
    );

    const addProduct = (product: string, quantity: number) => {
        if (cart.length === 0) {
            setCart(prev => [...prev, { product, quantity }]);
            return;
        }

        const filterCart = cart.filter(item => item.product !== product);
        setCart(() => [...filterCart, { product, quantity }]);
    };

    const removeProduct = (product: string, quantity: number) => {
        if (quantity >= 1) {
            if (quantity === 0) {
                const filterCart = cart.filter(item => item.product !== product);
                setCart(filterCart);
                return;
            }

            const filterCart = cart.filter(item => item.product !== product);
            setCart(() => [...filterCart, { product, quantity }]);
            return;
        }
        if (quantity === 0) {
            const filterCart = cart.filter(item => item.product !== product);
            setCart(filterCart);
            return;
        }

        const filterCart = cart.filter(item => item.product !== product);
        setCart(() => [...filterCart, { product, quantity }]);
    };

    const finishCart = () => {
        if (client === "") {
            setErrorClient(true);
            return;
        }

        router.push(`/checkout?client=${client}&cart=true`);
    };

    useEffect(() => {
        dispatch(addItemCartRedux(cart));

        if (window !== undefined) {
            setUserHeight(window.innerHeight);
        }
    }, [cart]);

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
                            value={client}
                            onChange={({ target }) => {
                                setErrorClient(false);
                                setClient(target.value);
                            }}
                            className={`${
                                errorClient ? "border-red-600" : "border-[rgba(0,0,0,0.2)]"
                            } w-full h-10 border rounded-md bg-light outline-none px-4`}
                        />
                        {errorClient && (
                            <p className="text-red-600 text-xs mt-2 font-medium uppercase">
                                Digite o nome do cliente
                            </p>
                        )}
                    </div>

                    <div
                        className={`w-full h-full pb-28 overflow-scroll`}
                        style={{ height: `${userHeight && userHeight - 230}${userHeight && "px"}` }}
                    >
                        {API.commerce.map(item => (
                            <div key={item.category} className="w-full mb-8 last:mb-0">
                                <h3 className="text-xl font-semibold text-text mb-4">
                                    {item.category}
                                </h3>

                                <div className="grid grid-cols-2 gap-5 w-full">
                                    {item.products.map(product => {
                                        let quantity = 0;

                                        if (cart.length > 0) {
                                            cart.forEach(item => {
                                                if (item.product === product.name) {
                                                    quantity = item.quantity;
                                                }
                                            });
                                        }

                                        return (
                                            <Product
                                                key={product.name}
                                                name={product.name}
                                                image={product.image}
                                                imageAlt={product.imageAlt}
                                                price={product.price}
                                                quantity={quantity}
                                                addProduct={(product, quantity) =>
                                                    addProduct(product, quantity)
                                                }
                                                removeProduct={(product, quantity) =>
                                                    removeProduct(product, quantity)
                                                }
                                            />
                                        );
                                    })}
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
                        <button
                            onClick={finishCart}
                            className="items-center justify-start bg-primary-400 inline-flex px-4 py-2 rounded-full"
                        >
                            <p className="text-light font-semibold uppercase text-sm">
                                resumo do pedido
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
