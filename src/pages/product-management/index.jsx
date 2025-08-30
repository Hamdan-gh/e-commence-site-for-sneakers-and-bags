import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';

import Button from '../../components/ui/Button';
import ProductTable from './components/ProductTable';
import ProductFilters from './components/ProductFilters';
import ProductForm from './components/ProductForm';
import BulkActionModal from './components/BulkActionModal';
import ProductStats from './components/ProductStats';

const ProductManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [bulkAction, setBulkAction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    searchQuery: '',
    selectedCategory: '',
    selectedBrand: '',
    selectedStatus: '',
    priceRange: { min: '', max: '' }
  });

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Air Jordan 1 Retro High",
      brand: "Jordan",
      category: "sneakers",
      price: 850,
      comparePrice: 950,
      stock: 25,
      status: "active",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop",
      description: `The Air Jordan 1 Retro High brings back the classic basketball shoe that started it all.\n\nFeaturing premium leather construction and iconic colorway, this sneaker combines heritage style with modern comfort.\n\nPerfect for both on-court performance and street style.`,
      sku: "AJ1-001",
      barcode: "123456789012",
      weight: 1.2,
      dimensions: { length: "32", width: "12", height: "15" },
      seoTitle: "Air Jordan 1 Retro High - Classic Basketball Sneakers",
      seoDescription: "Shop the iconic Air Jordan 1 Retro High sneakers. Premium leather construction, classic design, and unmatched comfort for basketball and lifestyle wear.",
      tags: ["jordan", "basketball", "retro", "high-top", "leather"],
      images: [
        { id: 1, url: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop", alt: "Air Jordan 1 main view" },
        { id: 2, url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", alt: "Air Jordan 1 side view" }
      ],
      variants: [
        { id: 1, size: "8", color: { name: "Black", value: "#000000" }, stock: 5, price: "850" },
        { id: 2, size: "9", color: { name: "Black", value: "#000000" }, stock: 8, price: "850" },
        { id: 3, size: "10", color: { name: "White", value: "#FFFFFF" }, stock: 12, price: "850" }
      ]
    },
    {
      id: 2,
      name: "Nike Air Max 270",
      brand: "Nike",
      category: "sneakers",
      price: 650,
      comparePrice: 750,
      stock: 42,
      status: "active",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      description: `Nike's biggest heel Air unit yet delivers exceptional comfort and style.\n\nThe Air Max 270 features a sleek design inspired by Air Max icons of the past.\n\nBuilt for all-day comfort with maximum impact protection.`,
      sku: "AM270-002",
      barcode: "123456789013",
      weight: 1.1,
      dimensions: { length: "31", width: "11", height: "14" },
      seoTitle: "Nike Air Max 270 - Ultimate Comfort Running Shoes",
      seoDescription: "Experience ultimate comfort with Nike Air Max 270. Featuring the largest Air unit for maximum cushioning and modern style.",
      tags: ["nike", "air max", "running", "comfort", "lifestyle"],
      images: [
        { id: 1, url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", alt: "Nike Air Max 270 main" }
      ],
      variants: []
    },
    {
      id: 3,
      name: "Adidas Ultraboost 22",
      brand: "Adidas",
      category: "sneakers",
      price: 720,
      comparePrice: 800,
      stock: 8,
      status: "active",
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
      description: `Revolutionary running shoe with responsive Boost midsole technology.\n\nPrimeknit upper provides adaptive support and breathability.\n\nDesigned for runners who demand the best performance and comfort.`,
      sku: "UB22-003",
      barcode: "123456789014",
      weight: 1.0,
      dimensions: { length: "30", width: "11", height: "13" },
      seoTitle: "Adidas Ultraboost 22 - Premium Running Shoes",
      seoDescription: "Run further with Adidas Ultraboost 22. Boost technology and Primeknit upper for ultimate running performance.",
      tags: ["adidas", "ultraboost", "running", "boost", "primeknit"],
      images: [
        { id: 1, url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop", alt: "Adidas Ultraboost 22" }
      ],
      variants: []
    },
    {
      id: 4,
      name: "Louis Vuitton Neverfull MM",
      brand: "Louis Vuitton",
      category: "bags",
      price: 4500,
      comparePrice: 5000,
      stock: 15,
      status: "active",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
      description: `Iconic tote bag crafted from Monogram canvas with natural cowhide leather trim.\n\nSpacious interior with removable pochette for organization.\n\nTimeless design perfect for work, travel, and everyday luxury.`,
      sku: "LV-NF-004",
      barcode: "123456789015",
      weight: 0.8,
      dimensions: { length: "32", width: "29", height: "17" },
      seoTitle: "Louis Vuitton Neverfull MM - Luxury Tote Bag",
      seoDescription: "Shop the iconic Louis Vuitton Neverfull MM tote bag. Monogram canvas with leather trim, spacious design for luxury everyday use.",
      tags: ["louis vuitton", "neverfull", "tote", "luxury", "monogram"],
      images: [
        { id: 1, url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop", alt: "Louis Vuitton Neverfull" }
      ],
      variants: []
    },
    {
      id: 5,
      name: "Gucci GG Marmont Shoulder Bag",
      brand: "Gucci",
      category: "bags",
      price: 3200,
      comparePrice: 3500,
      stock: 0,
      status: "out-of-stock",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      description: `Quilted leather shoulder bag with iconic Double G hardware.\n\nChain strap can be worn on shoulder or across body.\n\nLuxurious craftsmanship with signature Gucci styling.`,
      sku: "GG-MAR-005",
      barcode: "123456789016",
      weight: 0.6,
      dimensions: { length: "26", width: "15", height: "7" },
      seoTitle: "Gucci GG Marmont Shoulder Bag - Designer Luxury",
      seoDescription: "Elegant Gucci GG Marmont shoulder bag with quilted leather and Double G hardware. Perfect luxury accessory for any occasion.",
      tags: ["gucci", "marmont", "shoulder bag", "quilted", "luxury"],
      images: [
        { id: 1, url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", alt: "Gucci GG Marmont" }
      ],
      variants: []
    },
    {
      id: 6,
      name: "Puma RS-X Reinvention",
      brand: "Puma",
      category: "sneakers",
      price: 480,
      comparePrice: 550,
      stock: 35,
      status: "active",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop",
      description: `Bold chunky sneaker with retro-futuristic design elements.\n\nRS cushioning technology for superior comfort and support.\n\nVibrant colorways perfect for making a statement.`,
      sku: "PUMA-RSX-006",
      barcode: "123456789017",
      weight: 1.3,
      dimensions: { length: "32", width: "12", height: "15" },
      seoTitle: "Puma RS-X Reinvention - Chunky Retro Sneakers",
      seoDescription: "Step into the future with Puma RS-X Reinvention sneakers. Bold design, RS cushioning, and retro-futuristic style.",
      tags: ["puma", "rs-x", "chunky", "retro", "futuristic"],
      images: [
        { id: 1, url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop", alt: "Puma RS-X" }
      ],
      variants: []
    },
    {
      id: 7,
      name: "Prada Saffiano Leather Tote",
      brand: "Prada",
      category: "bags",
      price: 2800,
      comparePrice: 3100,
      stock: 12,
      status: "active",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
      description: `Structured tote bag in signature Saffiano leather.\n\nDual handles and detachable shoulder strap for versatility.\n\nMinimalist design with Prada's refined Italian craftsmanship.`,
      sku: "PRADA-SAF-007",
      barcode: "123456789018",
      weight: 0.9,
      dimensions: { length: "35", width: "25", height: "15" },
      seoTitle: "Prada Saffiano Leather Tote - Italian Luxury",
      seoDescription: "Elegant Prada Saffiano leather tote bag. Structured design with dual handles and signature Italian craftsmanship.",
      tags: ["prada", "saffiano", "tote", "leather", "italian"],
      images: [
        { id: 1, url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop", alt: "Prada Saffiano Tote" }
      ],
      variants: []
    },
    {
      id: 8,
      name: "Nike Dunk Low Retro",
      brand: "Nike",
      category: "sneakers",
      price: 520,
      comparePrice: 600,
      stock: 3,
      status: "active",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      description: `Classic basketball shoe with vintage appeal and modern comfort.\n\nPremium leather upper with perforated toe box for breathability.\n\nTimeless colorways that never go out of style.`,
      sku: "DUNK-LOW-008",
      barcode: "123456789019",
      weight: 1.1,
      dimensions: { length: "31", width: "11", height: "13" },
      seoTitle: "Nike Dunk Low Retro - Classic Basketball Sneakers",
      seoDescription: "Classic Nike Dunk Low Retro sneakers with vintage appeal. Premium leather construction and timeless basketball style.",
      tags: ["nike", "dunk", "low", "retro", "basketball"],
      images: [
        { id: 1, url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop", alt: "Nike Dunk Low" }
      ],
      variants: []
    }
  ];

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = products;

    if (filters?.searchQuery) {
      const query = filters?.searchQuery?.toLowerCase();
      filtered = filtered?.filter(product => 
        product?.name?.toLowerCase()?.includes(query) ||
        product?.brand?.toLowerCase()?.includes(query) ||
        product?.sku?.toLowerCase()?.includes(query)
      );
    }

    if (filters?.selectedCategory) {
      filtered = filtered?.filter(product => product?.category === filters?.selectedCategory);
    }

    if (filters?.selectedBrand) {
      filtered = filtered?.filter(product => product?.brand?.toLowerCase() === filters?.selectedBrand);
    }

    if (filters?.selectedStatus) {
      filtered = filtered?.filter(product => product?.status === filters?.selectedStatus);
    }

    if (filters?.priceRange?.min !== '') {
      filtered = filtered?.filter(product => product?.price >= parseFloat(filters?.priceRange?.min));
    }

    if (filters?.priceRange?.max !== '') {
      filtered = filtered?.filter(product => product?.price <= parseFloat(filters?.priceRange?.max));
    }

    setFilteredProducts(filtered);
  }, [products, filters]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSelectProduct = (productId, isSelected) => {
    if (isSelected) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev?.filter(id => id !== productId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedProducts(filteredProducts?.map(product => product?.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsProductFormOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsProductFormOpen(true);
  };

  const handleViewProduct = (product) => {
    // Navigate to product detail view or open preview modal
    console.log('View product:', product);
  };

  const handleDeleteProduct = (productId) => {
    setSelectedProducts([productId]);
    setBulkAction('delete');
    setIsBulkModalOpen(true);
  };

  const handleBulkAction = (action) => {
    setBulkAction(action);
    setIsBulkModalOpen(true);
  };

  const handleProductSubmit = (productData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingProduct) {
        // Update existing product
        setProducts(prev => prev?.map(product => 
          product?.id === editingProduct?.id 
            ? { ...productData, id: editingProduct?.id }
            : product
        ));
      } else {
        // Add new product
        const newProduct = {
          ...productData,
          id: Date.now(),
          stock: productData?.variants?.reduce((sum, variant) => sum + variant?.stock, 0) || 0,
          status: productData?.status || 'active'
        };
        setProducts(prev => [newProduct, ...prev]);
      }
      
      setIsProductFormOpen(false);
      setEditingProduct(null);
      setIsLoading(false);
    }, 1500);
  };

  const handleBulkConfirm = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (bulkAction === 'delete') {
        setProducts(prev => prev?.filter(product => !selectedProducts?.includes(product?.id)));
      } else if (bulkAction === 'activate') {
        setProducts(prev => prev?.map(product => 
          selectedProducts?.includes(product?.id) 
            ? { ...product, status: 'active' }
            : product
        ));
      } else if (bulkAction === 'deactivate') {
        setProducts(prev => prev?.map(product => 
          selectedProducts?.includes(product?.id) 
            ? { ...product, status: 'inactive' }
            : product
        ));
      }
      
      setSelectedProducts([]);
      setIsBulkModalOpen(false);
      setBulkAction('');
      setIsLoading(false);
    }, 1500);
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCategory: '',
      selectedBrand: '',
      selectedStatus: '',
      priceRange: { min: '', max: '' }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={handleToggleSidebar} 
      />
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Management</h1>
              <p className="text-gray-600">
                Manage your sneakers and bags inventory with comprehensive tools for creation, editing, and organization.
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={handleAddProduct}
              >
                Add New Product
              </Button>
            </div>
          </div>

          {/* Stats */}
          <ProductStats products={products} />

          {/* Filters */}
          <ProductFilters
            searchQuery={filters?.searchQuery}
            onSearchChange={(value) => setFilters(prev => ({ ...prev, searchQuery: value }))}
            selectedCategory={filters?.selectedCategory}
            onCategoryChange={(value) => setFilters(prev => ({ ...prev, selectedCategory: value }))}
            selectedBrand={filters?.selectedBrand}
            onBrandChange={(value) => setFilters(prev => ({ ...prev, selectedBrand: value }))}
            selectedStatus={filters?.selectedStatus}
            onStatusChange={(value) => setFilters(prev => ({ ...prev, selectedStatus: value }))}
            priceRange={filters?.priceRange}
            onPriceRangeChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
            onClearFilters={handleClearFilters}
            onBulkAction={handleBulkAction}
            selectedCount={selectedProducts?.length}
          />

          {/* Loading State */}
          {isLoading && !isProductFormOpen && !isBulkModalOpen && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          )}

          {/* Product Table */}
          {!isLoading && (
            <ProductTable
              products={filteredProducts}
              selectedProducts={selectedProducts}
              onSelectProduct={handleSelectProduct}
              onSelectAll={handleSelectAll}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
              onViewProduct={handleViewProduct}
            />
          )}
        </div>
      </main>
      {/* Product Form Modal */}
      <ProductForm
        isOpen={isProductFormOpen}
        onClose={() => {
          setIsProductFormOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleProductSubmit}
        product={editingProduct}
        isLoading={isLoading}
      />
      {/* Bulk Action Modal */}
      <BulkActionModal
        isOpen={isBulkModalOpen}
        onClose={() => {
          setIsBulkModalOpen(false);
          setBulkAction('');
        }}
        onConfirm={handleBulkConfirm}
        action={bulkAction}
        selectedCount={selectedProducts?.length}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductManagement;