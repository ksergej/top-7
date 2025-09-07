'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="b4d2da165a9fcf662dd77d988f06ef4f213601ef"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};