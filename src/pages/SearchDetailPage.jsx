import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { usePocketData } from '@/api/usePocketData';
import { useQuery } from '@tanstack/react-query';
import { numberWithComma } from '@/utils/numberWithComma';
import { useState } from 'react';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { Link } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import Header from '@/components/Header'
import Button from '@/components/Button';

function LocationDetailPage() {
  const { category } = useParams(); // category 파라미터를 가져옵니다.
  const [selectCategory, setSelectCategory]= useState(category);

  const { getListData:getLeisureData } = usePocketData('leisure');
  const { data: leisureData,
    isLoading,
    isError ,
  } = useQuery(['leisure'], () => getLeisureData());

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>서버 에러 발생</div>;
  }
  let leisureCategoryData = leisureData.filter((leisure) => leisure.category === selectCategory);
    
 
  


  return (
    <>
    <Helmet>
      <title>지역-리스트</title>
    </Helmet>
    <Header back='back' search='search' title='' />
    <section>
      <h2 className='fixed bg-white rounded-b-3xl w-full font-bold text-[1.4rem] max-w-3xl z-10 md:text-[1.7rem] px-[2.5rem] pb-2 '>
        <img src='/locationActive.svg' alt='위치' className='inline-block h-6 md:h-7 mb-0.5 mr-[0.1rem] '/>
        { category === '도심힐링' ? '서울' : category }
      </h2>
      <div className='pt-[3.1rem] pb-[5rem]'>
      {leisureCategoryData?.map((item) => (
        <article key={item.id} className='h-[30rem] lg:h-[33rem] py-1.2   shadow-md  bg-white '>
          <figure className='w-[100%] h-[57%] lg:h-[65%]  overflow-hidden mr-4 '>
            <img
              src={getPbImageURL(item, 'main')}
              alt={item.title}
              className=' h-[120%] w-[110%]  cover object-cover' />
            <figcaption className='sr-only'>{item.title} </figcaption>
          </figure>
          {/* 호텔명, 별점, 가격 설명박스 */}
          <div className='px-6 pt-3  '>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <div className=' flex justify-between py-2  '>
              <span className='block '>
              {item.label.map((label) => (
                    <span
                      key={label}
                      className='mr-1 mt-1 rounded-[2px] border-[1px] border-[#e6e6e6] bg-[#f2f2f2] px-1 py-[2px] text-[11px]'
                    >
                      {label}
                    </span>
                  ))}
              </span>
                <span className='block text-[1.2rem] font-extrabold '>{numberWithComma(item.price)}원</span>
            </div>
            <Link to={`/LeisureDetail/${item.id}`}>
              <Button type='button' className='ml-auto mr-0 mb-2 mt-auto flex rounded-full  bg-primary text-white font-medium  text-[1rem] shadow-md py-2 px-6 gap-2 '
              > {'상품 선택하기'}
              </Button>
            </Link>
          </div>
        </article>
        ))}
      </div>
    </section>
    </>
  )
}

export default LocationDetailPage