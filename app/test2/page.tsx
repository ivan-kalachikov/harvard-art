'use client';

import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import styles from './page.module.scss';
import Filters from '../components/Filters';

export default function Test2() {
  return (
    <div style={{ padding: '30px', height: '100vh' }}>
      <Filters />
    </div>
  );
}
