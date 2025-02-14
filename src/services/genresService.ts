import type { CreateGenreRequestDTO } from '@/models/genres/createGenreRequestDTO';
import type { GenreDTO } from '@/models/genres/genreDTO';
import type { UpdateGenreRequestDTO } from '@/models/genres/updateGenreRequestDTO';
import axios from 'axios';

export const fetchGenres = async (): Promise<GenreDTO[]> => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/genres`);
  return response.data;
};

export const fetchGenre = async (id: string): Promise<GenreDTO> => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/genres/${id}`);
  return response.data;
};

export const createGenre = async (
  createGenreRequestDTO: CreateGenreRequestDTO,
): Promise<GenreDTO> => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_BASE_URL}/genres`,
    createGenreRequestDTO,
  );
  return response.data;
};

export const updateGenre = async (
  updateGenreRequestDTO: UpdateGenreRequestDTO,
): Promise<GenreDTO> => {
  const response = await axios.put(
    `${import.meta.env.VITE_APP_API_BASE_URL}/genres/${updateGenreRequestDTO.id}`,
    updateGenreRequestDTO,
  );
  return response.data;
};

export const deleteGenre = async (id: string): Promise<void> => {
  const response = await axios.delete(`${import.meta.env.VITE_APP_API_BASE_URL}/genres/${id}`);
  return response.data;
};
