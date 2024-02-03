import { Button, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function DashProfile() {
    const filePickerRef = useRef(null);
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const url = URL.createObjectURL(file);
            setImageFileUrl(url);
        }
    };

    // 4:23:30

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                    ref={filePickerRef}
                />
                <div
                    className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
                    onClick={() => filePickerRef.current.click()}
                >
                    <img
                        src={imageFileUrl || currentUser.photoPicture}
                        alt="user"
                        className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
                    />
                </div>
                <TextInput
                    type="text"
                    id="username"
                    placeholder="username"
                    defaultValue={currentUser.username}
                />
                <TextInput
                    type="email"
                    id="email"
                    placeholder="email"
                    defaultValue={currentUser.email}
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="password"
                />
                <Button type="submit" gradientDuoTone="purpleToBlue" outline>
                    Update
                </Button>
            </form>
            <div className="text-red-500 flex justify-between mt-5">
                <span className="cursor-pointer">Delete Account</span>
                <span className="cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}
