import { numberWithComma } from '@/utils/numberWithComma';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { Link } from 'react-router-dom';
import Button from './Button';

function HotelRoom({ data }) {
  return (
    <section className='flex flex-col items-center px-4 pb-20'>
      <h3 className='sr-only'>객실 정보</h3>
      {data.map((item) => (
        <div key={item.id} className='py-5 font-bold'>
          <img src={getPbImageURL(item, 'img')} alt={item.title} className='max-h-80' />
          <p className='py-2 text-lg' key={item.id}>
            {item.title}
          </p>
          <span className='rounded bg-slate-100 px-2 py-1 font-semibold text-gray2'>
            {item.info}
          </span>
          <div className='flex justify-between py-2 mt-1'>
            <span>숙박(15:00~)</span>
            <p className='text-lg text-primary'>{numberWithComma(item.price)}원</p>
          </div>
          <div className='flex justify-end'>
            <Link>
              <Button className='mt-5 h-8 w-52 rounded bg-primary text-white max-[420px]:w-32'>
                객실 예약하기
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
export default HotelRoom;
