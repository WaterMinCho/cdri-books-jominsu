const formatPrice = (price: number) => {
  return `${price.toLocaleString('ko-KR')}원`;
};

export default formatPrice;
