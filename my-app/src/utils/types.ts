export interface ICourse {
  id: number;
  name: string;
  description: string;
  image: string;
  redirect_url: string;
  isSubscribed?: boolean;
  created_at?: string;
}
