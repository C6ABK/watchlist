import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "@inertiajs/react";

export default function HomePage() {
    return (
        <HomeLayout title="Home">
            <div className="relative flex flex-col items-center justify-center text-center h-full gap-y-12 px-4 my-4 lg:my-0">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/70 backdrop-blur-xs"></div>

                {/* Content */}
                <div className="relative z-10 text-white max-w-4xl">
                    {/* Hero */}
                    <h1 className="font-bold text-5xl md:text-7xl mb-6 mt-40 lg:mt-0">
                        Build Watchlists Together
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90">
                        Create, share, and manage watchlists with your partner,
                        friends, and family
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link
                            href="/register"
                            className="btn btn-secondary btn-lg text-lg px-8 w-full sm:w-64"
                        >
                            Start Your First List
                        </Link>
                        <Link
                            href="/login"
                            className="btn btn-outline btn-lg text-lg px-8 w-full sm:w-64 text-white border-white hover:bg-white hover:text-black"
                        >
                            Log In
                        </Link>
                    </div>

                    {/* Simple Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20">
                            <div className="text-5xl mb-4">👥</div>
                            <h3 className="font-bold text-xl mb-2">
                                Share Lists
                            </h3>
                            <p className="opacity-90">
                                Invite friends to add movies to your shared
                                watchlist
                            </p>
                        </div>

                        <div className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20">
                            <div className="text-5xl mb-4">🎬</div>
                            <h3 className="font-bold text-xl mb-2">
                                Discover Movies
                            </h3>
                            <p className="opacity-90">
                                Search thousands of movies with ratings and
                                details
                            </p>
                        </div>

                        <div className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20">
                            <div className="text-5xl mb-4">✓</div>
                            <h3 className="font-bold text-xl mb-2">
                                Track Progress
                            </h3>
                            <p className="opacity-90">
                                Mark what you've watched and rate your favorites
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
