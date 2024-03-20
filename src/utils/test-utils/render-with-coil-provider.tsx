import React, { ReactElement } from "react";

import { CoilProvider } from "@alxshelepenok/diesel";
import { render, RenderOptions } from "@testing-library/react";

interface Props {
  children: React.ReactNode;
}

const WithCoilProvider: React.FC<Props> = ({ children }) => (
  <CoilProvider>{children}</CoilProvider>
);

const renderWithCoilProvider = (
  ui: React.ReactElement,
  options?: RenderOptions,
) => render(ui, { wrapper: WithCoilProvider, ...options });

export const createSnapshotsRenderer = (
  nextElement: ReactElement,
  options?,
) =>
  null;

export default renderWithCoilProvider;
