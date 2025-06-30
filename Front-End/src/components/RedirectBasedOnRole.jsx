import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function RedirectBasedOnRole() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.vaiTro?.toLowerCase() === 'admin') {
      navigate('/admin', { replace: true });
    } else if (user?.vaiTro?.toLowerCase() === 'nguoidung') {
      navigate('/user/home', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate, user]);

  return null; // Không render gì, chỉ redirect
}
