"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Toaster } from "sonner";
import { useHydrated } from "@/hooks/use-hydrated";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

type DialogTone = "default" | "danger";
type DialogOptions = {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: DialogTone;
};
type PromptOptions = DialogOptions & {
  initialValue?: string;
  inputLabel: string;
  placeholder?: string;
  required?: boolean;
};
type DialogView =
  | ({ kind: "confirm" } & DialogOptions)
  | ({ kind: "prompt" } & PromptOptions);
type DialogApi = {
  confirm: (options: DialogOptions) => Promise<boolean>;
  prompt: (options: PromptOptions) => Promise<string | null>;
};

const DialogContext = createContext<DialogApi | null>(null);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const [dialog, setDialog] = useState<DialogView | null>(null);
  const [value, setValue] = useState("");
  const resolver = useRef<((result: boolean | string | null) => void) | null>(null);
  useBodyScrollLock(Boolean(dialog));

  const finish = useCallback((result: boolean | string | null) => {
    const settle = resolver.current;
    resolver.current = null;
    setDialog(null);
    settle?.(result);
  }, []);

  const replaceDialog = useCallback((next: DialogView) => {
    resolver.current?.(null);
    setValue(next.kind === "prompt" ? (next.initialValue ?? "") : "");
    setDialog(next);
  }, []);

  const confirm = useCallback((options: DialogOptions) =>
    new Promise<boolean>((resolve) => {
      replaceDialog({ kind: "confirm", ...options });
      resolver.current = (result) => resolve(result === true);
    }), [replaceDialog]);

  const prompt = useCallback((options: PromptOptions) =>
    new Promise<string | null>((resolve) => {
      replaceDialog({ kind: "prompt", ...options });
      resolver.current = (result) => resolve(typeof result === "string" ? result : null);
    }), [replaceDialog]);

  useEffect(() => {
    if (!dialog) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && finish(null);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
    };
  }, [dialog, finish]);

  const accept = () => {
    if (dialog?.kind === "prompt") {
      const answer = value.trim();
      if (dialog.required && !answer) return;
      finish(answer);
      return;
    }
    finish(true);
  };

  return (
    <DialogContext.Provider value={{ confirm, prompt }}>
      {children}
      <Toaster
        closeButton
        position="top-right"
        toastOptions={{
          duration: 4500,
          unstyled: true,
          classNames: {
            toast: "liquid-toast",
            title: "liquid-toast-title",
            description: "liquid-toast-description",
            success: "liquid-toast-success",
            error: "liquid-toast-error",
            info: "liquid-toast-info",
            actionButton: "liquid-toast-action",
            cancelButton: "liquid-toast-cancel",
            closeButton: "liquid-toast-close",
          },
        }}
      />
      {hydrated && createPortal(
        <AnimatePresence>
          {dialog ? (
            <motion.div
              animate={{ opacity: 1 }}
              className="liquid-dialog-backdrop"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onMouseDown={(event) => event.target === event.currentTarget && finish(null)}
            >
              <motion.section
                animate={{ opacity: 1, scale: 1, y: 0 }}
                aria-describedby="app-dialog-description"
                aria-labelledby="app-dialog-title"
                aria-modal="true"
                className="liquid-dialog"
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.97, y: 8 }}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: 14 }}
                role="dialog"
                transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <button aria-label="Close dialog" className="liquid-dialog-close" onClick={() => finish(null)} type="button"><X size={18} /></button>
                <span className={`liquid-dialog-kicker ${dialog.tone === "danger" ? "is-danger" : ""}`} aria-hidden="true" />
                <h2 id="app-dialog-title">{dialog.title}</h2>
                <p id="app-dialog-description">{dialog.description}</p>
                {dialog.kind === "prompt" ? (
                  <label className="liquid-dialog-field">
                    <span>{dialog.inputLabel}</span>
                    <input
                      autoFocus
                      onChange={(event) => setValue(event.target.value)}
                      onKeyDown={(event) => event.key === "Enter" && accept()}
                      placeholder={dialog.placeholder}
                      value={value}
                    />
                  </label>
                ) : null}
                <div className="liquid-dialog-actions">
                  <button className="liquid-dialog-cancel" onClick={() => finish(null)} type="button">{dialog.cancelLabel ?? "Keep it"}</button>
                  <button autoFocus={dialog.kind === "confirm"} className={`liquid-dialog-confirm ${dialog.tone === "danger" ? "is-danger" : ""}`} disabled={dialog.kind === "prompt" && Boolean(dialog.required && !value.trim())} onClick={accept} type="button">{dialog.confirmLabel ?? "Continue"}</button>
                </div>
              </motion.section>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </DialogContext.Provider>
  );
}

export function useAppDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("useAppDialog must be used within FeedbackProvider.");
  return context;
}
