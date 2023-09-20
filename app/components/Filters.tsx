import Filter from './Filter';

export default function Filters() {
  return (
    <div style={{ display: 'flex' }}>
      <Filter endpoint='culture' />
      <Filter endpoint='technique' />
    </div>
  );
}
