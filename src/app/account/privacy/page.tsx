import { redirect } from "next/navigation";

export default function AccountPrivacyRedirect() {
  redirect("/account/settings#privacy");
}
