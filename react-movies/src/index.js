import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";
import NowPlayingPage from "./pages/nowPlayingPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";




const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
        <Routes>
  {/* 公共路由 */}
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/login" element={<LoginPage />} />

  {/* 受保护的路由 */}
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/movies/favorites"
    element={
      <ProtectedRoute>
        <FavoriteMoviesPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/reviews/:id"
    element={
      <ProtectedRoute>
        <MovieReviewPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/movies/:id"
    element={
      <ProtectedRoute>
        <MoviePage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/reviews/form"
    element={
      <ProtectedRoute>
        <AddMovieReviewPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/movies/upcoming"
    element={
      <ProtectedRoute>
        <UpcomingMoviesPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/movies/now-playing"
    element={
      <ProtectedRoute>
        <NowPlayingPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/movies/popular"
    element={
      <ProtectedRoute>
        <PopularMoviesPage />
      </ProtectedRoute>
    }
  />

  {/* 404 页面 */}
  <Route path="*" element={<Navigate to="/" />} />
</Routes>

        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);