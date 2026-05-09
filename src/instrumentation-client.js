// ─────────────────────────────────────────────────────────────────────────
// Google Translate / React DOM-conflict shim.
//
// The Google Translate widget mutates DOM text nodes (wrapping them in <font>
// tags). React's reconciler then tries to remove/insert nodes whose parent
// has changed underneath it and throws:
//
//   NotFoundError: Failed to execute 'removeChild'/'insertBefore' on 'Node':
//   The node to be removed is not a child of this node.
//
// Tracked in facebook/react#11538 since 2017, never resolved upstream because
// the conflict is fundamental: two different systems are mutating the same
// nodes. The community-standard workaround is to wrap removeChild/insertBefore
// so they silently no-op when the parent doesn't match. React picks up the
// state on the next render and recovers.
// ─────────────────────────────────────────────────────────────────────────
if (typeof Node === "function" && Node.prototype) {
  const _removeChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function patchedRemoveChild(child) {
    if (child.parentNode !== this) {
      if (child.parentNode) return _removeChild.call(child.parentNode, child);
      return child;
    }
    return _removeChild.apply(this, arguments);
  };

  const _insertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function patchedInsertBefore(newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      // Reference node has been moved by Google Translate; just append.
      return _insertBefore.call(this, newNode, null);
    }
    return _insertBefore.apply(this, arguments);
  };
}

export function onRouterTransitionStart({ url, routerTransitionType }) {
  if (process.env.NODE_ENV === "development") {
    console.debug(`[nav] ${routerTransitionType} → ${url}`);
  }

  // Send navigation event to analytics in production
  // Example: analytics.track("navigation", { url, type: routerTransitionType })
}

// Global error tracking
window.addEventListener("error", (event) => {
  // Cross-origin scripts (e.g. Google Translate widget served from
  // translate.google.com without CORS) surface as opaque "Script error."
  // with no stack — unactionable noise. Skip them.
  if (event.message === "Script error." && !event.error) return;

  console.error("[client-error]", event.error?.message || event.message);

  // Forward to error tracking service in production
  // Example: Sentry.captureException(event.error)
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("[unhandled-rejection]", event.reason);

  // Forward to error tracking service in production
  // Example: Sentry.captureException(event.reason)
});

// Web Vitals monitoring
if (typeof PerformanceObserver !== "undefined") {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (process.env.NODE_ENV === "development") {
          console.debug(`[perf] ${entry.entryType}: ${entry.name}`, entry);
        }

        // Send to analytics in production
        // Example: analytics.track("web-vital", { name: entry.name, value: entry.startTime })
      }
    });

    observer.observe({ type: "largest-contentful-paint", buffered: true });
    observer.observe({ type: "layout-shift", buffered: true });
    observer.observe({ type: "long-animation-frame", buffered: true });
  } catch {
    // PerformanceObserver types not supported in this browser
  }
}
