import type { Citation } from "@/components/CitationsBlock";
import type { TariffRow } from "@/components/TariffTable";
import type { PaymentMethod } from "@/components/PaymentMethodGrid";
import type { EscalationLevel } from "@/components/ComplaintsLadder";
import type { FaqItem } from "@/lib/seo/jsonLd";

export type Paragraph = string;

export type ContentSection = {
  id: string;
  heading: string;
  /** Paragraphs of body text (rendered as <p>). HTML is escaped. */
  paragraphs: Paragraph[];
  /** Optional bullet list, rendered after paragraphs. */
  bullets?: string[];
  /** Optional callout text + variant. */
  callout?: { title: string; body: string; variant?: "info" | "warning" | "tip" };
  /**
   * Unsplash query key for the image shown alongside this section in
   * AlternatingSection. Falls back to a default electricity image if omitted.
   */
  imageQuery?: string;
};

export type SpokeContent = {
  metaTitle: string;
  metaDescription: string;
  /** H1 for the spoke. */
  h1: string;
  /** Lede paragraph shown directly under the H1. */
  intro: string;
  sections: ContentSection[];
  faq?: FaqItem[];
  citations: Citation[];
  lastReviewed: string;
  author: string;
};

export type ProviderContent = {
  /** Hub page content (the long-form 5000+ word index page). */
  hub: {
    metaTitle: string;
    metaDescription: string;
    /** H1 is not rendered here — the hero supplies it. This is the section content below the hero. */
    intro: string;
    sections: ContentSection[];
    faq: FaqItem[];
    citations: Citation[];
    lastReviewed: string;
    author: string;
    /** Tariff slab table to render in the "Tariff" section of the hub. */
    tariff?: {
      caption: string;
      rows: TariffRow[];
      sourceLabel: string;
      sourceUrl: string;
      retrievedOn: string;
    };
    /** Payment methods card grid. */
    paymentMethods?: PaymentMethod[];
    /** Complaint escalation ladder. */
    complaintsLadder?: EscalationLevel[];
  };
  /** Spoke pages — keyed by spoke slug. */
  spokes: {
    tariff: SpokeContent & { tariff: ProviderContent["hub"]["tariff"] };
    "payment-methods": SpokeContent & { paymentMethods: PaymentMethod[] };
    complaints: SpokeContent & { ladder: EscalationLevel[] };
    "new-connection": SpokeContent;
    faq: SpokeContent;
  };
};
