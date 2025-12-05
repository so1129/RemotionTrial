import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {z} from 'zod';

export const textAnimationSchema = z.object({
  textSettings: z.object({
    text: z.string().describe('表示するテキスト'),
    fontSize: z.number().min(20).max(200).describe('フォントサイズ（20〜200px）'),
    textColor: z.string().describe('文字色（例: white, #FFFFFF, rgb(255, 255, 255)）'),
  }).describe('テキスト設定'),

  backgroundSettings: z.object({
    backgroundColor: z.string().describe('背景色（例: #DAA520, red, rgb(255, 0, 0)）'),
  }).describe('背景設定'),

  animationSettings: z.object({
    speed: z.number().min(1).max(20).describe('アニメーション速度（1=最速、20=最遅）'),
    direction: z.enum(['bottom-to-top', 'top-to-bottom', 'left-to-right', 'right-to-left']).describe('アニメーション方向'),
  }).describe('アニメーション設定'),
});

export type TextAnimationProps = z.infer<typeof textAnimationSchema>;

export const TextAnimation: React.FC<TextAnimationProps> = ({
  textSettings,
  backgroundSettings,
  animationSettings,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const {text, fontSize, textColor} = textSettings;
  const {backgroundColor} = backgroundSettings;
  const {speed, direction} = animationSettings;
  const characters = text.split('');

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial Black, sans-serif',
        fontSize,
        fontWeight: 900,
        color: textColor,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '5px',
        }}
      >
        {characters.map((char, index) => {
          // 各文字が順番に飛び出すように遅延を設定
          const delay = index * speed;

          // スプリングアニメーションで弾むような動き
          const bounce = spring({
            frame: frame - delay,
            fps,
            config: {
              damping: 10,
              stiffness: 200,
              mass: 0.5,
            },
          });

          // 方向に応じた移動距離を計算
          let translateX = 0;
          let translateY = 0;

          switch (direction) {
            case 'bottom-to-top':
              translateY = interpolate(bounce, [0, 1], [300, 0]);
              break;
            case 'top-to-bottom':
              translateY = interpolate(bounce, [0, 1], [-300, 0]);
              break;
            case 'left-to-right':
              translateX = interpolate(bounce, [0, 1], [-300, 0]);
              break;
            case 'right-to-left':
              translateX = interpolate(bounce, [0, 1], [300, 0]);
              break;
          }

          // 透明度
          const opacity = interpolate(
            frame - delay,
            [0, 10],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }
          );

          return (
            <span
              key={index}
              style={{
                display: 'inline-block',
                transform: `translate(${translateX}px, ${translateY}px)`,
                opacity,
                textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
