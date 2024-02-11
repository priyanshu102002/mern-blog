import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight, HiDocument } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [tab, setTab] = useState("");
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    const handleSignout = async () => {
        try {
            const response = await fetch("/api/auth/signout", {
                method: "POST",
            });
            const data = await response.json();

            if (!response.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup className="flex flex-col gap-1">
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item
                            active={tab === "profile"}
                            icon={HiUser}
                            label={currentUser.isAdmin ? "Admin" : "User"}
                            labelColor="dark"
                            as="div"
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin && (
                        <Link to="/dashboard?tab=post">
                            <Sidebar.Item
                                active={tab === "post"}
                                icon={HiDocument}
                                labelColor="dark"
                                as="div"
                            >
                                Post
                            </Sidebar.Item>
                        </Link>
                    )}
                    <Sidebar.Item
                        icon={HiArrowSmRight}
                        className="cursor-pointer"
                        onClick={handleSignout}
                    >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
