import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

type PageItem = number | "start-gap" | "end-gap";

type NumberedPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hrefForPage: (page: number) => string;
  itemLabel?: string;
};

export function NumberedPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  hrefForPage,
  itemLabel = "items",
}: NumberedPaginationProps) {
  if (!totalItems) return null;
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  return (
    <nav
      aria-label={`${itemLabel} pagination`}
      className="flex flex-col gap-4 rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-4 shadow-[0_12px_30px_rgba(37,42,38,0.05)] sm:flex-row sm:items-center sm:justify-between sm:px-5"
    >
      <p className="text-center text-xs font-medium text-[var(--muted)] sm:text-left">
        Showing <strong className="text-[var(--ink)]">{start}–{end}</strong> of{" "}
        <strong className="text-[var(--ink)]">{totalItems}</strong> {itemLabel}
      </p>
      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-1.5">
          <PageArrow
            direction="previous"
            disabled={currentPage === 1}
            href={hrefForPage(currentPage - 1)}
          />
          <div className="flex items-center gap-1" aria-label="Page numbers">
            {pageItems(currentPage, totalPages).map((item) =>
              typeof item === "number" ? (
                <PageNumber
                  active={item === currentPage}
                  href={hrefForPage(item)}
                  key={item}
                  page={item}
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="grid size-10 place-items-center text-[var(--muted)]"
                  key={item}
                >
                  <MoreHorizontal size={17} />
                </span>
              ),
            )}
          </div>
          <PageArrow
            direction="next"
            disabled={currentPage === totalPages}
            href={hrefForPage(currentPage + 1)}
          />
        </div>
      ) : null}
    </nav>
  );
}

function PageNumber({ active, href, page }: { active: boolean; href: string; page: number }) {
  const tone = active
    ? "border-[var(--brand)] bg-[var(--brand)] text-white shadow-sm"
    : "border-transparent text-[var(--ink)] hover:border-[var(--line)] hover:bg-[var(--subtle)]";
  return (
    <Link
      aria-current={active ? "page" : undefined}
      aria-label={`Page ${page}`}
      className={`grid size-10 place-items-center rounded-full border text-sm font-semibold transition ${tone}`}
      href={href}
    >
      {page}
    </Link>
  );
}

function PageArrow({ direction, disabled, href }: { direction: "previous" | "next"; disabled: boolean; href: string }) {
  const label = direction === "previous" ? "Previous page" : "Next page";
  const icon = direction === "previous" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />;
  const text = direction === "previous" ? "Previous" : "Next";
  const classes = "inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-full border border-[var(--line)] px-2 transition sm:min-w-24 sm:px-3";
  if (disabled) {
    return <span aria-disabled="true" aria-label={label} className={`${classes} cursor-not-allowed text-[var(--muted)] opacity-45`}>{icon}<span className="hidden text-xs font-semibold sm:inline">{text}</span></span>;
  }
  return <Link aria-label={label} className={`${classes} text-[var(--brand)] hover:border-[var(--brand)] hover:bg-[var(--subtle)]`} href={href}>{icon}<span className="hidden text-xs font-semibold sm:inline">{text}</span></Link>;
}

function pageItems(current: number, total: number): PageItem[] {
  if (total <= 5) return Array.from({ length: total }, (_, index) => index + 1);
  if (current <= 3) return [1, 2, 3, "end-gap", total];
  if (current >= total - 2) return [1, "start-gap", total - 2, total - 1, total];
  return [1, "start-gap", current, "end-gap", total];
}
