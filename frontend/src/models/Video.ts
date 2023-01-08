interface Author {
  _id: number;
  avatar: string;
  name: string;
  subscribeUser: [number];
}

export interface Video {
  _id: number;
  url: string;
  image: string;
  title: string;
  desc: string;
  createdAt: any;
  author: Author;
  view: number;
  like: [number];
  disLike: [number];
}
