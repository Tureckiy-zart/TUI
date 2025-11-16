"use client";

import * as React from "react";

// Re-export shadcn/ui Input with Tenerife branding
export { Input } from "@/components/ui/input";

import { Input as InputComponent } from "@/components/ui/input";
export type InputProps = React.ComponentProps<typeof InputComponent>;
