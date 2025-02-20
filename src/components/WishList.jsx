import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

function WishList({ link, heart, hotel, leisure, cart }) {
  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
        className='mt-20 flex flex-col items-center gap-2 font-semibold'
      >
        <figure>
          {heart && <img src='/heartActive.svg' alt='하트' className='w-14' />}
          {cart && <img src='/cart.svg' alt='장바구니' className='w-14' />}
        </figure>
        {hotel && <p> 찜한 숙소가 없습니다.</p>}
        {leisure && <p> 찜한 레저가 없습니다.</p>}
        {cart && (
          <>
            <p>장바구니에 담긴 상품이 없습니다</p>
            <p>원하는 상품을 담아보세요</p>
          </>
        )}
        <Link
          to={`/${link}`}
          className='my-2 rounded border px-20 py-2  text-center text-gray2 hover:text-primary'
        >
          {hotel && <Button type='Button'>숙소 보러가기</Button>}
          {leisure && <Button type='Button'>레저 보러가기</Button>}
          {cart && <Button type='Button'>홈으러 가기</Button>}
        </Link>
      </motion.section>
    </AnimatePresence>
  );
}
export default WishList;
WishList.propTypes = {
  link: string,
  heart: string,
  hotel: string,
  leisure: string,
  cart: string,
};
