export interface Product {
  id: string;
  name: string;
  description: string;
  priceId: string;
  price: number;
  mode: 'subscription' | 'payment';
}

export const products: Product[] = [
  {
    id: 'prod_SawRtZgA6v2EgJ',
    name: 'UnifiSign Pro',
    description: 'UnifiSign Pro License Monthly Subscription Charges',
    priceId: 'price_1RfkYUCLexvkDNg6UUzVdTXN',
    price: 29.00,
    mode: 'subscription',
  },
  {
    id: 'prod_SawS1Tf9fE44aR',
    name: 'UnifiSign Enterprise',
    description: 'UnifiSign Enterprise Monthly Subscription',
    priceId: 'price_1RfkZpCLexvkDNg6gZb1CQXR',
    price: 99.00,
    mode: 'subscription',
  },
];

export function getProductByPriceId(priceId: string): Product | undefined {
  return products.find(product => product.priceId === priceId);
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductByPackageId(packageId: number): Product | undefined {
  if (packageId === 2) {
    return products.find(p => p.name === 'UnifiSign Pro');
  } else if (packageId === 3) {
    return products.find(p => p.name === 'UnifiSign Enterprise');
  }
  return undefined;
}