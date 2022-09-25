import { useEffect, useState } from 'react';

import Header from './header';
import Summary from './views/summary';
import Responses from './views/responses';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import NoAccessHeader from '../../header/noAccess';
import { fetchAnalytics } from '../../../utils/ipfs';
import Spinner from '../../spinner';

const FormAnalytics = () => {
  const [activePage, setActivePage] = useState(0);
  const [search, setSearch] = useState('');
  const [data, setData] = useState<any>({});
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        const cid = query.cid as string;
        const res = await fetchAnalytics(cid);
        setData(res);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    if (query?.cid) fetchSummary();
  }, [query.cid]);

  if (data?.metadata?.owner && address !== data?.metadata?.owner) {
    return <NoAccessHeader type="no-access" />;
  }

  return (
    <div className="relative w-full md:w-1/2 mx-auto">
      <Header
        responses={data?.details?.length}
        activePage={activePage}
        search={search}
        setSearch={setSearch}
        setActivePage={setActivePage}
        isRestricted={data?.metadata?.restricted?.length > 0}
      />

      {isLoading && (
        <div className="mt-10">
          <Spinner />
        </div>
      )}

      {activePage === 0 && data?.details && (
        <Summary
          formData={data?.details}
          isRestricted={data?.metadata?.restricted?.length > 0}
        />
      )}
      {activePage === 1 && data && data?.metadata?.restricted?.length === 0 && (
        <Responses formData={data} search={search} />
      )}
    </div>
  );
};
export default FormAnalytics;
