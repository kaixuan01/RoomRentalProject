import { Suspense } from 'react';
import Loading from '../../../../components/shared/Loading/Loading';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
