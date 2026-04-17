import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import useAuth from '../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.email) nextErrors.email = 'Email is required';
    if (!form.password) nextErrors.password = 'Password is required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const ok = await login(form);
    if (ok) navigate('/');
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue"
      footerText="Don't have an account?"
      footerLinkText="Register"
      footerLinkTo="/register"
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="you@example.com"
          error={errors.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          placeholder="••••••••"
          error={errors.password}
        />
        <Button type="submit" className="w-full" loading={loading}>
          Login
        </Button>
      </form>
    </AuthLayout>
  );
}