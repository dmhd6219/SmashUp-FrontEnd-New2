import { axiosSession } from '@/lib/utils.ts';
import { useNavigate } from 'react-router-dom';
import MashupForm, { MashupFormBody } from '@/router/shared/mashup/MashupForm';
import { AxiosResponse } from 'axios';
import { UploadMashupResponse } from '@/types/api/upload';
import { axiosCatcher } from '@/router/shared/general/axios';
import { useToast } from '@/router/shared/hooks/use-toast';

export default function UploadMashupPage() {
    const navigate = useNavigate();
    const { toast } = useToast();

    return (
        <MashupForm
            initial={{
                name: '',
                explicit: false,
                banWords: false,
                selectedGenres: [],
                selectedTracks: [],
                selectedUsers: [],
                statusLink: '',
                agree: false
            }}
            text={{
                title: 'Загрузка мэшапа',
                button: 'Опубликовать'
            }}
            handleLoggedUser={true}
            handleTracksUrls={true}
            handleMashupFile={true}
            requireImageFile={true}
            showTracksIcons={false}
            lockStatusLink={false}
            onClick={(body: MashupFormBody) => {
                console.log('authors', body.authors);
                axiosSession
                    .post('/mashup/upload', {
                        ...body,
                        albumId: -1
                    })
                    .then((r: AxiosResponse<UploadMashupResponse>) =>
                        navigate(
                            `/mashup/upload/success/${r.data.response !== undefined ? r.data.response.id : '0'}`
                        )
                    )
                    .catch(axiosCatcher(toast, 'при загрузке мэшапа'));
            }}
        />
    );
}
