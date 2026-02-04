import AppLayout from "../../Layouts/AppLayout";
import { useForm } from "@inertiajs/react";
import InputField from "../../Components/Forms/InputField";
import SubmitButton from "../../Components/Forms/SubmitButton";

export default function LoginPage() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post("/login");
    }

    return (
        <AppLayout title="Register">
            <form
                className="flex flex-col min-h-[calc(100dvh-12rem)] items-center justify-center max-w-md mx-auto"
                onSubmit={handleSubmit}
            >
                <div className="text-3xl font-bold mb-14">
                    Log in to your account
                </div>

                <InputField
                    label="Email"
                    id="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    error={errors.email}
                    type="email"
                    required
                />

                <InputField
                    label="Password"
                    id="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    error={errors.password}
                    type="password"
                    required
                />

                <SubmitButton
                    processing={processing}
                    processingText="Logging in..."
                >
                    Log In
                </SubmitButton>
            </form>
        </AppLayout>
    );
}
