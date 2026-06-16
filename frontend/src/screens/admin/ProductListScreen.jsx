import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Card } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useGetProductsQuery, useCreateProductMutation, useProductDeleteMutation } from '../../slices/productsApiSlice';

const ProductListScreen = () => {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDelete }] = useProductDeleteMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id).unwrap();
                toast.success('Product deleted successfully');
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                await createProduct().unwrap();
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className='lux-screen-shell'>
            <Card className='lux-panel'>
                <Card.Body>
                    <Row className='align-items-center mb-3'>
                        <Col>
                            <p className='lux-subtitle mb-1'>Administration</p>
                            <h1 className='lux-section-title mb-0'>Products</h1>
                        </Col>
                        <Col className='text-end'>
                            <Button className='lux-btn-primary' onClick={createProductHandler}>
                                <FaPlus /> Create new product
                            </Button>
                        </Col>
                    </Row>

                    {loadingCreate && <Loader />}
                    {loadingDelete && <Loader />}
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <Table responsive className='lux-table align-middle'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th className='text-end'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price} EUR</td>
                                        <td>{product.category}</td>
                                        <td className='text-end'>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='lux-btn-outline btn-sm me-2'>
                                                    <FaEdit />
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant='danger'
                                                className='btn-sm'
                                                onClick={() => deleteHandler(product._id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProductListScreen;