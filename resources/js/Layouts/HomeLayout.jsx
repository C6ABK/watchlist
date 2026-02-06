import { Head } from "@inertiajs/react";

export default function HomeLayout({ children, title = "Welcome" }) {
    return (
        <div
            className="flex flex-col h-screen bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: "url('/images/bg.jpg')" }}
        >
            <Head title={title} />
            <main className="grow">{children}</main>
        </div>
    );
}
