"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { imageUploadError, PROFILE_PHOTO_MAX_MB } from "@/lib/image-upload";
import {
  useUpdateAccountProfile,
  useUploadAccountPhoto,
} from "@/hooks/use-account-profile";
import type { AccountProfile } from "@/types/account-profile";
import { PhoneVerificationCard } from "./phone-verification-card";

export function ProfileContactCard({ profile }: { profile: AccountProfile }) {
  const router = useRouter();
  const update = useUpdateAccountProfile();
  const photo = useUploadAccountPhoto();
  const input = useRef<HTMLInputElement | null>(null);
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [photoInputError, setPhotoInputError] = useState<string>();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    update.mutate(
      { displayName: displayName.trim(), phone: phone.trim() || undefined },
      { onSuccess: () => router.refresh() },
    );
  }

  return (
    <section className="glass-panel rounded-[18px] p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-5">
        <div className="relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-full bg-[#eef4ee] text-2xl font-semibold text-[var(--brand)]">
          {profile.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt={(profile.displayName || "Account") + " profile"}
              fill
              sizes="96px"
              unoptimized
              className="object-cover"
            />
          ) : (
            initials(profile.displayName)
          )}
        </div>
        <div>
          <h2 className="serif text-[24px]">Profile photo</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            JPEG, PNG, or WebP up to 2 MB.
          </p>
          <input
            ref={input}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                const issue = imageUploadError(file, PROFILE_PHOTO_MAX_MB, "profile photo");
                setPhotoInputError(issue ?? undefined);
                if (!issue) photo.mutate(file);
              }
              event.currentTarget.value = "";
            }}
          />
          <button
            type="button"
            disabled={photo.isPending}
            onClick={() => input.current?.click()}
            className="mt-3 h-10 rounded-[10px] border border-[var(--line)] px-4 text-xs font-semibold text-[var(--brand)]"
          >
            {photo.isPending ? "Uploading..." : "Change photo"}
          </button>
        </div>
      </div>
      <form onSubmit={submit} className="mt-6">
        <h2 className="serif text-[24px]">Personal information</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="Full name" value={displayName} onChange={setDisplayName} />
          <Field label="Phone number" type="tel" value={phone} onChange={setPhone} />
          <Field label="Email address" value={profile.email ?? ""} disabled onChange={() => undefined} />
        </div>
        <div className="mt-4">
          <PhoneVerificationCard phone={phone} />
        </div>
        <button
          type="submit"
          disabled={update.isPending || displayName.trim().length < 2}
          className="premium-action mt-5 h-11 rounded-xl bg-[var(--brand)] px-6 text-sm font-semibold text-white disabled:opacity-50"
        >
          {update.isPending ? "Saving..." : "Save profile"}
        </button>
        <MutationState
          error={photoInputError ?? update.error?.message ?? photo.error?.message}
          saved={update.isSuccess || photo.isSuccess}
        />
      </form>
    </section>
  );
}

function Field(props: { disabled?: boolean; label: string; onChange: (value: string) => void; type?: string; value: string }) {
  return (
    <label className="text-[13px] font-semibold">
      {props.label}
      <input disabled={props.disabled} type={props.type ?? "text"} value={props.value} onChange={(event) => props.onChange(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[var(--line)] bg-[var(--page)] px-4 text-[15px] font-normal disabled:text-[var(--muted)]" />
    </label>
  );
}
function MutationState({ error, saved }: { error?: string; saved: boolean }) {
  if (error) return <p className="mt-3 text-xs text-red-700" role="alert">{error}</p>;
  return saved ? <p className="mt-3 text-xs text-[var(--brand)]" role="status">Profile saved.</p> : null;
}
function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "EG";
}
