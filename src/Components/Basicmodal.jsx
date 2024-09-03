import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useMutationCart from '../Hokes/useMutaionCart';
import { cashPayment, onlinePayment } from '../APIS/Paynemt';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ cartId }) {
    const [open, setOpen] = React.useState(false);
    const [isOnlinePayment, setIsOnlinePayment] = React.useState(false);

    const handleOpen = (paymentType) => {
        setIsOnlinePayment(paymentType === 'online');
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const { mutate, data, isSuccess: isOnlineSuccess } = useMutationCart(onlinePayment);
    const { mutate: cashMutate, data: cashData, isSuccess: isCashSuccess } = useMutationCart(cashPayment);

    React.useEffect(() => {
        if (isOnlineSuccess && data?.data?.status === 'success') {
            window.location.href = data.data.session.url;
        }
        if (isCashSuccess && cashData?.data?.status === 'success') {
            toast.success('Cash payment processed successfully!');
            handleClose(); // Close the modal after success
        }
    }, [isOnlineSuccess, isCashSuccess, data, cashData]);

    const handleSubmit = (values) => {
        if (isOnlinePayment) {
            mutate({ cartId, shippingAddress: values });
        } else {
            cashMutate({ cartId, shippingAddress: values });
        }
    };

    const formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },
        validationSchema: Yup.object({
            details: Yup.string().required('Details are required'),
            phone: Yup.string().required('Phone number is required'),
            city: Yup.string().required('City is required'),
        }),
        onSubmit: handleSubmit,
    });

    return (
        <div>
            <Button variant='contained' color='success' onClick={() => handleOpen('online')}>
                Pay online
            </Button>
            <Button variant='contained' sx={{ ml: 3 }} color='success' onClick={() => handleOpen('cash')}>
                Pay cash
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
                            <input
                                name="details"
                                value={formik.values.details}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                id="details"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                placeholder="Details"
                            />
                            {formik.touched.details && formik.errors.details ? (
                                <div className="text-red-600">{formik.errors.details}</div>
                            ) : null}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
                            <input
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                id="city"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                            />
                            {formik.touched.city && formik.errors.city ? (
                                <div className="text-red-600">{formik.errors.city}</div>
                            ) : null}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                            <input
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="tel"
                                id="phone"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <div className="text-red-600">{formik.errors.phone}</div>
                            ) : null}
                        </div>
                        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Submit
                        </button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
