import { Link } from 'react-router-dom';
import Button from '@/components/Button';

function Guest() {
  return (
    <>
      <section className='tranform absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 '>
        <article className='flex flex-col items-center justify-center'>
          <div className=' relative mb-2 h-[30vh] w-[50vh] items-center whitespace-nowrap rounded-full border-[1px] border-red-700 bg-lightPurple text-center align-middle text-[1rem] text-xs font-semibold text-primary shadow-md md:text-lg'>
            <p className='tranform absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
              <span className='underline'>로그인된 사용자</span>만
              <br />
              이용 가능한 페이지입니다. <br />
              <div className='items-center'>
                <p className='text-base font-black'>즐거운 여행의 시작</p>
                <img src='/logo.svg' alt='' className='mx-auto my-0 drop-shadow-xl' />
              </div>
            </p>
          </div>
          <div className='flex gap-x-2'>
            <Link to='/signin' tabindex='-1'>
              <Button
                type='submit'
                className='mt-10 h-[8vh] w-[23vh] rounded-xl border-[1px] border-secondary text-xs text-secondary hover:bg-primary hover:text-white sm:w-[25vh] md:text-lg'
              >
                로그인하러 가기
              </Button>
            </Link>
            <Link to='/signup' tabindex='-1'>
              <Button
                type='submit'
                className='mt-10 h-[8vh] w-[23vh] rounded-xl border-[1px] border-secondary text-xs text-secondary hover:bg-primary hover:text-white sm:w-[25vh] md:text-lg'
              >
                회원가입하러 가기
              </Button>
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
export default Guest;
