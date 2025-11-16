"use client";

import React from 'react';
import { FormInput } from '@/components/forms/FormInput';
import { Button } from '@/components/primitives/Button';
import { cn } from '@/lib/utils';

interface RegisterFormProps {
  className?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ className }) => {
  return (
    <div className={cn("space-y-4", className)}>
      <FormInput label="Name" placeholder="Enter your name" />
      <FormInput label="Email" placeholder="Enter your email" />
      <FormInput label="Password" placeholder="Enter your password" />
      <Button className="w-full">Register</Button>
    </div>
  );
};
