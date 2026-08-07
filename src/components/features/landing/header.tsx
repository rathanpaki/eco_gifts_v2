import { StorefrontHeader } from "@/components/features/storefront/storefront-header";

export function Header() {
  return (
    <>
      <div className="bg-[#35543c] px-4 py-2 text-center text-[11px] text-white">
        Thoughtful gifting with verified environmental evidence.
      </div>
      <StorefrontHeader />
    </>
  );
}
