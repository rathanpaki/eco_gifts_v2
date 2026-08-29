"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useAddWishlistProduct,
  useRemoveWishlistProduct,
  useWishlist,
} from "@/hooks/use-wishlist";

export function ProductCardWishlistButton(props: {
  productId: string;
  productName: string;
  productSlug: string;
  signedIn: boolean;
}) {
  const router = useRouter();
  const wishlist = useWishlist(props.signedIn);
  const add = useAddWishlistProduct();
  const remove = useRemoveWishlistProduct();
  const saved = wishlist.data?.some((item) => item.id === props.productId);
  const pending = add.isPending || remove.isPending;

  function toggle() {
    if (!props.signedIn) {
      const next = `/shop/${props.productSlug}`;
      router.push(`/sign-in?next=${encodeURIComponent(next)}`);
      return;
    }
    if (saved) remove.mutate(props.productId);
    else add.mutate({ productId: props.productId });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      aria-pressed={saved}
      aria-label={`${saved ? "Remove" : "Add"} ${props.productName} ${saved ? "from" : "to"} your wishlist`}
      className={`absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full border border-white/80 bg-white/95 text-[var(--brand)] shadow-md transition-all focus:opacity-100 group-hover:opacity-100 max-md:opacity-100 ${saved ? "opacity-100" : "opacity-0"}`}
    >
      <Heart aria-hidden="true" fill={saved ? "currentColor" : "none"} size={19} />
    </button>
  );
}
