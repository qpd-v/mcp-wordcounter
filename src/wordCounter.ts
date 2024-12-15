import * as fs from 'fs/promises';

/**
 * A class that provides text analysis functionality
 */
export class WordCounter {
  /**
   * Analyzes text from a file to count words and characters
   * @param filePath Path to the file to analyze
   * @returns Object containing word and character counts
   */
  public async analyzeFile(filePath: string) {
    const text = await fs.readFile(filePath, 'utf-8');
    return {
      words: this.countWords(text),
      characters: this.countCharacters(text),
      charactersNoSpaces: this.countCharactersNoSpaces(text)
    };
  }

  /**
   * Counts the number of words in a text
   * Words are defined as sequences of characters separated by whitespace
   */
  private countWords(text: string): number {
    // Handle empty or whitespace-only strings
    if (!text.trim()) {
      return 0;
    }

    // Split by whitespace and filter out empty strings
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    return words.length;
  }

  /**
   * Counts all characters including whitespace
   */
  private countCharacters(text: string): number {
    return text.length;
  }

  /**
   * Counts characters excluding whitespace
   */
  private countCharactersNoSpaces(text: string): number {
    return text.replace(/\s/g, '').length;
  }
}