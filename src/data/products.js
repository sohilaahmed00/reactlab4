const API_BASE = 'https://dummyjson.com/products';

const mapProduct = (apiProduct) => ({
    id: apiProduct.id,
    title: apiProduct.title,
    price: apiProduct.price,
    category: apiProduct.category,
    stock: apiProduct.stock,
    image: apiProduct.thumbnail,
    rating: apiProduct.rating,
    description: apiProduct.description,
});

export const fetchProducts = async (params = {}) => {
    const limit = params.limit || 10;
    const skip = params.skip || 0;
    const url = `${API_BASE}?limit=${limit}&skip=${skip}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return {
            products: data.products.map(mapProduct),
            total: data.total,
            skip: data.skip,
            limit: data.limit
        };
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
};

export const fetchProduct = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/${id}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return mapProduct(data);
    } catch (error) {
        console.error('Failed to fetch product:', error);
        throw error;
    }
};

