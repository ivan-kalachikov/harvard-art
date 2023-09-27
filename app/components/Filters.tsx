import Filter from '@/components/Filter';
import { FiltersKeys } from '@/types/filter';

export default function Filters() {
  const simpleFilters: FiltersKeys[] = [
    'culture',
    'technique',
    'century',
    'period',
    'place',
    'worktype',
    'classification',
  ];
  return (
    <div style={{ display: 'flex' }}>
      {simpleFilters.map((filter) => (
        <Filter key={filter} filter={filter} />
      ))}
      <Filter
        filter='color'
        sort='name'
        getOptionValue={(option) => {
          return option?.hex ? `%23${option.hex.slice(1)}` : null;
        }}
      />
    </div>
  );
}
