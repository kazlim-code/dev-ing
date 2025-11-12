/**
 * Starts a view transition and executes a callback to update the DOM.
 * This is called by the `in_transition` custom effect in Gleam.
 *
 * @param {() => void} update_dom - A callback that, when executed, will
 *   dispatch a message to Lustre to update the model and re-render the view.
 */
export function startTransition(update_dom) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    update_dom();
    return;
  }

  // With a transition:
  document.startViewTransition(update_dom);
}
