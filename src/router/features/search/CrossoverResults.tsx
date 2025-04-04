import { useCrossover } from '@/router/features/search/useCrossover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import Section from '@/router/shared/components/section/Section.tsx';
import MashupThumb from '@/router/shared/components/mashup/MashupThumb.tsx';
import { useSearchStore } from '@/store/search.ts';
import SearchResultsSkeleton from '@/router/features/search/SearchResultsSkeleton.tsx';

export default function CrossoverResults() {
    const updateType = useSearchStore((state) => state.updateType);
    const crossoverArtists = useSearchStore((state) => state.crossoverArtists);
    const crossoverTracks = useSearchStore((state) => state.crossoverTracks);

    const { mashups, isLoading } = useCrossover(crossoverTracks, crossoverArtists);

    if (isLoading) return <SearchResultsSkeleton />;

    return (
        <div className='flex-1'>
            <div className='flex items-center justify-between'>
                <Button size='sm' variant='ghost' className='bg-primary text-surfaceVariant'>
                    Мэшапы
                </Button>

                <div className='flex items-center justify-between'>
                    <div className='flex bg-surfaceVariant rounded-xl'>
                        <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => updateType('search')}
                            className={cn('bg-surfaceVariant text-onSurfaceVariant')}
                        >
                            Поиск
                        </Button>
                        <Button
                            size='sm'
                            variant='ghost'
                            className={cn('bg-primary text-surfaceVariant')}
                        >
                            Кроссовер
                        </Button>
                    </div>
                </div>
            </div>

            <Section title='Мэшапы' className='mt-2'>
                <div className='flex items-center '>
                    <div className='flex flex-wrap items-center'>
                        {mashups.map((mashup, idx) => (
                            <MashupThumb
                                mashup={mashup}
                                searchMode
                                key={mashup.id}
                                playlist={mashups.map((mashup) => mashup.id)}
                                playlistName='Поиск с кроссовером'
                                queueId={`search/crossover?${crossoverTracks.length > 0 ? `tracks=${crossoverTracks.map((track) => track.id).join(',')}` : ''}${crossoverArtists.length > 0 ? `${crossoverTracks.length > 0 ? '&' : ''}track_authors=${crossoverArtists.map((author) => author.id).join(',')}` : ''}`}
                                indexInPlaylist={idx}
                            />
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
}
