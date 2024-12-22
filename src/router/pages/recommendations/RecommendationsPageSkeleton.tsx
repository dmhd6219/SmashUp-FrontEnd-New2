import { Skeleton } from '@/components/ui/skeleton.tsx';
import MashupSmallThumbSkeleton from '@/router/shared/mashup/MashupSmallThumbSkeleton.tsx';

export default function RecommendationsPageSkeleton() {
    return (
        <div className='flex flex-col gap-y-6'>
            <Skeleton className='w-full h-[252px] rounded-[50px]' />

            <div className='flex flex-col gap-y-1'>
                {Array.from({ length: 10 }).map((_, idx) => (
                    <MashupSmallThumbSkeleton key={idx} />
                ))}
            </div>
        </div>
    );
}
