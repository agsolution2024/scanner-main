'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/atoms/table';
import { SearchBar } from '@/app/components/molecules/search-bar';
import { TableActions } from '@/app/components/molecules/table-actions';
import { StatusBadge } from '@/app/components/molecules/status-badge';
import { Button } from '@/app/components/atoms/button';
import { PlusCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  status: 'active' | 'inactive';
}

interface ProductTableProps {
  products: Product[];
  onAdd?: () => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onView?: (product: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onAdd,
  onEdit,
  onDelete,
  onView,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredProducts, setFilteredProducts] = React.useState(products);

  React.useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="w-96">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search products..."
            showSearchButton={false}
          />
        </div>
        {onAdd && (
          <Button onClick={onAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <StatusBadge status={product.status} />
                </TableCell>
                <TableCell>
                  <TableActions
                    onView={() => onView?.(product)}
                    onEdit={() => onEdit?.(product)}
                    onDelete={() => onDelete?.(product)}
                    confirmDelete
                  />
                </TableCell>
              </TableRow>
            ))}
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}; 