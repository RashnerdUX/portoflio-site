export interface Movie {
  id: string;
  title: string;
  release_year: number;
  phase: number;
  synopsis: string;
  saga_relevance: string;
  tva_rating: string;
  poster_url?: string;
  gauntlet_average_rating: number;
  slug: string;
}