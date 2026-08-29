"use client";

import { useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function AuthField({
  hint,
  label,
  type = "text",
  ...props
}: FieldProps) {
  const [visible, setVisible] = useState(false);
  const password = type === "password";
  return (
    <label className="auth-field">
      <span>{label}</span>
      <span className="auth-input-control">
        <input {...props} type={password && visible ? "text" : type} />
        {password ? (
          <button
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            onClick={() => setVisible((current) => !current)}
          >
            {visible ? "Hide" : "Show"}
          </button>
        ) : null}
      </span>
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

export function AuthButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="auth-button" type="submit" {...props}>
      {children}
    </button>
  );
}

export function AuthNotice({
  children,
  tone = "error",
}: {
  children?: ReactNode;
  tone?: "error" | "success";
}) {
  if (!children) return null;
  return (
    <p
      className={`auth-notice auth-notice--${tone}`}
      role={tone === "error" ? "alert" : "status"}
    >
      {children}
    </p>
  );
}
