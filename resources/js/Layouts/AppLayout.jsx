import { Head } from "@inertiajs/react";
import NavBar from "../Components/NavBar";

export default function AppLayout({ children, title = "Welcome" }) {
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: "url('/images/bg.jpg')" }}
        >
            <Head title={title} />
            {/* Gradient overlay */}
            <div className="min-h-screen bg-linear-to-b from-black/40 to-black/70 backdrop-blur-xs flex flex-col">
                <NavBar />
                <main className="container mx-auto max-w-5xl px-4 py-8 flex-1">
                    {children}
                </main>

                <footer className="footer footer-center p-4 text-xs text-base-content">
                    <div>
                        <p><a href="https://www.barkitsolutions.com/">© 2026 - Bark IT Solutions</a></p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
