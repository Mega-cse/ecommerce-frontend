import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/product' } };
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required!'),
    password: Yup.string()
      .required('Password is required!'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await fetch('https://e-commerce-backend-6hq8.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        alert(errorResponse.message || 'Invalid email or password');
        setSubmitting(false);
        return;
      }

      const data = await response.json();
      const user = { id: data.user._id, name: data.user.name, email: values.email };
      const token = data.token;

      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', token);
      setUser(user); // Set user in AuthContext
      navigate(from);
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again later.');
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className='login'>
              <div className='form'>
                <h2>Login</h2>
                <Field type="email" name="email" placeholder="Enter email" className="form-control inp_text" />
                <ErrorMessage name="email" component="div" className="error" />
                <Field type="password" name="password" placeholder="Enter password" className="form-control" />
                <ErrorMessage name="password" component="div" className="error" />
                <button type="submit" disabled={isSubmitting || loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
                <p><Link to="/forgot-password">Forgot Password?</Link></p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
