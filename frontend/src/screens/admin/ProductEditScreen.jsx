import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, FormControl, Card } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
    useGetProductDetailsQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({
                productId,
                name,
                price,
                image,
                category,
                description,
                countInStock,
            }).unwrap();
            toast.success('Product updated successfully');
            refetch();
            navigate('/admin/productlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            setImage(res.image);
            toast.success('Image uploaded successfully');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className='lux-screen-shell'>
            <Link to='/admin/productlist' className='btn btn-outline-secondary back-btn my-3'>
                ← Back to products
            </Link>
            <FormContainer>
                <Card className='lux-panel'>
                    <Card.Body>
                        <p className='lux-subtitle mb-1'>Administration</p>
                        <h1 className='lux-section-title mb-4'>Edit product</h1>
                        {loadingUpdate && <Loader />}
                        {isLoading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant='danger'>{error}</Message>
                        ) : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name' className='mb-3'>
                                    <Form.Label className='lux-form-label'>Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        className='lux-form-control'
                                        placeholder='Product name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId='price' className='mb-3'>
                                    <Form.Label className='lux-form-label'>Price</Form.Label>
                                    <Form.Control
                                        type='number'
                                        className='lux-form-control'
                                        placeholder='Price'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId='image' className='mb-3'>
                                    <Form.Label className='lux-form-label'>Image URL</Form.Label>
                                    <Form.Control
                                        type='text'
                                        className='lux-form-control'
                                        placeholder='Image URL'
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                    <FormControl
                                        type='file'
                                        className='mt-2'
                                        onChange={uploadFileHandler}
                                    />
                                </Form.Group>

                                <Form.Group controlId='countInStock' className='mb-3'>
                                    <Form.Label className='lux-form-label'>Stock</Form.Label>
                                    <Form.Control
                                        type='number'
                                        className='lux-form-control'
                                        placeholder='Available quantity'
                                        value={countInStock}
                                        onChange={(e) => setCountInStock(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId='category' className='mb-3'>
                                    <Form.Label className='lux-form-label'>Category</Form.Label>
                                    <Form.Control
                                        type='text'
                                        className='lux-form-control'
                                        placeholder='Category'
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId='description' className='mb-3'>
                                    <Form.Label className='lux-form-label'>Description</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        rows={4}
                                        className='lux-form-control'
                                        placeholder='Product description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>

                                <Button type='submit' className='lux-btn-primary w-100 mt-2'>
                                    Update product
                                </Button>
                            </Form>
                        )}
                    </Card.Body>
                </Card>
            </FormContainer>
        </div>
    );
};

export default ProductEditScreen;