import Link from "next/link";

const collected = [
  {
    title: "Account details",
    body: "Name, email, saved addresses, and preferences.",
  },
  {
    title: "Gift information",
    body: "Recipient details, occasion, message, and chosen personalisation.",
  },
  {
    title: "Order activity",
    body: "Payment status, delivery events, support history, and consent records.",
  },
];

export function PrivacyDetails(props: {
  downloading: boolean;
  onDownload: () => void;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <PrivacyCollectionDetails />
      <DataControls {...props} />
    </div>
  );
}

export function PrivacyCollectionDetails() {
  return (
    <section
      id="information-we-collect"
      className="glass-panel rounded-2xl p-6"
    >
      <h2 className="serif text-[22px]">What we collect</h2>
      <div className="mt-3 grid gap-3">
        {collected.map((item) => (
          <div key={item.title}>
            <h3 className="text-[15px] font-semibold">{item.title}</h3>
            <p className="mt-0.5 text-[13px] leading-5 text-[var(--muted)]">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DataControls(props: {
  downloading: boolean;
  onDownload: () => void;
}) {
  return (
    <section
      id="your-privacy-choices"
      className="glass-panel rounded-2xl p-6"
    >
      <h2 className="serif text-[22px]">Your data controls</h2>
      <p className="mt-3 text-[13px] text-[var(--muted)]">
        Requests are verified before processing to protect your account.
      </p>
      <div className="mt-3 grid gap-3">
        <PrivacyAction
          title="Download my data"
          body="Receive a portable copy of account and order data."
          onClick={props.onDownload}
          pending={props.downloading}
        />
        <PrivacyAction
          title="Correct my information"
          body="Update inaccurate profile or delivery details."
          href="/account/settings#profile"
        />
        <PrivacyAction
          title="Delete my account"
          body="Removal starts after open orders and legal holds are resolved."
          href="mailto:privacy@ecogifts.example?subject=Account%20deletion%20request"
        />
      </div>
    </section>
  );
}

function PrivacyAction(props: {
  body: string;
  href?: string;
  onClick?: () => void;
  pending?: boolean;
  title: string;
}) {
  const label = props.pending ? "Preparing..." : "Start request";
  const className =
    "flex h-11 w-full shrink-0 items-center justify-center rounded-[10px] border border-[#b5c9b6] text-sm font-semibold text-[var(--brand)] sm:w-[126px]";
  return (
    <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
      <div>
        <h3 className="text-sm font-semibold">{props.title}</h3>
        <p className="mt-0.5 text-xs leading-[18px] text-[var(--muted)]">
          {props.body}
        </p>
      </div>
      {props.href?.startsWith("/") ? (
        <Link href={props.href} className={className}>
          {label}
        </Link>
      ) : props.href ? (
        <a href={props.href} className={className}>
          {label}
        </a>
      ) : (
        <button
          type="button"
          onClick={props.onClick}
          disabled={props.pending}
          className={className}
        >
          {label}
        </button>
      )}
    </div>
  );
}
