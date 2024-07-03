/**
 * Converts a string description into an array of JSX paragraph elements.
 *
 * @param {string} description - The input text to be formatted.
 * @returns {Array} An array of JSX <p> elements, each containing a paragraph of the input text.
 */
export default function formatDescriptionToParagraphs(description) {
    return description
        .replace(/<[^>]*>?/gm, '') // Remove HTML tags
        .split(/(?<=[.!?])\s+(?=[A-Z])/) // Split into paragraphs
        .map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ));
}