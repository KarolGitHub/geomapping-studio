import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2 }}>
      <TextField
        label='Search location'
        variant='outlined'
        size='small'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch(query);
          }
        }}
        sx={{ flex: 1 }}
      />
      <Button variant='contained' onClick={() => onSearch(query)}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
