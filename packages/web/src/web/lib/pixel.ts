declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const pixelViewContent = (id: string, name: string, value = 0) => {
  window.fbq?.('track', 'ViewContent', {
    content_ids: [id], content_name: name,
    content_type: 'product', currency: 'INR', value,
  });
};

export const pixelAddToCart = (id: string, name: string, value = 0) => {
  window.fbq?.('track', 'AddToCart', {
    content_ids: [id], content_name: name,
    content_type: 'product', currency: 'INR', value,
  });
};

export const pixelInitiateCheckout = (value = 0) => {
  window.fbq?.('track', 'InitiateCheckout', { currency: 'INR', value });
};

export const pixelPurchase = (orderId: string, value = 0) => {
  window.fbq?.('track', 'Purchase', {
    content_type: 'product', currency: 'INR', value, order_id: orderId,
  });
};

export const pixelCompleteRegistration = () => {
  window.fbq?.('track', 'CompleteRegistration');
};
