import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReviewCard from './ReviewCard';


function ReviewPage() {

    const{reviewData} = useSelector((state) => state.review);
    const [latestReview, setLatestReview] = useState(null);

    useEffect(() => {
        setLatestReview(reviewData?.slice(0, 6));
    }, [reviewData])

  return (
    <div className='flex items-center justify-center flex-col'>
        <h1 className='md:text-[45px] text-[30px] font-semibold items-center mt-[30px] px-[20px]'>Real Reviews for Our Courses</h1>
        <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px] '>
        Hear directly from our students about their transformative learning experiences, career growth, and the impact of our courses on their professional journeys. Read authentic reviews and success stories that highlight the value and effectiveness of our educational offerings.
        </span>
        <div className='w-[100%] min-[100vh] flex items-center justify-center flex-wrap gap-[50px] md:p-[30px] p-[10px] mb-[40px]'>
            { latestReview?.map((review, index) => (
                <ReviewCard key={index} comment={review.comment} rating={review.rating} photoUrl={review.user?.photoUrl} courseTitle={review.course?.title} description={review.user?.description} name={review.user?.name}/>
            ))}
        </div>
    </div>
  )
}


export default ReviewPage