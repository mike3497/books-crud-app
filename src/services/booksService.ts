import type { CreateBookRequestDTO } from './../models/createBookRequestDTO';
import type { BookDTO } from '@/models/bookDTO';
import type { UpdateBookRequestDTO } from '@/models/updateBookRequestDTO';
import axios from 'axios';

export const fetchBooks = async (): Promise<BookDTO[]> => {
  const response = await axios.get('http://localhost:3000/books');
  return response.data;
};

export const fetchBook = async (id: string): Promise<BookDTO> => {
  const response = await axios.get(`http://localhost:3000/books/${id}`);
  return response.data;
};

export const createBook = async (createBookRequestDTO: CreateBookRequestDTO): Promise<BookDTO> => {
  const response = await axios.post(`http://localhost:3000/books`, createBookRequestDTO);
  return response.data;
};

export const updateBook = async (
  id: string,
  updateBookRequestDTO: UpdateBookRequestDTO,
): Promise<BookDTO> => {
  const response = await axios.put(`http://localhost:3000/books/${id}`, updateBookRequestDTO);
  return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  const response = await axios.delete(`http://localhost:3000/books/${id}`);
  return response.data;
};
