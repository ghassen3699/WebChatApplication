import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext()

    const signup = async ({ fullname, username, password, confirmationPassword, gender }) => {
        console.log({ fullname, username, password, confirmationPassword, gender })
        const success = handleInputsErrors({ fullname, username, password, confirmationPassword, gender });
        if (!success) {
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullname, username, password, confirmationPassword, gender })
            });

            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }

            localStorage.setItem("chat-user",JSON.stringify(data))
            setAuthUser(data)
            if (res.ok) {
                toast.success("Signup successful!");
                console.log(data);
            } else {
                throw new Error(data.message || "Something went wrong");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { signup, loading };
}

function handleInputsErrors({ fullname, username, password, confirmationPassword, gender }) {
    if (!fullname || !username || !password || !confirmationPassword || !gender) {
        toast.error('Please fill in all fields');
        return false;
    }

    if (password !== confirmationPassword) {
        toast.error('Passwords do not match');
        return false;
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
    }

    return true;
}

export default useSignup;
