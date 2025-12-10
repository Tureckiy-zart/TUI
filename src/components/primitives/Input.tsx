"use client";

import * as React from "react";

// Re-export Input with Tenerife branding
import { Input as InputComponent } from "@/components/input";

export { Input } from "@/components/input";
export type InputProps = React.ComponentProps<typeof InputComponent>;
