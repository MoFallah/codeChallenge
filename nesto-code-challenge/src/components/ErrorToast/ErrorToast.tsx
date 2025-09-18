import { useEffect, type FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import type { RootState } from '../../app/store';
import { clearError } from '../../app/store/slices/uiStateSlice';
import CustomToast from '../CustomToast/CustomToast';

const ErrorToast: FC = () => {
  const dispatch = useDispatch();
  const { error, toastId } = useSelector((state: RootState) => state.uiState || {});
  useEffect(() => {
    if (error && toastId) {
      toast.error(
        <CustomToast error={error} />,
        {
          toastId,
          onClose: () => { dispatch(clearError()); },
          style: { width: "25rem" }
        }
      );
    }
  }, [error, toastId, dispatch]);

  return null;
};

export default ErrorToast;
