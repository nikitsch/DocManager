import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';

const fetchRecords = async () => {
  const res = await fetch('api/records');
  return res.json();
};

const ArchivePage: FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['records'],
    queryFn: fetchRecords,
  });
  console.log({ data, isLoading, error });

  return (
    <>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
      <div>Archive</div>
    </>
  );
};

export default ArchivePage;
