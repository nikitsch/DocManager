import type { FC } from 'react';
import { useParams } from 'react-router';

const RequestPage: FC = () => {
  const { id } = useParams();
  return <>Request: {id}</>;
};

export default RequestPage;
