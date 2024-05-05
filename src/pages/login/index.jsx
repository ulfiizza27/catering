import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAuth, signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const authInstance = getAuth();
      await signInWithEmailAndPassword(authInstance, values.email, values.password);
      console.log("Login successful");

      // Ambil token pengguna setelah berhasil login
      const user = authInstance.currentUser;
      const token = await getIdToken(user);

      // Simpan token ke localStorage
      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    }
    setSubmitting(false);
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="max-w-3xl w-full grid grid-cols-12 bg-white shadow-xl rounded-2xl">
        <div className="col-span-6 px-12 py-8">
          <h2 className="text-4xl text-center mb-10 font-semibold">Login</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="mt-2 p-2 w-full border rounded-md"
                    placeholder="Enter your email..."
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm text-gray-700">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="mt-2 p-2 w-full border rounded-md mb-5"
                    placeholder="Enter your password..."
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                <button
                  type="submit"
                  className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
                <p className="text-sm text-center mt-4">
                  Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-span-6 flex justify-center items-center">
          <img
            src="https://c.ndtvimg.com/2024-01/nmncfji_indian-cuisine_625x300_26_January_24.jpg?im=FeatureCrop,algorithm=dnn,width=650,height=400"
            alt="Indian Cuisine"
            className="w-full h-full object-cover rounded-lg"
            style={{ filter: "brightness(70%)" }}
          />
        </div>
      </div>
    </section>
  );  
};

export default Login;
