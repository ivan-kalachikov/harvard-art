import Filter from './Filter';

export default function Filters() {
  return (
    <div style={{ display: 'flex' }}>
      <Filter endpoint='culture' />
      <Filter endpoint='technique' />
      <Filter endpoint='century' />
      <Filter endpoint='period' />
      <Filter endpoint='place' />
      <Filter
        endpoint='color'
        sort='name'
        getOptionValue={(option) => {
          return option?.hex ? `%23${option.hex.slice(1)}` : null;
        }}
      />
      <Filter endpoint='worktype' />
      <Filter endpoint='classification' />
    </div>
  );
}
