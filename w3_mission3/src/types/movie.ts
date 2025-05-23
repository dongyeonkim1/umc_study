export type Genre = {
    id: number;
    name: string;
  };
  
  export type ProductionCompany = {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  };
  
  export type ProductionCountry = {
    iso_3166_1: string;
    name: string;
  };
  
  export type SpokenLanguage = {
    english_name: string;
    iso_639_1: string;
    name: string;
  };
  
  export type Movie = {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: null | unknown;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country?: string[]; // optional, 일부 응답에서만 등장
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };

  export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };
  
  