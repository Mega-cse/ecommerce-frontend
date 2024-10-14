import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ForgotPassword = () => {
  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required!'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('https://e-commerce-backend-6hq8.onrender.com/api/user/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        alert(errorResponse.message || 'Error sending reset link');
        setSubmitting(false);
        return;
      }

      alert('Reset link sent to your email!');
    } catch (error) {
      console.error('Error in forgot password:', error);
      alert('An error occurred while sending the reset link');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Forgot Password</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form style={styles.form}>
            <Field type="email" name="email" placeholder="Enter your email" style={styles.field} />
            <ErrorMessage name="email" component="div" className="error" />
            <button type="submit" disabled={isSubmitting} style={styles.button}>Send Reset Link</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh', // Full height of the viewport
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px', // Set a width for the form
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  field: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ForgotPassword;
