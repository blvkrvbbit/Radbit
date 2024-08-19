import AdForm from "../../form/ad-form.component";
import { useSession } from 'next-auth/react';

const EditPage = async ({ params }: { params: { id: string } }) => {
	/**
	 * Edit Page
	 * 
	*/

	const response = await fetch(`${process.env.NEXT_URL}/api/ads/category`, {
		cache: 'no-store',
	});
	const categories = await response.json();

	const adResponse = await fetch(`${process.env.NEXT_URL}/api/ads/${params.id}`);
	const ad = await adResponse.json();

	return (
		<div>
			<div className='container'>
				<AdForm editing={true} ad={ad} categories={categories} />
			</div>
		</div>
	);
}

export default EditPage;