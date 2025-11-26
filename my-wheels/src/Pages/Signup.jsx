import React, { useContext, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from "./AuthProvider";

export default function Signup() {
  const { registerUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      const { name, email, photoURL, password } = formData;

      const userCred = await registerUser(email, password);
      await updateUserProfile(name, photoURL);

      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await googleLogin();
      toast.success("Google signup successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster />
      <form
        onSubmit={handleEmailSignup}
        className="bg-white w-full max-w-md p-8 shadow-xl rounded-xl"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-5">
          Create an Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="input input-bordered w-full mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="input input-bordered w-full mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="photoURL"
          placeholder="Photo URL"
          className="input input-bordered w-full mb-3"
          onChange={handleChange}
        />

        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="input input-bordered w-full pr-10"
            onChange={handleChange}
            required
          />
          <div
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>

        <button className="btn bg-blue-600 text-white w-full">
          Register
        </button>

        <div className="divider">OR</div>

        <button onClick={handleGoogleSignup} className="btn border w-full">
          Continue with Google
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
