/**
 * Prominent third-party disclaimer banner for all provider pages.
 * Displayed directly below the breadcrumb on every provider hub and monthly page.
 * Required to make clear this is an independent consumer guide, not the utility itself.
 */

type Props = {
  providerName: string;
  legalName: string;
  portalUrl: string;
};

export function ProviderDisclaimer({ providerName, legalName, portalUrl }: Props) {
  return (
    <div
      className="bg-amber-50 border-y border-amber-200"
      role="note"
      aria-label="Third-party site disclaimer"
    >
      <div className="container-wide py-3">
        <p className="text-xs text-amber-900 leading-relaxed">
          <strong>Independent third-party site — not affiliated with {providerName}.</strong>{" "}
          &ldquo;{providerName}&rdquo; and related marks are trademarks of {legalName}. This site is an
          independent consumer guide that helps users find official bill-check portals. We are not
          {" "}{providerName}, we are not endorsed by {providerName}, and we do not access or store
          your account data. To go directly to the official {providerName} website visit{" "}
          <a
            href={portalUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="underline font-medium"
          >
            {new URL(portalUrl).hostname}
          </a>
          .{" "}
          <a href="/disclaimer" className="underline">
            Full disclaimer &rarr;
          </a>
        </p>
      </div>
    </div>
  );
}
