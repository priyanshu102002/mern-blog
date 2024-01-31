import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    signInFailure,
    signInStart,
    signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
    const [formData, setFormData] = useState({});
    const { loading, error: errorMessage } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if all fields are filled
        if (!formData.email || !formData.password) {
            dispatch(signInFailure("Please fill out all the fields."));
            return;
        }

        try {
            dispatch(signInStart());
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success === false) {
                dispatch(
                    signInFailure("This email or password is not correct.")
                );
                return;
            }

            if (response.ok) {
                dispatch(signInSuccess(data));
                navigate("/");
            }
        } catch (error) {
            dispatch(
                signInFailure("Api is not working. Please try again later.")
            );
        }
    };

    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1">
                    <Link to="/" className="font-bold dark:text-white text-4xl">
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                            Sahand's
                        </span>
                        Blog
                    </Link>
                    <p className="text-sm mt-5">
                        This is a demo project. You can sign in with your email
                        and password or with Google.
                    </p>
                </div>
                <div className="flex-1">
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <Label value="Your email" />
                            <TextInput
                                type="email"
                                placeholder="name@company.com"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value="Your password" />
                            <TextInput
                                type="password"
                                placeholder="Password"
                                id="password"
                                onChange={handleChange}
                            />
                        </div>
                        <Button
                            gradientDuoTone="purpleToPink"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Sign Up"}
                        </Button>
                        <OAuth />
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Don't have an account?</span>
                        <Link to="/sign-up" className="text-blue-500">
                            Sign Up
                        </Link>
                    </div>
                    {errorMessage && (
                        <Alert color="failure" className="mt-5">
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignIn;
