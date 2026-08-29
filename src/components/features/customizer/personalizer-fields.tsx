"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import {
  personalizerColors,
  personalizerStyles,
  type PersonalizerColorId,
  type PersonalizerStyleId,
} from "./personalizer-options";

interface PersonalizerFieldsProps {
  imageUrl?: string;
  names: string;
  message: string;
  productName: string;
  styleId: PersonalizerStyleId;
  colorId: PersonalizerColorId;
  onNames: (value: string) => void;
  onMessage: (value: string) => void;
  onStyle: (value: PersonalizerStyleId) => void;
  onColor: (value: PersonalizerColorId) => void;
}

export function PersonalizerFields(props: PersonalizerFieldsProps) {
  return (
    <div className="flex w-full max-w-[560px] flex-col gap-3.5">
      <div className="flex h-[72px] items-center gap-3 rounded-[14px] border border-[var(--line)] bg-[var(--subtle)] px-3">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-[10px] bg-[var(--page)]">
          {props.imageUrl && (
            <Image
              src={props.imageUrl}
              alt=""
              fill
              sizes="48px"
              unoptimized={shouldBypassImageOptimization(props.imageUrl)}
              className="object-cover"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{props.productName}</p>
          <p className="mt-1 text-xs text-[#616861]">
            Selected gift · Personalization
          </p>
        </div>
        <p className="text-sm font-semibold text-[var(--brand)]">+$6.00</p>
      </div>

      <Field
        autoFocus
        helper="Shown exactly as entered"
        label="Names or title"
        value={props.names}
        onChange={props.onNames}
      />
      <Field
        helper={`${props.message.length} of 120 characters`}
        label="Personal message"
        value={props.message}
        onChange={props.onMessage}
      />

      <fieldset>
        <legend className="mb-2.5 text-[13px] font-semibold">Type style</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {personalizerStyles.map((option) => {
            const active = props.styleId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => props.onStyle(option.id)}
                className={`flex h-[58px] items-center gap-2.5 rounded-xl border px-3 text-left ${
                  active
                    ? "border-2 border-[#b5c9b6] bg-[#eef4ee] text-[var(--brand)]"
                    : "border-[var(--line)] bg-[var(--page)] text-[#616861]"
                }`}
              >
                <span className={`text-[22px] ${option.className}`}>
                  {option.sample}
                </span>
                <span className="text-xs font-semibold">{option.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2.5 text-[13px] font-semibold">
          Accent color
        </legend>
        <div className="flex flex-wrap gap-2">
          {personalizerColors.map((option) => {
            const active = props.colorId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-label={`Use ${option.label} accent color`}
                aria-pressed={active}
                onClick={() => props.onColor(option.id)}
                className={`flex h-16 w-[88px] flex-col items-center justify-center gap-1 rounded-xl border ${
                  active
                    ? "border-2 border-[#b5c9b6] bg-[#eef4ee]"
                    : "border-[var(--line)] bg-[var(--page)]"
                }`}
              >
                <span
                  className="grid size-8 place-items-center rounded-full text-white"
                  style={{ backgroundColor: option.value }}
                >
                  {active && <Check aria-hidden="true" size={16} />}
                </span>
                <span className="text-[11px] font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="rounded-xl bg-[var(--subtle)] px-4 py-3.5">
        <p className="text-[13px] font-semibold">Preview before we make it</p>
        <p className="mt-1.5 text-xs text-[var(--muted)]">
          Personalized items enter production after your final review.
        </p>
      </div>
    </div>
  );
}

function Field(props: {
  autoFocus?: boolean;
  helper: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = `personalization-${props.label.toLowerCase().replaceAll(" ", "-")}`;
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[13px] font-semibold">
        {props.label}
      </span>
      <input
        id={id}
        autoFocus={props.autoFocus}
        maxLength={120}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-[var(--line)] bg-[var(--page)] px-4 text-[15px] focus:border-2 focus:border-[#718c73] focus:outline-none"
      />
      <span className="mt-2 block text-xs text-[var(--muted)]">
        {props.helper}
      </span>
    </label>
  );
}
