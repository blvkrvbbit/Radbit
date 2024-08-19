type Ad = {
  id: number;
  title: string;
  price: number;
  description: string;
  userId: number;
  createdDate: string;
  categories: any;
  images: {
    id: number;
    url: string;
    adId: number;
    hero: boolean;
  }[];
  user: {
    name: string;
    email: string;
    country: string;
    provinceState: string;
    city: string;
    Ad: any;
  };
};

export default Ad;
