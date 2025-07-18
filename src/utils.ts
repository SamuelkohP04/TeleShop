function reverse_string(str: string): string {
  return str.split('').reverse().join('');
}

export function count_words(sentence: string): number {
  if (!sentence || sentence.trim() === '') return 0;
  return sentence.trim().split(/\s+/).length;
}