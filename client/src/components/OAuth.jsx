import React from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux/user/userSlice";

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        // always ask for the user's email address
        provider.setCustomParameters({ prompt: "select_account" });
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            // This gives the data from google
            const response = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    googlePhotoUrl: resultFromGoogle.user.photoURL,
                }),
            });
            const data = await response.json();
            // If we send the data, we will store the data to the local storage
            if (response.ok) {
                dispatch(signInSuccess(data));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Button
            type="button"
            gradientDuoTone="pinkToOrange"
            outline
            onClick={handleGoogleClick}
        >
            <AiFillGoogleCircle className="h-6 w-6 mr-2" />
            Continue with Google
        </Button>
    );
};

export default OAuth;
