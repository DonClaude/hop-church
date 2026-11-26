// Used only at build time to turn each page into finished HTML (prerendering).
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { MotionConfig } from "framer-motion";
import App from "./App";

export { pages, notFound, SITE_URL, SHARE_IMAGE } from "./seo";

export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </StaticRouter>
    </React.StrictMode>
  );
}
