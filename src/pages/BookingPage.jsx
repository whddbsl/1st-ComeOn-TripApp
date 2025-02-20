import { usePocketData } from '@/api/usePocketData';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { numberWithComma } from '@/utils/numberWithComma';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { toast, Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import useStorage from '@/Hook/useStorage';

function BookingPage() {
  const { id, title } = useParams();
  const { getIdData } = usePocketData('room');
  const { data: roomData, isLoading } = useQuery(['room', id], () => getIdData(id));

  const { updateData: updateUser } = usePocketData('users');
  const { storageData: authUser } = useStorage('pocketbase_auth');

  const navigate = useNavigate();

  const handlePayment = () => {
    const userId = authUser?.model?.id;
    toast((t) => (
      <div className='flex-col items-center gap-5'>
        <span className='text-lg'>결제 하시겠습니까?</span>
        <div className='flex gap-10 pt-2'>
          <button
            className='rounded-lg bg-primary px-4 py-2 text-white'
            onClick={() => {
              toast.dismiss(t.id);
              updateUser(userId, {
                'bookedRoom+': id,
              });
              toast.success('결제가 완료되었습니다.');
              setTimeout(() => {
                toast.dismiss();
                navigate('/');
              }, 1000);
            }}
          >
            예
          </button>
          <Button
            className='rounded-lg bg-accent px-1 py-2 text-white'
            onClick={() => toast.dismiss(t.id)}
          >
            아니오
          </Button>
        </div>
      </div>
    ));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>예약</title>
      </Helmet>
      <Header back='back' className='mr-7 text-xl font-semibold' title='예약' />
      <section className='px-4 pb-20'>
        <h2 className='mx-auto flex max-w-[39rem] justify-center border-b border-gray px-4 pt-2 text-xl font-bold'>
          {title}
        </h2>
        <article key={roomData.id} className='flex justify-center pt-3'>
          <div>
            <figure>
              <img src={getPbImageURL(roomData, 'img')} alt={roomData.title} className='max-h-96' />
              <figcaption className='sr-only'>{roomData.title}</figcaption>
            </figure>
            <h3 className=' pb-4 pt-1 text-xl font-bold'>{roomData.title}</h3>
            <p className='mb-5 rounded bg-slate-100 px-2 py-1 font-semibold text-gray2'>
              {roomData.info}
            </p>
            <div className='flex justify-between border-b border-gray pb-2 font-semibold'>
              <div>
                <p>체크인</p>
                <p>2023.09.28(목)</p>
                <p>15:00</p>
              </div>
              <div>
                <p>체크아웃</p>
                <p>2023.09.30(토)</p>
                <p>11:00</p>
              </div>
            </div>
            <div className='flex justify-between py-8 text-xl font-bold'>
              <p>총 결제 금액</p>
              <p className='text-accent'>{numberWithComma(roomData.price)}원</p>
            </div>
            <Button
              type='submit'
              className='h-10 w-full rounded-md border text-primary hover:bg-primary hover:text-white'
              onClick={handlePayment}
            >
              결제하기
            </Button>
          </div>
        </article>

        <Toaster
          toastOptions={{
            duration: 1500, 
            success: {
              style: {
                background: '#5D6FFF',
                color: 'white',
              },
            },
          }}
          containerStyle={{
            top: 420,
          }}
        />
      </section>
    </>
  );
}
export default BookingPage;
