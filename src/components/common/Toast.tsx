import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

type ToastData = {
  id: string;
  message: string;
};

const DURATION = 3000;

let toasts: ToastData[] = [];
let syncToasts: ((next: ToastData[]) => void) | null = null;

export const addToast = (message: string) => {
  const id = Math.random().toString(36).slice(2, 9);
  toasts = [...toasts, { id, message }];
  syncToasts?.(toasts);
};

type ToastItemProps = ToastData & {
  onClose: (id: string) => void;
};

const ToastItem = ({ id, message, onClose }: ToastItemProps) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClosing(true);
      setTimeout(() => onClose(id), 300);
    }, DURATION - 300);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return <Item $closing={closing}>{message}</Item>;
};

const ToastContainer = () => {
  const [list, setList] = useState<ToastData[]>([]);

  useEffect(() => {
    syncToasts = setList;
    return () => {
      syncToasts = null;
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    toasts = toasts.filter((toast) => toast.id !== id);
    setList(toasts);
  }, []);

  return createPortal(
    <Container>
      {list.map((toast) => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          message={toast.message}
          onClose={removeToast}
        />
      ))}
    </Container>,
    document.body,
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 100;
`;

const Item = styled.div<{ $closing: boolean }>`
  padding: 12px 20px;
  border-radius: 8px;
  background: rgba(34, 34, 34, 0.9);
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  white-space: nowrap;
  opacity: ${({ $closing }) => ($closing ? 0 : 1)};
  transition: opacity 0.3s;
`;

export default ToastContainer;
