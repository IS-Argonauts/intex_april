import React from 'react';
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Pagination,
  Stack,
} from '@mui/material';

interface CinePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const CinePagination: React.FC<CinePaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="body1" sx={{ mb: 1, color: '#FCD076' }}>
        Page {currentPage} of {totalPages}
      </Typography>

      <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
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
      </Stack>

      <Box sx={{ mt: 1 }}>
        <Typography component="label" sx={{ mr: 1, color: '#FCD076' }}>
          Results per page:
        </Typography>
        <Select
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(1);
          }}
          sx={{
            color: '#FFFFFF',
            borderColor: '#FCD076',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FCD076',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FCD076',
            },
            '& .MuiSvgIcon-root': {
              color: '#FCD076',
            },
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default CinePagination;
