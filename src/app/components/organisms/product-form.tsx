'use client';

import React from 'react';
import { Input } from '@/app/components/atoms/input';
import { Button } from '@/app/components/atoms/button';
import { FormGroup } from '@/app/components/molecules/form-group';
import Select from '@/app/components/atoms/select';
import { Dialog } from '@/app/components/atoms/dialog';

interface Product {
  id?: string;
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  status: 'active' | 'inactive';
}

interface ProductFormProps {
  initialData?: Partial<Product>;
  categories: Array<{ value: string; label: string }>;
  onSubmit: (data: Product) => void;
  onCancel?: () => void;
  isDialog?: boolean;
}

const defaultProduct: Product = {
  name: '',
  price: 0,
  category: '',
  description: '',
  stock: 0,
  status: 'active',
};

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  onSubmit,
  onCancel,
  isDialog = false,
}) => {
  const [formData, setFormData] = React.useState<Product>({
    ...defaultProduct,
    ...initialData,
  });

  const [errors, setErrors] = React.useState<Partial<Record<keyof Product, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Product, string>> = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.category) newErrors.category = 'Category is required';
    if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof Product, value: Product[keyof Product]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const FormContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormGroup
        label="Product Name"
        htmlFor="name"
        required
        error={errors.name}
      >
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </FormGroup>

      <FormGroup
        label="Category"
        htmlFor="category"
        required
        error={errors.category}
      >
        <Select
          id="category"
          options={categories}
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
        />
      </FormGroup>

      <div className="grid grid-cols-2 gap-4">
        <FormGroup
          label="Price"
          htmlFor="price"
          required
          error={errors.price}
        >
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleChange('price', parseFloat(e.target.value))}
          />
        </FormGroup>

        <FormGroup
          label="Stock"
          htmlFor="stock"
          required
          error={errors.stock}
        >
          <Input
            id="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={(e) => handleChange('stock', parseInt(e.target.value, 10))}
          />
        </FormGroup>
      </div>

      <FormGroup
        label="Status"
        htmlFor="status"
      >
        <Select
          id="status"
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ]}
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value)}
        />
      </FormGroup>

      <FormGroup
        label="Description"
        htmlFor="description"
      >
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="min-h-[100px]"
        />
      </FormGroup>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {initialData?.id ? 'Update' : 'Create'} Product
        </Button>
      </div>
    </form>
  );

  if (isDialog) {
    return (
      <Dialog
        title={initialData?.id ? 'Edit Product' : 'Add New Product'}
        trigger={
          <Button>
            {initialData?.id ? 'Edit Product' : 'Add New Product'}
          </Button>
        }
      >
        {FormContent}
      </Dialog>
    );
  }

  return FormContent;
}; 