import type { HtmlElement } from "./html-element.type";

export type HtmlAttributes<Element extends HtmlElement> = Omit<
  JSX.IntrinsicElements[Element],
  "ref"
>;
