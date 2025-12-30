import Lottie from 'lottie-react';
import lightAnimation from '../assets/empty-light.json';
import darkAnimation from '../assets/empty-dark.json';

type Props = {
    theme: 'light' | 'dark';
};

function EmptyChatAnimation({ theme }: Props) {
    const animationData =
        theme === 'dark' ? darkAnimation : lightAnimation;

    return (
        <div className={`empty-chat-animation ${theme === 'dark' ? 'dark-animation' : 'light-animation'
            }`}
        >
            <Lottie
                animationData={animationData}
                loop
                autoplay
            />
        </div>
    );
}

export default EmptyChatAnimation;
