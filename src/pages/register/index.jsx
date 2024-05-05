import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const registerSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      console.log("Registration successful");
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    }
    setSubmitting(false);
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-3xl flex">
        <div className="w-1/2 px-12 py-8">
          <h2 className="text-3xl font-semibold text-center mb-10">Register</h2>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={registerSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm text-gray-700">
                    Username
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Enter your username..."
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 w-full border rounded-md"
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
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Enter your password..."
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm text-gray-700">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="mt-1 p-2 w-full border rounded-md mb-5"
                    placeholder="Confirm your password..."
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                </div>
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                <button
                  type="submit"
                  className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
                <p className="text-sm text-center mt-4">
                  Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <img
            src="https://w0.peakpx.com/wallpaper/294/823/HD-wallpaper-indian-way-colors-food-green-vegetables.jpg"
            alt="Indian Cuisine"
            className="w-full h-[515px] object-cover rounded-lg"
            style={{ filter: "brightness(70%)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Register;