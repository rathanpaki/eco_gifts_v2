import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";
import { Impact } from "./impact";
import { LandingEffects } from "./landing-effects";
import { Occasions } from "./occasions";
import { Personalization } from "./personalization";
import { Process } from "./process";
import { Products } from "./products";
import { Testimonials } from "./testimonials";

export async function LandingPage() {
  return <div className="landing-root"><LandingEffects /><Header /><main className="landing-page"><Hero /><Occasions /><Products /><Process /><Personalization /><Impact /><Testimonials /></main><Footer /></div>;
}
