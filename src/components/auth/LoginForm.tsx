"use client";

import React from "react";

import { Input } from "@/components/input";
import { Button } from "@/components/primitives/Button";
import { Field } from "@/components/ui/field";
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
      <Field>
        <Field.Label>{emailLabel}</Field.Label>
        <Field.Control>
          <Input placeholder={emailPlaceholder} type="email" />
        </Field.Control>
      </Field>
      <Field>
        <Field.Label>{passwordLabel}</Field.Label>
        <Field.Control>
          <Input placeholder={passwordPlaceholder} type="password" />
        </Field.Control>
      </Field>
      <Button className="w-full">{loginButtonText}</Button>
    </div>
  );
};
