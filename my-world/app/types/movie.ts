export interface Movie {
  id: number;
  title: string;
  releaseYear: number;
  phase: number;
  synopsis: string;
  sagaRelevance: string;
  tvaRating: string;
  posterUrl?: string;
  aggregatedRating: number;
  slug: string;
}