"use client";

import React from "react";

import { Button, Field, Input, Stack } from "@/index";

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
    <Stack spacing="md" className={className}>
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
      <Button>{loginButtonText}</Button>
    </Stack>
  );
};
