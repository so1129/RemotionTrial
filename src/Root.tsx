import {Composition} from 'remotion';
import {TextAnimation, textAnimationSchema} from './TextAnimation';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TextAnimation"
        component={TextAnimation}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={textAnimationSchema}
        defaultProps={{
          textSettings: {
            text: 'テキストアニメーション',
            fontSize: 80,
            textColor: 'white',
          },
          backgroundSettings: {
            backgroundColor: '#DAA520',
          },
          animationSettings: {
            speed: 5,
            direction: 'bottom-to-top',
          },
        }}
      />
    </>
  );
};
