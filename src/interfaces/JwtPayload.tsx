export interface JwtPayload {
    role?: string; 
    exp?: number;
    [key: string]: any;
  }