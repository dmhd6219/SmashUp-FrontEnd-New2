import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.tsx';
import { Button } from '@/components/ui/button.tsx';
import PlayHollowIcon from '@/components/icons/PlayHollowIcon.tsx';
import EditIcon from '@/components/icons/Edit.tsx';
import { Label } from '@/components/ui/label.tsx';
import TrackSmallThumb from '@/router/shared/track/TrackSmallThumb.tsx';
import { Track, useTrackStore } from '@/store/entities/track.ts';
import { axiosSession, cn } from '@/lib/utils.ts';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import CopiedToast from '@/router/features/toasts/copied.tsx';
import LinkIcon from '@/components/icons/Link.tsx';
import { UnpublishedMashup, useModerationStore } from '@/store/moderation.ts';
import { useEffect, useState } from 'react';
import {
    SelectedTrack,
    SmashUpSelectedTrack,
    TrackType,
    YandexMusicSelectedTrack,
    YouTubeSelectedTrack
} from '@/types/api/upload';
import { RegEx } from '@/lib/regex';
import { loadOEmbed } from '@/lib/youtube';
import { isExplicit, isTwitchBanned } from '@/lib/bitmask';
import { useToast } from '@/router/shared/hooks/use-toast';
import ImageWithAuth from '@/router/shared/image/imageWithAuth';
import { Link } from 'react-router-dom';

interface UnpublishedMashupAccordionItem {
    value: string;
    accordionValue?: string;
    mashup: UnpublishedMashup;
}

export function UnpublishedMashupAccordionItem({
    mashup,
    accordionValue,
    value
}: UnpublishedMashupAccordionItem) {
    const { toast } = useToast();
    const moderationMashups = useModerationStore((state) => state.unpublishedMashups);
    const updateModerationMashups = useModerationStore((state) => state.updateUnpublishedMashups);

    const [loading, setLoading] = useState<boolean>(false);
    const [tracks, setTracks] = useState<SelectedTrack[]>();

    const trackStore = useTrackStore();

    useEffect(() => {
        if (!loading && accordionValue === value) {
            setLoading(true);

            Promise.all([
                trackStore
                    .getManyByIds(mashup.tracks)
                    .then((tracks) => tracks.map((track) => new SmashUpSelectedTrack(track))),
                Promise.all(
                    mashup.tracksUrls.map(async (url) => {
                        if (RegEx.YOUTUBE.test(url)) {
                            return loadOEmbed(url).then((track) => new YouTubeSelectedTrack(track));
                        } else {
                            throw new Error(`${url} is not supported`);
                        }
                    })
                )
            ]).then((result) => {
                const [smashUpTracks, foreignTracks] = result;

                setTracks((smashUpTracks as SelectedTrack[]).concat(foreignTracks));
            });
        }
    }, [accordionValue]);

    const statusUrl = mashup.statusesUrls ? mashup.statusesUrls[0] : undefined;

    const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/moderation/mashup/${mashup.id}_800x800.png`;

    const [image, setImage] = useState<string>();
    const [imageFailed, setImageFailed] = useState<boolean>(false);

    if (!moderationMashups) return null;

    return (
        <AccordionItem value={value}>
            <AccordionTrigger>
                <div className='w-full flex items-center justify-between py-[6px] pl-[6px]'>
                    <div className='flex items-center gap-x-4'>
                        <ImageWithAuth
                            src={imageUrl}
                            alt={mashup.name}
                            className='w-12 h-12 rounded-[10px]'
                            image={image}
                            setImage={setImage}
                            failed={imageFailed}
                            setFailed={setImageFailed}
                        />
                        <div className='flex flex-col items-start'>
                            <span className='font-bold text-onSurface'>{mashup.name}</span>
                            <span className='font-medium text-onSurfaceVariant'>
                                {mashup.authors?.join(', ')}
                            </span>
                        </div>
                    </div>

                    <div className='flex items-center gap-x-7'>
                        <div className='flex items-center gap-x-3'>
                            <Button
                                variant='ghost'
                                size='icon'
                                className=''
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <PlayHollowIcon color='primary' size={36} />
                            </Button>

                            <Button
                                className='py-[7px] font-bold text-base rounded-xl'
                                onClick={(e) => {
                                    e.preventDefault();
                                    axiosSession
                                        .post(
                                            `/moderation/unpublished_mashup/publish?id=${mashup.id}`
                                        )
                                        .then(() => {
                                            updateModerationMashups([
                                                ...moderationMashups.filter(
                                                    (um) => um.id !== mashup.id
                                                )
                                            ]);
                                        });
                                }}
                            >
                                Принять
                            </Button>

                            <Button
                                className='py-[7px] font-bold text-base rounded-xl bg-onPrimary text-onSurface hover:bg-onPrimary/90 hover:text-onSurface/90'
                                onClick={(e) => {
                                    e.preventDefault();
                                    axiosSession
                                        .post(`/moderation/unpublished_mashup/reject`, {
                                            id: mashup.id,
                                            // TODO: причина дропдауном
                                            reason: 'не понравился'
                                        })
                                        .then(() => {
                                            updateModerationMashups([
                                                ...moderationMashups.filter(
                                                    (um) => um.id !== mashup.id
                                                )
                                            ]);
                                        });
                                }}
                            >
                                Отклонить
                            </Button>
                        </div>

                        <Button className='mr-7' variant='ghost' size='icon'>
                            <Link to={`/mashup/moderation/${mashup.id}`}>
                                <EditIcon />
                            </Link>
                        </Button>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent className='mt-4 flex gap-x-6'>
                <ImageWithAuth
                    src={imageUrl}
                    alt={mashup.name}
                    className='w-[216px] h-[216px] rounded-[30px]'
                    image={image}
                    setImage={setImage}
                    failed={imageFailed}
                    setFailed={setImageFailed}
                />

                <div className='w-full grid grid-cols-4 gap-x-6'>
                    {/*название, авторы*/}
                    <div className='flex flex-col gap-y-7'>
                        <div className='w-full flex flex-col gap-y-2.5'>
                            <Label className='font-medium text-onSurfaceVariant'>
                                Название мэшапа
                            </Label>
                            <span className='font-bold text-[24px]'>{mashup.name}</span>
                        </div>

                        <div className='w-full flex flex-col gap-y-2.5'>
                            <Label className='font-medium text-onSurfaceVariant'>Авторы</Label>
                            <span className='font-bold text-[24px]'>
                                {mashup.authors?.join(', ')}
                            </span>
                        </div>
                    </div>

                    {/*Исходники*/}
                    <div className='w-full'>
                        <Label className='font-medium text-onSurfaceVariant'>Исходники</Label>
                        <div className='w-full max-h-[180px] overflow-y-scroll'>
                            {tracks &&
                                tracks.map((selectedTrack) => {
                                    const type = selectedTrack.keyType;

                                    let track: Track;
                                    if (type === TrackType.SmashUp) {
                                        track = (selectedTrack as SmashUpSelectedTrack).track;
                                    } else if (type === TrackType.YouTube) {
                                        track = (selectedTrack as YouTubeSelectedTrack)
                                            .track as unknown as Track;
                                    } else if (type === TrackType.YandexMusic) {
                                        track = (selectedTrack as YandexMusicSelectedTrack)
                                            .track as unknown as Track;
                                    } else {
                                        throw new Error(`${type} not supported`);
                                    }

                                    return <TrackSmallThumb key={track.id} track={track} />;
                                })}
                        </div>
                    </div>

                    {/*Жанры*/}
                    <div className='w-full'>
                        <Label className='font-medium text-onSurfaceVariant'>Жанры</Label>
                        <div className='w-full max-h-[180px] overflow-y-scroll flex flex-col gap-y-3'>
                            {mashup.genres &&
                                mashup.genres.map((genre) => (
                                    <div
                                        key={genre}
                                        className={cn(
                                            'w-full py-[14.5px] bg-surfaceVariant flex justify-center items-center rounded-2xl',
                                            'font-bold text-[18px] text-onBackground'
                                        )}
                                    >
                                        {genre}
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/*дополнительно*/}
                    <div className='w-full flex flex-col gap-y-[5px]'>
                        <Label className='font-medium text-onSurfaceVariant'>Дополнительно</Label>
                        <div className='w-full flex flex-col gap-y-3'>
                            <div className='flex items-center gap-x-4 py-[11px] px-5 bg-surfaceVariant rounded-2xl'>
                                <Checkbox checked={isExplicit(mashup.statuses)} />
                                <Label className='font-bold text-[18px] text-onSurface'>
                                    Explicit (Мат)
                                </Label>
                            </div>

                            <div className='flex items-center gap-x-4 py-[11px] px-5 bg-surfaceVariant rounded-2xl'>
                                <Checkbox checked={isTwitchBanned(mashup.statuses)} />
                                <Label className='font-bold text-[18px] text-onSurface'>
                                    Бан-ворды Twitch
                                </Label>
                            </div>

                            <Button
                                variant='ghost'
                                size='icon'
                                className='cursor-pointer'
                                onClick={() => {
                                    if (statusUrl) {
                                        navigator.clipboard.writeText(statusUrl).then(() => {
                                            toast({
                                                element: (
                                                    <CopiedToast
                                                        img={imageUrl}
                                                        name={mashup.name}
                                                    />
                                                ),
                                                duration: 2000
                                            });
                                        });
                                    }
                                }}
                            >
                                <div className='w-full bg-surfaceVariant text-onSurfaceVariant rounded-2xl px-5 py-[11px] flex items-center gap-x-4'>
                                    <LinkIcon />
                                    <span className='font-medium text-onSurfaceVariant'>
                                        {statusUrl || 'Ссылка на основу / альт'}
                                    </span>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
