"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Pencil,
  Save,
  Trash2,
  ArrowLeft,
  Plus,
  Minus,
  ImageIcon,
  Tag,
  Layers,
  Package,
  DollarSign,
  BarChart,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/types/schema"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('general');
  const [isDirty, setIsDirty] = useState(false);

  // Mock fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/products/${params.id}`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockProduct: Product = {
          id: params.id,
          name: 'Premium Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
          price: 199.99,
          compareAtPrice: 249.99,
          cost: 89.99,
          sku: 'WH-1000XM4',
          barcode: '123456789012',
          inventory: {
            quantity: 45,
            lowStockThreshold: 10,
            trackInventory: true,
            allowBackorders: false
          },
          images: [
            {
              id: '1',
              url: '/placeholder.svg?height=300&width=300',
              alt: 'Wireless Headphones - Black',
              position: 1
            },
            {
              id: '2',
              url: '/placeholder.svg?height=300&width=300',
              alt: 'Wireless Headphones - Side View',
              position: 2
            }
          ],
          categories: ['Electronics', 'Audio', 'Headphones'],
          tags: ['wireless', 'noise-cancellation', 'premium'],
          attributes: [
            { name: 'Color', value: 'Black' },
            { name: 'Connectivity', value: 'Bluetooth 5.0' },
            { name: 'Battery Life', value: '30 hours' }
          ],
          variants: [
            {
              id: 'v1',
              productId: params.id,
              name: 'Black',
              sku: 'WH-1000XM4-BLK',
              price: 199.99,
              inventory: {
                quantity: 30,
                lowStockThreshold: 5,
                trackInventory: true
              },
              attributes: [
                { name: 'Color', value: 'Black' }
              ],
              isDefault: true,
              status: 'active',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              id: 'v2',
              productId: params.id,
              name: 'Silver',
              sku: 'WH-1000XM4-SLV',
              price: 199.99,
              inventory: {
                quantity: 15,
                lowStockThreshold: 5,
                trackInventory: true
              },
              attributes: [
                { name: 'Color', value: 'Silver' }
              ],
              isDefault: false,
              status: 'active',
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
          status: 'active',
          visibility: 'visible',
          seo: {
            title: 'Premium Wireless Headphones | NEXURA',
            description: 'Experience premium sound quality with our wireless headphones featuring industry-leading noise cancellation.',
            keywords: ['wireless headphones', 'noise cancellation', 'premium audio']
          },
          createdAt: new Date('2023-01-15'),
          updatedAt: new Date('2023-06-20')
        };
        
        setProduct(mockProduct);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: 'Error',
          description: 'Failed to load product data',
          variant: 'destructive'
        });
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, toast]);

  const handleInputChange = (field: string, value: any) => {
    if (!product) return;
    
    // Handle nested fields
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProduct({
        ...product,
        [parent]: {
          ...product[parent as keyof Product],
          [child]: value
        }
      });
    } else {
      setProduct({
        ...product,
        [field]: value
      });
    }
    
    setIsDirty(true);
  };

  const handleInventoryChange = (field: string, value: any) => {
    if (!product) return;
    
    setProduct({
      ...product,
      inventory: {
        ...product.inventory,
        [field]: value
      }
    });
    
    setIsDirty(true);
  };

  const handleAttributeChange = (index: number, field: 'name' | 'value', value: string) => {
    if (!product) return;
    
    const updatedAttributes = [...product.attributes];
    updatedAttributes[index] = {
      ...updatedAttributes[index],
      [field]: value
    };
    
    setProduct({
      ...product,
      attributes: updatedAttributes
    });
    
    setIsDirty(true);
  };

  const addAttribute = () => {
    if (!product) return;
    
    setProduct({
      ...product,
      attributes: [...product.attributes, { name: '', value: '' }]
    });
    
    setIsDirty(true);
  };

  const removeAttribute = (index: number) => {
    if (!product) return;
    
    const updatedAttributes = [...product.attributes];
    updatedAttributes.splice(index, 1);
    
    setProduct({
      ...product,
      attributes: updatedAttributes
    });
    
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (!product) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/products/${params.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(product)
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Success',
        description: 'Product updated successfully',
      });
      
      setIsDirty(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: 'Error',
        description: 'Failed to update product',
        variant: 'destructive'
      });
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/products/${params.id}`, {
      //   method: 'DELETE'
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Success',
        description: 'Product deleted successfully',
      });
      
      router.push('/admin/inventory');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        variant: 'destructive'
      });
      setIsLoading(false);
    }
  };

  if (isLoading || !product) {
    return (
      <div className="container mx-auto p-6 animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded mb-6"></div>
        <div className="h-96 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push('/admin/inventory')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Edit Product</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={() => router.push(`/products/${params.id}`)}>
            <FileText className="h-4 w-4" />
            View Product
          </Button>
          <Button variant="destructive" className="gap-2" onClick={handleDelete} disabled={isLoading}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          <Button className="gap-2" onClick={handleSave} disabled={isLoading || !isDirty}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Images
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="variants" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Variants
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>Basic information about the product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name" 
                    value={product.name} 
                    onChange={(e) => handleInputChange('name', e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    rows={5}
                    value={product.description} 
                    onChange={(e) => handleInputChange('description', e.target.value)} 
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input 
                        id="price" 
                        type="number"
                        className="pl-8"
                        value={product.price} 
                        onChange={(e) => handleInputChange('price', Number.parseFloat(e.target.value))} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="compareAtPrice">Compare at Price ($)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input 
                        id="compareAtPrice" 
                        type="number"
                        className="pl-8"
                        value={product.compareAtPrice || ''} 
                        onChange={(e) => handleInputChange('compareAtPrice', e.target.value ? Number.parseFloat(e.target.value) : undefined)} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost ($)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input 
                        id="cost" 
                        type="number"
                        className="pl-8"
                        value={product.cost || ''} 
                        onChange={(e) => handleInputChange('cost', e.target.value ? Number.parseFloat(e.target.value) : undefined)} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input 
                      id="sku" 
                      value={product.sku} 
                      onChange={(e) => handleInputChange('sku', e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input 
                      id="barcode" 
                      value={product.barcode || ''} 
                      onChange={(e) => handleInputChange('barcode', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Categories & Tags</CardTitle>
              <CardDescription>Organize your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {category}
                      <button 
                        onClick={() => {
                          const updatedCategories = [...product.categories];
                          updatedCategories.splice(index, 1);
                          handleInputChange('categories', updatedCategories);
                        }}
                        className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <div className="flex items-center">
                    <Input 
                      placeholder="Add category..." 
                      className="w-40 h-8"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                          handleInputChange('categories', [...product.categories, e.currentTarget.value]);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {tag}
                      <button 
                        onClick={() => {
                          const updatedTags = [...product.tags];
                          updatedTags.splice(index, 1);
                          handleInputChange('tags', updatedTags);
                        }}
                        className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <div className="flex items-center">
                    <Input 
                      placeholder="Add tag..." 
                      className="w-40 h-8"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                          handleInputChange('tags', [...product.tags, e.currentTarget.value]);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Attributes</CardTitle>
              <CardDescription>Product specifications and features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {product.attributes.map((attribute, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Input 
                    placeholder="Attribute name" 
                    value={attribute.name} 
                    onChange={(e) => handleAttributeChange(index, 'name', e.target.value)} 
                    className="flex-1"
                  />
                  <Input 
                    placeholder="Attribute value" 
                    value={attribute.value} 
                    onChange={(e) => handleAttributeChange(index, 'value', e.target.value)} 
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => removeAttribute(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={addAttribute}
              >
                <Plus className="h-4 w-4" />
                Add Attribute
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
              <CardDescription>Product visibility and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={product.status} 
                    onValueChange={(value) => handleInputChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select 
                    value={product.visibility} 
                    onValueChange={(value) => handleInputChange('visibility', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visible">Visible</SelectItem>
                      <SelectItem value="hidden">Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>Manage product images</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image.url || "/placeholder.svg"} 
                      alt={image.alt || 'Product image'} 
                      className="w-full h-40 object-cover rounded-md border"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button variant="secondary" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Input 
                      value={image.alt || ''} 
                      onChange={(e) => {
                        const updatedImages = [...product.images];
                        updatedImages[index] = {
                          ...updatedImages[index],
                          alt: e.target.value
                        };
                        handleInputChange('images', updatedImages);
                      }}
                      placeholder="Alt text"
                      className="mt-2"
                    />
                  </div>
                ))}
                <div className="border border-dashed rounded-md flex items-center justify-center h-40 cursor-pointer hover:bg-gray-100 transition-colors duration-200">\

