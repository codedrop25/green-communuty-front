import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const controlClass = "w-full rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none transition-colors duration-150 placeholder:text-fg-subtle focus:border-border-strong focus:ring-4 focus:ring-surface-muted disabled:cursor-not-allowed disabled:opacity-50";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, "h-9", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlClass, "resize-y py-2", className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(controlClass, "h-9", className)} {...props} />;
}

export function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return <label htmlFor={htmlFor} className="text-[13px] font-medium text-fg-body">{children}</label>;
}

export function FieldMessage({ id, error, children }: { id: string; error?: boolean; children: React.ReactNode }) {
  return <p id={id} className={cn("mt-1 text-xs", error ? "text-danger" : "text-fg-muted")}>{children}</p>;
}
