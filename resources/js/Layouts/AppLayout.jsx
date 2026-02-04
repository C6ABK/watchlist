import { Head } from "@inertiajs/react";
import NavBar from "../Components/NavBar";

export default function AppLayout({ children, title = "Welcome" }) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen flex flex-col">
                <NavBar />
                <main className="container mx-auto max-w-5xl px-4 py-8 grow">
                    {children}
                </main>

                <footer className="footer footer-center p-4 text-xs text-base-content">
                    <div>
                        <p>Copyright © 2026 - All rights reserved</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
