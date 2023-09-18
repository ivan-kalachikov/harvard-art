import { useState, useRef, useEffect } from 'react';
import Select, { components, InputActionMeta } from 'react-select';
import debounce from 'lodash/debounce';
import upperFirst from 'lodash/upperFirst';
import axios, { AxiosResponse } from 'axios';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

import Filter from './Filter';

export default function Filters() {
  return (
    <div style={{ display: 'flex' }}>
      <Filter endpoint='culture' />
      <Filter endpoint='technique' />
    </div>
  );
}
