"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

export function PasswordInput({
  id,
  placeholder,
  autoComplete,
  register,
  error,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="grid gap-1.5">
      <div className="relative">
        <Input
          {...register}
          id={id}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="h-10 pr-9"
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted-foreground hover:text-foreground"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </div>
  );
}
