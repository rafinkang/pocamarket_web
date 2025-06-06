import ImageCarousel from './ImageCarousel';

export default {
  title: 'carousel/ImageCarousel',
  component: ImageCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    images: ["https://picsum.photos/seed/picsum1/600/400", "https://picsum.photos/seed/picsum2/600/400", "https://picsum.photos/seed/picsum3/600/400", "https://picsum.photos/seed/picsum4/600/400", "https://picsum.photos/seed/picsum5/600/400"], 
    className: "",
  },
};
