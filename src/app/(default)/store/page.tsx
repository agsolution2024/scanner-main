'use client';

import React from 'react';
import { CrudTemplate } from '@/app/components/templates/crud-template';
import { ProductTable } from '@/app/components/organisms/product-table';
import { ProductForm } from '@/app/components/organisms/product-form';
import { Package, Grid } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  status: 'active' | 'inactive';
}

// Mock data - replace with actual API calls
const mockProducts = [
  {
    id: '1',
    name: 'Product 1',
    price: 19.99,
    category: 'category1',
    description: 'Description 1',
    stock: 100,
    status: 'active' as const,
  },
  {
    id: '2',
    name: 'Product 2',
    price: 29.99,
    category: 'category2',
    description: 'Description 2',
    stock: 50,
    status: 'inactive' as const,
  },
];

const mockCategories = [
  { value: 'category1', label: 'Category 1' },
  { value: 'category2', label: 'Category 2' },
];

export default function StorePage() {
  const [activeTab, setActiveTab] = React.useState('products');
  const [showAddProduct, setShowAddProduct] = React.useState(false);
  const [products, setProducts] = React.useState(mockProducts);

  const tabs = [
    {
      id: 'products',
      label: 'Products',
      icon: <Package className="h-4 w-4" />,
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: <Grid className="h-4 w-4" />,
    },
  ];

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    setProducts((prev) => [
      ...prev,
      {
        ...product,
        id: (prev.length + 1).toString(),
      },
    ]);
    setShowAddProduct(false);
  };

  const handleEditProduct = (product: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? product : p))
    );
  };

  const handleDeleteProduct = (product: Product) => {
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  return (
    <CrudTemplate
      title="Store Management"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'products' && (
        <>
          <ProductTable
            products={products}
            onAdd={() => setShowAddProduct(true)}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
          {showAddProduct && (
            <ProductForm
              categories={mockCategories}
              onSubmit={handleAddProduct}
              onCancel={() => setShowAddProduct(false)}
              isDialog
            />
          )}
        </>
      )}
      {activeTab === 'categories' && (
        <div className="text-center py-8 text-gray-500">
          Category management coming soon...
        </div>
      )}
    </CrudTemplate>
  );
}