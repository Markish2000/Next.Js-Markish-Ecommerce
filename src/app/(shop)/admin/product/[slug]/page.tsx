import { redirect } from 'next/navigation';

import { ProductForm } from './ui/ProductForm';
import { Title } from '@/components';

import { getCategories, getProductBySlug } from '@/actions';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Readonly<Props>) {
  const { slug } = params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product && slug !== 'new') redirect('/admin/products');

  const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto';
  return (
    <>
      <Title title={title} />

      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
