import { Card, Table } from 'react-bootstrap';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const UserListScreen = () => {
    const { data: users, isLoading, error } = useGetUsersQuery();

    return (
        <div className='lux-screen-shell'>
            <Card className='lux-panel'>
                <Card.Body>
                    <div className='mb-3'>
                        <p className='lux-subtitle mb-1'>Administration</p>
                        <h1 className='lux-section-title mb-0'>Users</h1>
                    </div>

                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>
                            {error?.data?.message || error.error || 'Error loading users'}
                        </Message>
                    ) : (
                        <Table responsive className='lux-table align-middle'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>
                                            <a href={`mailto:${user.email}`}>{user.email}</a>
                                        </td>
                                        <td>
                                            {user.isAdmin ? (
                                                <span className='text-success fw-semibold'>Yes</span>
                                            ) : (
                                                <span className='text-danger fw-semibold'>No</span>
                                            )}
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

export default UserListScreen;
