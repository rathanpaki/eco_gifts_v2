"use client";

import type { InputHTMLAttributes, ReactNode } from "react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function AuthField({ hint, label, ...props }: FieldProps) {
  return (
    <label className="auth-field">
      <span>{label}</span>
      <input {...props} />
      {hint ? <small>{hint}</small> : <small aria-hidden="true">&nbsp;</small>}
    </label>
  );
}

export function AuthButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="auth-button" type="submit" {...props}>{children}</button>;
}

export function AuthNotice({ children, tone = "error" }: { children?: ReactNode; tone?: "error" | "success" }) {
  if (!children) return null;
  return <p className={`auth-notice auth-notice--${tone}`} role={tone === "error" ? "alert" : "status"}>{children}</p>;
}
