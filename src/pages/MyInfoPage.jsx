import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Button from '@/components/Button';
import Input from '@/components/Input';
import MyCircleProfile from '@/components/MyCircleProfile';

function MyInfoPage() {
  return (
    <>
      <Helmet>
        <title>야무지개놀자</title>
      </Helmet>
      <Header search='search' back='back' cart='cart' title='마이 페이지'>
        메인페이지
      </Header>
      {/* 마이페이로 돌아갈 수 있는 버튼 기능의 이미지 */}
      <section className='md:absolute md:left-1/2 md:top-1/2 md:mb-8 md:-translate-x-1/2 md:-translate-y-1/2 md:transform'>
        <Link to='/mypage'>
          <MyCircleProfile></MyCircleProfile>
        </Link>
        <div className='mb-32 flex w-full flex-col items-center justify-center text-center'>
          <div className='relative h-11 w-60 rounded-full border-[1px] border-secondary bg-lightPurple text-center align-middle text-xs font-semibold text-secondary shadow-md md:mb-8 md:h-[7vh] md:w-[30vh] md:py-5'>
            <p className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap'>
              정보 변경을 위해 로그인 시 사용하시는 <br />
              비밀번호를 입력해주세요.
            </p>
          </div>
          <Input
            type='text'
            id='password'
            placeholder='비밀번호'
            className='mt-10 h-11 w-72 border-b-[1px] border-neutral-200 sm:w-80'
            label='비밀번호'
            labelClass='sr-only'
          ></Input>
          <Button
            type='submit'
            className='mt-10 h-11 w-72 rounded-xl border-[1px] border-secondary text-secondary sm:w-80 md:h-14'
          >
            정보 변경
          </Button>
        </div>
      </section>
    </>
  );
}
export default MyInfoPage;
