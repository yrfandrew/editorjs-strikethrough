/**
 * Build styles
 */
require('./index.css').toString();

/**
 * Strikethrough Tool for the Editor.js
 * Allows to wrap inline fragment and style it somehow.
 */
class Strikethrough {
    /**
     * Class name for term-tag
     *
     * @type {string}
     */
    static get CSS() {
        return 'cdx-strikethrough';
    };

    /**
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
        this.tag = 'DEL';

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

        let termWrapper = this.api.selection.findParentTag(this.tag, Strikethrough.CSS);

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
        let delElement = document.createElement(this.tag);

        delElement.classList.add(Strikethrough.CSS);

        /**
         * SurroundContent throws an error if the Range splits a non-Text node with only one of its boundary points
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Range/surroundContents}
         *
         * // range.surroundContents(del);
         */
        delElement.appendChild(range.extractContents());
        range.insertNode(delElement);

        /**
         * Expand (add) selection to highlighted block
         */
        this.api.selection.expandToTag(delElement);
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
        const termTag = this.api.selection.findParentTag(this.tag, Strikethrough.CSS);

        this.button.classList.toggle(this.iconClasses.active, !!termTag);
    }

    /**
     * Get Tool icon's SVG
     * @return {string}
     */
    get toolboxIcon() {
        return require('./assets/strikethrough.svg').default;
    }

    /**
     * Sanitizer rule
     * @return {{del: {class: string}}}
     */
    static get sanitize() {
        return {
            del: {
                class: Strikethrough.CSS
            }
        };
    }
}

module.exports = Strikethrough;