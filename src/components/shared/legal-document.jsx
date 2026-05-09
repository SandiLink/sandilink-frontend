import { ScrollText } from "lucide-react";

/**
 * Shared building blocks for legal pages (Terms, Privacy, Cookies, Provider
 * Agreement). Provides a consistent hero, metadata card, numbered sections,
 * styled lists, and amber placeholder callouts so all four pages share the
 * same visual identity.
 */

export function LegalDocument({ eyebrow = "Legal", title, intro, meta, children }) {
  return (
    <div className="grid gap-10">
      <header className="grid gap-4">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <ScrollText className="size-3" />
          {eyebrow}
        </span>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {intro ? (
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {intro}
          </p>
        ) : null}
        {meta ? <LegalMetaCard items={meta} /> : null}
      </header>

      <div className="grid gap-10">{children}</div>
    </div>
  );
}

function LegalMetaCard({ items }) {
  return (
    <dl className="grid gap-3 rounded-2xl border bg-muted/30 p-5 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-0.5">
          <dt className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {item.label}
          </dt>
          <dd className="text-sm font-medium text-foreground">
            {item.href ? (
              <a
                href={item.href}
                className="underline-offset-4 hover:underline"
              >
                {item.value}
              </a>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function LegalSection({ number, title, children }) {
  return (
    <section className="grid gap-4 border-t pt-8 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-3">
        {number != null && (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-xs font-semibold text-primary">
            {String(number).padStart(2, "0")}
          </span>
        )}
        <h2 className="font-heading text-lg font-semibold tracking-tight sm:text-xl">
          {title}
        </h2>
      </div>
      <div className="grid gap-3 text-sm leading-relaxed text-muted-foreground sm:pl-11">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ children, ordered = false }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={
        ordered
          ? "ml-5 grid list-decimal gap-2 marker:text-muted-foreground/60"
          : "grid gap-2"
      }
    >
      {children}
    </Tag>
  );
}

export function LegalListItem({ children }) {
  return (
    <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-primary/60">
      {children}
    </li>
  );
}

export function LegalPlaceholder({ children }) {
  return (
    <p className="flex gap-3 rounded-xl border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-200">
      <span className="font-semibold uppercase tracking-widest">
        Placeholder
      </span>
      <span className="flex-1">{children}</span>
    </p>
  );
}

export function LegalContact({ name = "One Sandi Platform LLC", address, email }) {
  return (
    <address className="not-italic text-sm leading-relaxed">
      <strong className="font-semibold text-foreground">{name}</strong>
      {address ? (
        <>
          <br />
          {address}
        </>
      ) : null}
      {email ? (
        <>
          <br />
          Email:{" "}
          <a
            href={`mailto:${email}`}
            className="underline-offset-4 hover:underline"
          >
            {email}
          </a>
        </>
      ) : null}
    </address>
  );
}
