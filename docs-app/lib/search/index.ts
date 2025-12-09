/**
 * Search functionality using FlexSearch
 */

import FlexSearch from "flexsearch";

import { searchData } from "./data";

export interface SearchResult {
  title: string;
  url: string;
  category: string;
  content?: string;
}

let index: FlexSearch.Index | null = null;
let documents: SearchResult[] = [];

/**
 * Initialize search index with documents
 */
export function initSearchIndex(docs: SearchResult[]): void {
  documents = docs;
  index = new FlexSearch.Index({
    tokenize: "forward",
    // threshold: 0.1, // Not available in this version of flexsearch
  });

  documents.forEach((doc, id) => {
    const content = `${doc.title} ${doc.content || ""} ${doc.category}`;
    index?.add(id, content);
  });
}

/**
 * Search documents
 */
export function search(query: string, limit = 10): SearchResult[] {
  if (!index || documents.length === 0) return [];

  const results = index.search(query, { limit });
  return results
    .map((id) => {
      const docId = typeof id === "number" ? id : parseInt(String(id), 10);
      return documents[docId];
    })
    .filter((doc): doc is SearchResult => doc !== undefined);
}

/**
 * Get all documents (for initialization)
 */
export function getDocuments(): SearchResult[] {
  return documents;
}

/**
 * Initialize search index with default data
 * Call this once when the module loads
 */
export function initializeSearch(): void {
  if (documents.length === 0 && index === null) {
    initSearchIndex(searchData);
  }
}

// Auto-initialize on module load
if (typeof window === "undefined") {
  // Server-side: initialize immediately
  initializeSearch();
}
