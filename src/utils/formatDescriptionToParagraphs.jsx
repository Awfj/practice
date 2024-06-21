export default function formatDescriptionToParagraphs(description) {
    return description
        .replace(/<[^>]*>?/gm, '') // Remove HTML tags
        .split(/(?<=[.!?])\s+(?=[A-Z])/) // Split into paragraphs
        .map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ));
}