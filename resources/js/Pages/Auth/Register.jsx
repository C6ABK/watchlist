import AppLayout from "../../Layouts/AppLayout";
import { useForm } from "@inertiajs/react";
import InputField from "../../Components/Forms/InputField";
import SubmitButton from "../../Components/Forms/SubmitButton";

export default function RegisterPage() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const passwordsMatch = data.password === data.password_confirmation;
    const showMismatch = data.password_confirmation && !passwordsMatch;

    function handleSubmit(e) {
        e.preventDefault();
        post("/register");
    }

    return (
        <AppLayout title="Register">
            <form
                className="flex flex-col min-h-[calc(100dvh-12rem)] items-center justify-center max-w-md mx-auto"
                onSubmit={handleSubmit}
            >
                <div className="text-3xl font-bold mb-14">
                    Register a new account
                </div>

                <InputField
                    label="First Name"
                    id="first_name"
                    value={data.first_name}
                    onChange={(e) => setData("first_name", e.target.value)}
                    error={errors.first_name}
                    required
                />

                <InputField
                    label="Last Name"
                    id="last_name"
                    value={data.last_name}
                    onChange={(e) => setData("last_name", e.target.value)}
                    error={errors.last_name}
                    required
                />

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

                <InputField
                    label="Confirm Password"
                    id="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    error={errors.password_confirmation}
                    type="password"
                    required
                />

                {showMismatch && (
                    <p className="text-error text-xs w-full">Passwords do not match</p>
                )}

                <SubmitButton
                    processing={processing}
                    processingText="Creating new account..."
                >
                    Register
                </SubmitButton>
            </form>
        </AppLayout>
    );
}
