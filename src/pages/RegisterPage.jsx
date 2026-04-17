import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import useAuth from '../hooks/useAuth';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name) nextErrors.name = 'Name is required';
    if (!form.username) nextErrors.username = 'Username is required';
    if (!form.email) nextErrors.email = 'Email is required';
    if (!form.password) nextErrors.password = 'Password is required';
    if (form.password && form.password.length < 6) nextErrors.password = 'Min 6 characters required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const ok = await register(form);
    if (ok) navigate('/');
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join SocialMini"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkTo="/login"
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Nitin Kumar"
          error={errors.name}
        />
        <Input
          label="Username"
          name="username"
          value={form.username}
          onChange={onChange}
          placeholder="nitin16112004"
          error={errors.username}
        />
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
          Register
        </Button>
      </form>
    </AuthLayout>
  );
}