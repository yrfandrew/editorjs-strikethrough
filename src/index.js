/**
 * Build styles
 */

/**
 * Strikethrough Tool for the Editor.js
 *
 * Allows to wrap inline fragment and style it somehow.
 */
class Strikethrough {
  /**
   * Class name for term-tag
   *
   * @type {string}
   */
  static get CSS() {};

  /**
   * @param {{api: object}}  - Editor.js API
   */
  constructor({api}) {
    this.api = api;

    /**
     * Toolbar Button
     *
     * @type {HTMLElement|null}
     */
    this.button = null;

    /**
     * Tag represented the term
     *
     * @type {string}
     */
    this.tag = 'S';

    /**
     * CSS classes
     */
    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive
    };
  }

  /**
   * Specifies Tool as Inline Toolbar Tool
   *
   * @return {boolean}
   */
  static get isInline() {
    return true;
  }

  /**
   * Create button element for Toolbar
   *
   * @return {HTMLElement}
   */
  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.classList.add(this.iconClasses.base);
    this.button.innerHTML = this.toolboxIcon;

    return this.button;
  }

  /**
   * Wrap/Unwrap selected fragment
   *
   * @param {Range} range - selected fragment
   */
  surround(range) {
    if (!range) {
      return;
    }

    let termWrapper = this.api.selection.findParentTag(this.tag);

    /**
     * If start or end of selection is in the highlighted block
     */
    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  /**
   * Wrap selection with term-tag
   *
   * @param {Range} range - selected fragment
   */
  wrap(range) {
    /**
     * Create a wrapper for highlighting
     */
    let s = document.createElement(this.tag);

    // s.classList.add(Strikethrough.CSS);

    /**
     * SurroundContent throws an error if the Range splits a non-Text node with only one of its boundary points
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Range/surroundContents}
     *
     * // range.surroundContents(s);
     */
    s.appendChild(range.extractContents());
    range.insertNode(s);

    /**
     * Expand (add) selection to highlighted block
     */
    this.api.selection.expandToTag(s);
  }

  /**
   * Unwrap term-tag
   *
   * @param {HTMLElement} termWrapper - term wrapper tag
   */
  unwrap(termWrapper) {
    /**
     * Expand selection to all term-tag
     */
    this.api.selection.expandToTag(termWrapper);

    let sel = window.getSelection();
    let range = sel.getRangeAt(0);

    let unwrappedContent = range.extractContents();

    /**
     * Remove empty term-tag
     */
    termWrapper.parentNode.removeChild(termWrapper);

    /**
     * Insert extracted content
     */
    range.insertNode(unwrappedContent);

    /**
     * Restore selection
     */
    sel.removeAllRanges();
    sel.addRange(range);
  }

  /**
   * Check and change Term's state for current selection
   */
  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag);

    this.button.classList.toggle(this.iconClasses.active, !!termTag);
  }

  /**
   * Get Tool icon's SVG
   * @return {string}
   */
  get toolboxIcon() {
    return '<svg width="20" height="20"><path d="M7.083 12.917c0 1.985 1.258 2.813 3.229 2.813 1.362 0 2.552-0.556 2.552-1.875 0-1.246-0.661-1.528-1.563-1.979-0.156-0.052-0.417-0.156-0.625-0.208h-10.677v-2.24h20v2.24h-4.323c0.052 0.104 0.156 0.26 0.208 0.365 0.208 0.521 0.365 1.146 0.365 1.823 0 2.409-1.572 3.619-3.49 4.167-0.729 0.208-1.51 0.313-2.396 0.313-0.521 0-1.094-0.052-1.615-0.156-1.141-0.228-2.115-0.544-2.917-1.146-1.189-0.892-2.031-2.079-2.031-4.115h3.281zM12.865 6.667c0-1.603-1.021-2.344-2.656-2.344-1.176 0-2.064 0.378-2.448 1.146-0.104 0.208-0.156 0.469-0.156 0.729 0 0.521 0.313 0.99 0.833 1.354 0.417 0.26 0.833 0.521 1.563 0.781h-5.104c-0.052-0.104-0.156-0.156-0.208-0.26-0.313-0.521-0.417-1.146-0.417-1.875 0-1.497 0.778-2.57 1.667-3.281 1.070-0.749 2.49-1.25 4.323-1.25 1.826 0 3.34 0.522 4.323 1.406 0.915 0.823 1.615 1.976 1.615 3.594h-3.333z"></path></svg>'
  }

  /**
   * Sanitizer rule
   * @return {{s: {class: string}}}
   */
  static get sanitize() {
    return {
      s: {}
    };
  }
}

module.exports = Strikethrough;
