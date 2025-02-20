import Header from '@/components/Header';
import { useState } from 'react';
import TrafficCategory from '../components/TrafficCategory';
import SelectModal from '../components/SelectModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import Form from "react-bootstrap/Form";
import { ko } from 'date-fns/esm/locale';

function TrafficTrainPage() {
  const [selectCategory, setSelectCategory] = useState('편도');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [departure, setDeparture] = useState('서울');
  const [arrival, setArrival] = useState('선택');
  const [click, setClick] = useState('출발');

  const [startDate, setStartDate] = useState(null); // 가는 날 상태
  const [endDate, setEndDate] = useState(null); //오는 날 상태

  console.log(startDate, endDate);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const clickDeparture = () => {
    setClick('출발');
  };

  const clickArrival = () => {
    setClick('도착');
  };

  const departureCategory = [
    '서울',
    '용산',
    '부산',
    '대전',
    '동대구',
    '광주송정',
    '신경주',
    '여수EXPO',
    '강릉',
  ];
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeparture = () => {
    setDeparture(event.target.innerText);
  };

  const handleArrival = () => {
    setArrival(event.target.innerText);
  };

  const category = ['편도', '왕복'];
  return (
    <>
      <Header
        search='search'
        back='back'
        cart='cart'
        className='ml-10 text-xl font-semibold'
        title='기차'
      />
      <section className='px-5'>
        <h2 className='sr-only'>기차 예매 페이지</h2>
        <div className='flex items-start gap-1 rounded-[4px] border border-[#f1b77f] bg-[#fef8f2] p-4'>
          <img src='/leisure-infoOrange.png' alt='안내' className='' />
          <span className='text-[14px] leading-[16px]'>
            [안내] 철도 노조 파업 예고에 따라 9/14(목)~9/18(월) 기차 일부 노선의 중지가 예상됩니다.
            야놀자 공지를 확인해주세요.
          </span>
        </div>
        <div className='mt-4 rounded-[4px] border border-[#e6e6e6] '>
          <TrafficCategory
            className='justify-center pb-3 max-[340px]:text-sm max-[340px]:leading-6 '
            category={category}
            selectCategory={selectCategory}
            setSelectCategory={setSelectCategory}
          />

          <div className='flex justify-around'>
            <div className='inline-flex flex-col items-center justify-center gap-1'>
              <span className='text-[12px] text-[#919191]'>출발역</span>
              <button
                type='button'
                className='text-[30px] font-bold'
                onClick={() => {
                  openModal();
                  clickDeparture();
                }}
              >
                {departure}
              </button>
            </div>
            <div className='inline-flex flex-col items-center justify-center gap-1'>
              <span className='text-[12px] text-[#919191]'>도착역</span>
              <button
                type='button'
                className='text-[30px] font-bold'
                onClick={() => {
                  openModal();
                  clickArrival();
                }}
              >
                {arrival}
              </button>
            </div>
          </div>
          <div className='mx-5 my-5 h-[2px] bg-[#e6e6e6]'></div>
          <div className='my-3 flex flex-col px-5 text-[#919191]'>
            {selectCategory === '편도' && <span className='text-[10px]'>가는날</span>}
            {selectCategory === '왕복' && <span className='text-[10px]'>가는날 - 오는날</span>}
            <span className='text-[16px]'>날짜를 선택해주세요.</span>
            <span className='text-[12px]'>(탑승일 기준 1일 전 예약은 00:00~02:00 가능)</span>
          </div>
          <div className='mx-5 my-3 h-[2px] bg-[#e6e6e6]'></div>
          <div className='my-3 flex flex-col px-5'>
            <span className='text-[10px] text-[#919191]'>인원</span>
            <span>성인 1명</span>
          </div>
          <button type='button' className='w-[100%] bg-[#cccccc] py-3 font-bold text-white'>
            승차권 조회
          </button>
        </div>
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
            isModalOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div
            className='h-full w-full transform bg-white p-4 transition-transform duration-300 ease-in-out'
            style={{ translateY: isModalOpen ? 0 : '100%' }}
          >
            <button type='button' onClick={closeModal}>
              <img src='/close.svg' alt='닫기' className='w-6' />
            </button>

            <h3 className='mb-5 mt-[-36px] text-center text-[18px] font-bold'>출발역 선택</h3>
            <div>
              <span className='text-[18px] font-bold'>주요역</span>

              <div className='flex flex-wrap justify-around gap-3 text-[14px]'>
                {click === '출발' && (
                  <SelectModal
                    category={departureCategory}
                    title={'출발역 선택'}
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    handleFunction={handleDeparture}
                  />
                )}
                {click === '도착' && (
                  <SelectModal
                    category={departureCategory}
                    title={'도착역 선택'}
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    handleFunction={handleArrival}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <DatePicker
            locale={ko} // 한글로 변경
            selected={startDate}
            onChange={onChange}
            minDate={new Date()}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            monthsShown={2}
            dateFormat='yyyy.MM.dd (eee)' // 시간 포맷 변경
            showPopperArrow={false}
            showDisabledMonthNavigation
          />
        </div>
      </section>
    </>
  );
}

export default TrafficTrainPage;
