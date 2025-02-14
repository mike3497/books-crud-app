import type { BookDTO } from '@/models/books/bookDTO';
import type { CreateBookRequestDTO } from '@/models/books/createBookRequestDTO';
import type { UpdateBookRequestDTO } from '@/models/books/updateBookRequestDTO';
import axios from 'axios';

export const fetchBooks = async (): Promise<BookDTO[]> => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/books`);
  return response.data;
};

export const fetchBook = async (id: string): Promise<BookDTO> => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/books/${id}`);
  return response.data;
};

export const createBook = async (createBookRequestDTO: CreateBookRequestDTO): Promise<BookDTO> => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_BASE_URL}/books`,
    createBookRequestDTO,
  );
  return response.data;
};

export const updateBook = async (updateBookRequestDTO: UpdateBookRequestDTO): Promise<BookDTO> => {
  const response = await axios.put(
    `${import.meta.env.VITE_APP_API_BASE_URL}/books/${updateBookRequestDTO.id}`,
    updateBookRequestDTO,
  );
  return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  const response = await axios.delete(`${import.meta.env.VITE_APP_API_BASE_URL}/books/${id}`);
  return response.data;
};
