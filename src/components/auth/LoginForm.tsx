"use client";

import React from "react";

import { FormInput } from "@/components/forms/FormInput";
import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

interface LoginFormProps {
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  loginButtonText: string;
  className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  emailLabel,
  emailPlaceholder,
  passwordLabel,
  passwordPlaceholder,
  loginButtonText,
  className,
}) => {
  if (!emailLabel || emailLabel.trim() === "") {
    throw new Error('LoginForm: "emailLabel" prop is required and cannot be empty');
  }
  if (!emailPlaceholder || emailPlaceholder.trim() === "") {
    throw new Error('LoginForm: "emailPlaceholder" prop is required and cannot be empty');
  }
  if (!passwordLabel || passwordLabel.trim() === "") {
    throw new Error('LoginForm: "passwordLabel" prop is required and cannot be empty');
  }
  if (!passwordPlaceholder || passwordPlaceholder.trim() === "") {
    throw new Error('LoginForm: "passwordPlaceholder" prop is required and cannot be empty');
  }
  if (!loginButtonText || loginButtonText.trim() === "") {
    throw new Error('LoginForm: "loginButtonText" prop is required and cannot be empty');
  }

  return (
    <div className={cn("space-y-md", className)}>
      <FormInput label={emailLabel} placeholder={emailPlaceholder} />
      <FormInput label={passwordLabel} placeholder={passwordPlaceholder} />
      <Button className="w-full">{loginButtonText}</Button>
    </div>
  );
};
