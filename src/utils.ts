function reverse_string(str: string): string {
  return str.split('').reverse().join('');
}

function count_words(sentence: string): number {
  return sentence.split(/\s+/).length;
}