import ImageCarousel from '../components/ImageCarousel'; // 컴포넌트 경로를 확인하고 맞게 수정해주세요.

// 1. 스토리에 사용할 가짜(mock) 이미지 데이터 배열을 만듭니다.
const mockImages = [
  'https://via.placeholder.com/400x300.png/0000FF/FFFFFF?text=Image+1',
  'https://via.placeholder.com/400x300.png/FF0000/FFFFFF?text=Image+2',
  'https://via.placeholder.com/400x300.png/00FF00/000000?text=Image+3',
  'https://via.placeholder.com/400x300.png/FFFF00/000000?text=Image+4',
  'https://via.placeholder.com/400x300.png/FF00FF/FFFFFF?text=Image+5',
];

export default {
  title: 'UI/ImageCarousel', // 사이드바에 표시될 이름
  component: ImageCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // 이 컴포넌트가 받는 props에 대한 설명을 추가하면 Storybook 문서가 더 풍부해집니다.
  argTypes: {
    images: {
      control: 'object', // Storybook UI에서 배열/객체를 수정할 수 있게 함
      description: '캐러셀에 표시될 이미지 URL 문자열의 배열',
    },
    className: {
      control: 'text',
      description: '캐러셀 컨테이너에 적용할 추가 Tailwind 클래스',
    }
  },
};

// 2. 기본 스토리를 작성하고, args에 mockImages를 전달합니다.
export const Default = {
  args: {
    images: mockImages,
    // Storybook 캔버스에서 적절한 크기로 보이도록 너비와 높이를 지정해줍니다.
    className: 'w-[600px] h-72',
  },
};

// 3. 다른 상태를 테스트하고 싶다면 새로운 스토리를 만듭니다.
export const WithThreeImages = {
  args: {
    images: mockImages.slice(0, 3), // 이미지가 3개만 있는 경우
    className: 'w-[400px] h-64',
  },
};

export const NoImages = {
    args: {
      images: [], // 이미지가 없는 경우도 테스트
      className: 'w-[400px] h-64',
    },
  };