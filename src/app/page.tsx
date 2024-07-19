import Link from "next/link";

export default function Home() {
    return (
        <section className="flex items-center justify-center w-full h-screen bg-light">
            <div className="container flex items-center justify-center flex-col">
                <h2 className="mb-8 font-semibold text-text text-xl">Onde você está?</h2>
                <Link
                    href={"/balcao"}
                    className="w-full max-w-80 bg-primary-400 text-center p-2 rounded-full text-light text-sm uppercase font-semibold mb-4"
                >
                    Balcão
                </Link>
                <Link
                    href={"/"}
                    className="w-full max-w-80 bg-light border border-primary-400 text-primary-400 uppercase text-sm text-center p-2 rounded-full font-semibold"
                >
                    Caixa
                </Link>
            </div>
        </section>
    );
}
