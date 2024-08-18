import ViewAd from './ad/ad.component';

const AdPage = async ({ params }: { params: { id: number } }) => {
  const response = await fetch(`${process.env.NEXT_URL}/api/ads/${params.id}`, {
    cache: 'no-store',
  });
  const ad = await response.json();

  if (response.status === 200) {
    return <ViewAd ad={ad} />;
  }
  // TODO Customize.
  return <div>No Ad Matches this listing.</div>;
};

export default AdPage;
