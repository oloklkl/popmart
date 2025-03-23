// ✅ cartDataLoader.js — localStorage + fallback 데이터를 통한 장바구니 자동 렌더링

export const loadCartData = () => {
  // 1. localStorage 확인
  const localData = localStorage.getItem('cartItems');
  if (localData) {
    try {
      return JSON.parse(localData);
    } catch (e) {
      console.error('❌ JSON 파싱 오류', e);
    }
  }

  // 2. fallback 가상 데이터 (초기 테스트용)
  return [
    {
      id: '1',
      name: '피노젤리 탄생석 시리즈',
      price: 15000,
      image: 'https://github.com/hyeonky/dp-static/blob/main/popmart/thumbnail/thumbnail8.png?raw=true',
      quantity: 1,
    },
    {
      id: '2',
      name: '지거 경계선 위의 우리 시리즈',
      price: 15000,
      image: 'https://github.com/hyeonky/dp-static/blob/main/popmart/thumbnail/thumbnail15.png?raw=true',
      quantity: 2,
    },
    {
      id: '3',
      name: '바비 스타일 아이콘 시리즈',
      price: 15000,
      image: 'https://github.com/hyeonky/dp-static/blob/main/popmart/thumbnail/thumbnail14.png?raw=true',
      quantity: 1,
    },
  ];
};
