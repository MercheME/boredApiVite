export interface BoredAPIResponse {
    activity: string;
    type: string;
    participants: number;
    price: number;
    key: string;
    accessibility: number;
  }
  
  export interface UnsplashImageResponse {
    total: number;
    total_pages: number;
    results: Result[];
  }
  
  export interface Result {
    id: string;
    urls: Urls;
  }
  
  export interface Urls {
    small: string;
  }
  