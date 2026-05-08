import AppLayout from "../../Layouts/AppLayout";
import { useForm, Link } from "@inertiajs/react";

export default function CreateWatchlist() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/watchlists");
    };

    return (
        <AppLayout title="New Watchlist">
            <Link
                href="/watchlists"
                className="text-sm text-secondary hover:text-secondary/80 mb-6 block"
            >
                ← Watchlists
            </Link>
            <h1 className="text-2xl font-bold mb-6">New Watchlist</h1>

            <form onSubmit={submit} className="flex flex-col gap-y-4 max-w-md">
                <div>
                    <label className="block text-sm mb-1">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                    {errors.name && (
                        <p className="text-error text-sm mt-1">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm mb-1">
                        Description{" "}
                        <span className="text-neutral-content text-xs">
                            (optional)
                        </span>
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="textarea textarea-bordered w-full"
                        rows={3}
                    />
                </div>
                <button type="submit" disabled={processing} className="btn btn-secondary w-full">
                  {processing ? 'Creating...' : 'Create list'}
                </button>
            </form>
        </AppLayout>
    );
}
