/**
 * Returns a new string with the characters of the input string in reverse order.
 *
 * @param str - The string to reverse
 * @returns The reversed string
 */
function reverse_string(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Returns the number of words in a sentence.
 *
 * Splits the input string on one or more whitespace characters to determine the word count.
 *
 * @param sentence - The sentence to analyze
 * @returns The number of words in the sentence
 */
function count_words(sentence: string): number {
  return sentence.split(/\s+/).length;
}