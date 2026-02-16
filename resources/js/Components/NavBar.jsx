import { Link, useForm } from "@inertiajs/react";
import { useAuth } from "../Hooks/useAuth";

export default function NavBar() {
    const appName = import.meta.env.VITE_APP_NAME;

    const { user, isAuthenticated } = useAuth();

    const { post, processing } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post("/logout", {
            method: "delete",
        });
    };

    return (
        <div className="navbar bg-base-100 shadow-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {" "}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />{" "}
                        </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link href="/watchlists/view">
                                        Watchlists
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/movies/index">Search</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/register">Register</Link>
                                </li>
                                <li>
                                    <Link href="/login">Log In</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost text-xl">
                    {appName}
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link href="/watchlists/view">Watchlists</Link>
                            </li>
                            <li>
                                <Link href="/movies/index">Search</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/register">Register</Link>
                            </li>
                            <li>
                                <Link href="/login">Log In</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <div className="navbar-end flex gap-x-6 items-center">
                {isAuthenticated && (
                    <>
                        <div className="hidden lg:block">
                            Welcome, {user.first_name}
                        </div>
                        <form onSubmit={handleLogout}>
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
