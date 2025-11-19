"use client";

import React from 'react';
import { FormInput } from '@/components/forms/FormInput';
import { Button } from '@/components/primitives/Button';
import { cn } from '@/lib/utils';

interface RegisterFormProps {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  registerButtonText: string;
  className?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ 
  nameLabel,
  namePlaceholder,
  emailLabel,
  emailPlaceholder,
  passwordLabel,
  passwordPlaceholder,
  registerButtonText,
  className 
}) => {
  if (!nameLabel || nameLabel.trim() === '') {
    throw new Error('RegisterForm: "nameLabel" prop is required and cannot be empty');
  }
  if (!namePlaceholder || namePlaceholder.trim() === '') {
    throw new Error('RegisterForm: "namePlaceholder" prop is required and cannot be empty');
  }
  if (!emailLabel || emailLabel.trim() === '') {
    throw new Error('RegisterForm: "emailLabel" prop is required and cannot be empty');
  }
  if (!emailPlaceholder || emailPlaceholder.trim() === '') {
    throw new Error('RegisterForm: "emailPlaceholder" prop is required and cannot be empty');
  }
  if (!passwordLabel || passwordLabel.trim() === '') {
    throw new Error('RegisterForm: "passwordLabel" prop is required and cannot be empty');
  }
  if (!passwordPlaceholder || passwordPlaceholder.trim() === '') {
    throw new Error('RegisterForm: "passwordPlaceholder" prop is required and cannot be empty');
  }
  if (!registerButtonText || registerButtonText.trim() === '') {
    throw new Error('RegisterForm: "registerButtonText" prop is required and cannot be empty');
  }

  return (
    <div className={cn("space-y-4", className)}>
      <FormInput label={nameLabel} placeholder={namePlaceholder} />
      <FormInput label={emailLabel} placeholder={emailPlaceholder} />
      <FormInput label={passwordLabel} placeholder={passwordPlaceholder} />
      <Button className="w-full">{registerButtonText}</Button>
    </div>
  );
};
