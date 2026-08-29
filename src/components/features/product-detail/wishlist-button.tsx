"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useAddWishlistProduct,
  useRemoveWishlistProduct,
  useWishlist,
} from "@/hooks/use-wishlist";

type WishlistButtonProps = {
  productId: string;
  productName: string;
  productSlug: string;
  signedIn: boolean;
};

export function WishlistButton({
  productId,
  productName,
  productSlug,
  signedIn,
}: WishlistButtonProps) {
  const router = useRouter();
  const wishlist = useWishlist(signedIn);
  const add = useAddWishlistProduct();
  const remove = useRemoveWishlistProduct();
  const saved = wishlist.data?.some((product) => product.id === productId);
  const pending = add.isPending || remove.isPending;
  const error = add.error ?? remove.error ?? wishlist.error;

  function toggle() {
    if (!signedIn) {
      router.push(
        `/sign-in?next=${encodeURIComponent(`/shop/${productSlug}`)}`,
      );
      return;
    }
    if (saved) remove.mutate(productId);
    else add.mutate({ productId });
  }

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        disabled={pending}
        aria-pressed={saved}
        aria-label={`${saved ? "Remove" : "Add"} ${productName} ${
          saved ? "from" : "to"
        } your wishlist`}
        className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-[var(--line)] bg-[var(--page)] text-[var(--brand)] shadow-[0_4px_12px_rgba(0,0,0,.1)] transition-transform hover:scale-105 disabled:cursor-wait disabled:opacity-60"
      >
        <Heart
          aria-hidden="true"
          fill={saved ? "currentColor" : "none"}
          size={21}
        />
      </button>
      {error && (
        <span className="sr-only" role="alert">
          {error.message}
        </span>
      )}
    </>
  );
}
