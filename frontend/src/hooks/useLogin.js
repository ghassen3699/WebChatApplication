import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {

    console.log({ username, password})
    const success = handleInputsErrors({ username, password});
    if (!success) {
        return;
    }


    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data = await res.json();
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
}


function handleInputsErrors({ username, password }) {
    if ( !username || !password ) {
        toast.error('Please fill in all fields');
        return false;
    }

    return true;
}


export default useLogin;
