/**
 * Filters and returns an object containing only the properties from the input object
 * that start with 'data-'.
 *
 * @param {Object} props - The input object containing properties to be filtered.
 * @returns {Object} - An object containing only properties that start with 'data-'.
 */
export default function validateRestProps(props) {
    const newProps = {}

    Object.keys(props).forEach((key) => {
        if (key.startsWith('data-')) {
            newProps[key] = props[key]
        }
    })

    return newProps
}