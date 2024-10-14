import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: '',  // Changed from name to username to match backend
    email: '',
    password: '',
    confirmPassword: '',
    mobileNo: '',
    address: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required!"),  // Updated validation
    email: Yup.string().email('Invalid email format').required("Email is required!"),
    password: Yup.string().required("Password is required!"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Confirm Password is required!"),
    mobileNo: Yup.string().matches(/^\d{10}$/, 'Invalid mobile number').required("Mobile number is required!"),
    address: Yup.string().required("Address is required!"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('https://e-commerce-backend-6hq8.onrender.com/api/user/register', values);
      alert(response.data.message); // Show success message
      navigate('/login'); // Navigate to login after successful registration
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errors = {};
        error.response.data.errors.forEach(err => {
          errors[err.param] = err.msg; // Map backend validation errors to Formik
        });
        setErrors(errors);
      } else {
        alert('Registration failed. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className='register'>
              <div className='form'>
                <span>Register</span>
                <Field type="text" name="username" placeholder="Enter username" className="form-control inp_text" />
                <ErrorMessage name="username" component="div" className="error" />
                <Field type="email" name="email" placeholder="Enter email id" className="form-control inp_text" />
                <ErrorMessage name="email" component="div" className="error" />
                <Field type="password" name="password" placeholder="Enter password" className="form-control" />
                <ErrorMessage name="password" component="div" className="error" />
                <Field type="password" name="confirmPassword" placeholder="Confirm password" className="form-control" />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
                <Field type="text" name="mobileNo" placeholder="Enter mobile number" className="form-control inp_text" />
                <ErrorMessage name="mobileNo" component="div" className="error" />
                <Field type="text" name="address" placeholder="Enter address" className="form-control inp_text" />
                <ErrorMessage name="address" component="div" className="error" />
                <button type="submit" disabled={isSubmitting}>Register</button>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
