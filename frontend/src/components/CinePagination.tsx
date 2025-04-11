import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Props {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const CinePagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const getVisiblePages = () => {
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
  
    let start = Math.max(1, currentPage - half);
    let end = start + maxVisible - 1;
  
    if (end >= totalPages) {
      end = totalPages - 1;
      start = Math.max(1, end - maxVisible + 1);
    }
  
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  
  const visiblePages = getVisiblePages();
  

  return (
    <Box
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        color: '#FCD076',
      }}
    >
      <Typography>
        Page {currentPage} of {totalPages - 1}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeftIcon sx={{ color: '#FCD076' }} />
        </IconButton>

        {visiblePages.map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            sx={{
              minWidth: 36,
              backgroundColor: currentPage === page ? '#FCD076' : 'transparent',
              color: currentPage === page ? '#000' : '#FCD076',
              border: '1px solid #FCD076',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#fcd07633',
              },
            }}
          >
            {page}
          </Button>
        ))}

        <IconButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          <ChevronRightIcon sx={{ color: '#FCD076' }} />
        </IconButton>
      </Box>

      <Box>
        <Typography
          component="span"
          sx={{ color: '#FCD076', mr: 1, fontWeight: 'bold' }}
        >
          Results per page:
        </Typography>
        <Select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          sx={{
            color: '#FCD076',
            borderColor: '#FCD076',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#FCD076',
            },
            '.MuiSvgIcon-root': {
              color: '#FCD076',
            },
          }}
        >
          {[5, 10, 20, 50].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default CinePagination;
