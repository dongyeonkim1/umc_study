/* export type Cast = {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  };
  
  export type Crew = {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
  };
  
  export type Credits = {
    id: number;
    cast: Cast[];
    crew: Crew[];
  };
 */

  export interface Cast {
    cast_id: number;
    character: string;
    credit_id: string;
    name: string;
    profile_path: string | null;
  }
  
  export interface Crew {
    credit_id: string;
    department: string;
    job: string;
    name: string;
    profile_path: string | null;
  }
  
  export interface CreditResponse {
    id: number;
    cast: Cast[];
    crew: Crew[];
  }
  