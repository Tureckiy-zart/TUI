"use client";

import React from 'react';
import { FormInput } from '@/components/forms/FormInput';
import { Button } from '@/components/primitives/Button';
import { cn } from '@/lib/utils';

interface LoginFormProps {
  className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  return (
    <div className={cn("space-y-4", className)}>
      <FormInput label="Email" placeholder="Enter your email" />
      <FormInput label="Password" placeholder="Enter your password" />
      <Button className="w-full">Login</Button>
    </div>
  );
};
