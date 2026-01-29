"use client";

import React from "react";

import { Button, Field, Input, Stack } from "@/index";

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
  className,
}) => {
  if (!nameLabel || nameLabel.trim() === "") {
    throw new Error('RegisterForm: "nameLabel" prop is required and cannot be empty');
  }
  if (!namePlaceholder || namePlaceholder.trim() === "") {
    throw new Error('RegisterForm: "namePlaceholder" prop is required and cannot be empty');
  }
  if (!emailLabel || emailLabel.trim() === "") {
    throw new Error('RegisterForm: "emailLabel" prop is required and cannot be empty');
  }
  if (!emailPlaceholder || emailPlaceholder.trim() === "") {
    throw new Error('RegisterForm: "emailPlaceholder" prop is required and cannot be empty');
  }
  if (!passwordLabel || passwordLabel.trim() === "") {
    throw new Error('RegisterForm: "passwordLabel" prop is required and cannot be empty');
  }
  if (!passwordPlaceholder || passwordPlaceholder.trim() === "") {
    throw new Error('RegisterForm: "passwordPlaceholder" prop is required and cannot be empty');
  }
  if (!registerButtonText || registerButtonText.trim() === "") {
    throw new Error('RegisterForm: "registerButtonText" prop is required and cannot be empty');
  }

  return (
    <Stack spacing="md" className={className}>
      <Field>
        <Field.Label>{nameLabel}</Field.Label>
        <Field.Control>
          <Input placeholder={namePlaceholder} type="text" />
        </Field.Control>
      </Field>
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
      <Button>{registerButtonText}</Button>
    </Stack>
  );
};
