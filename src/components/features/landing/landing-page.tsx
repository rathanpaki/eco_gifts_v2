import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";
import { Impact } from "./impact";
import { Occasions } from "./occasions";
import { Personalization } from "./personalization";
import { Process } from "./process";
import { Products } from "./products";
import { QueryProvider } from "./query-provider";
import { Testimonials } from "./testimonials";

export async function LandingPage() {
  return <QueryProvider><Header /><main><Hero /><Occasions /><Products /><Process /><Personalization /><Impact /><Testimonials /></main><Footer /></QueryProvider>;
}
