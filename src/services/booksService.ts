import type { BookDTO } from '@/models/bookDTO';
import type { UpdateBookRequestDTO } from '@/models/updateBookRequestDTO';
import axios from 'axios';
import type { CreateBookRequestDTO } from './../models/createBookRequestDTO';

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
