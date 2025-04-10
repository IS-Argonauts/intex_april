import React, { useEffect, useState } from 'react';
import { Box, Pagination, Typography } from '@mui/material';
import { fetchMovieCount } from '../api/movies';

interface CinePaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

const CinePagination: React.FC<CinePaginationProps> = ({
  currentPage,
  onPageChange,
  itemsPerPage = 10,
}) => {
  const [totalMovies, setTotalMovies] = useState<number>(0);

  useEffect(() => {
    const fetchTotalMovies = async () => {
      try {
        const count = await fetchMovieCount();
        setTotalMovies(count);
      } catch (error) {
        console.error('Failed to fetch movie count:', error);
      }
    };
    fetchTotalMovies();
  }, []);

  const totalPages = Math.ceil(totalMovies / itemsPerPage);

  // Safety net: if current page is out of bounds, reset to last valid page
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      onPageChange(totalPages);
    }
  }, [totalPages, currentPage, onPageChange]);

  if (totalPages <= 1) return null;

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="body1" sx={{ mb: 1, color: '#FCD076' }}>
        Page {currentPage} of {totalPages}
      </Typography>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => onPageChange(value)}
        siblingCount={1}
        boundaryCount={1}
        showFirstButton
        showLastButton
        variant="outlined"
        shape="rounded"
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#FFFFFF',
            borderColor: '#FCD076',
          },
          '& .MuiPaginationItem-root:hover': {
            backgroundColor: '#FCD076',
            color: '#000000',
          },
          '& .Mui-selected': {
            backgroundColor: '#FCD076 !important',
            color: '#000000',
            borderColor: '#FCD076',
          },
        }}
      />
    </Box>
  );
};

export default CinePagination;
