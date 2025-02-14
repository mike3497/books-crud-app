import BooksView from '@/views/books/BooksView.vue';
import CreateBookView from '@/views/books/CreateBookView.vue';
import EditBookView from '@/views/books/EditBookView.vue';
import CreateGenreView from '@/views/genres/CreateGenreView.vue';
import EditGenreView from '@/views/genres/EditGenreView.vue';
import GenresView from '@/views/genres/GenresView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/books',
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView,
    },
    {
      path: '/books/create',
      name: 'create-book',
      component: CreateBookView,
    },
    {
      path: '/books/:id',
      name: 'edit-book',
      component: EditBookView,
    },
    {
      path: '/genres',
      name: 'genres',
      component: GenresView,
    },
    {
      path: '/genres/create',
      name: 'create-genre',
      component: CreateGenreView,
    },
    {
      path: '/genres/:id',
      name: 'edit-genre',
      component: EditGenreView,
    },
  ],
});

export default router;
