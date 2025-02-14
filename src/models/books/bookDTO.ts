export interface BookDTO {
  author: string;
  createdAt: Date;
  description: string;
  genreId: string;
  genre: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  id: string;
  isbn: string;
  publishedAt: Date;
  title: string;
  updatedAt: Date;
}
