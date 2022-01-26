export interface BaseJob {
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Job extends BaseJob {
  id: number;
}