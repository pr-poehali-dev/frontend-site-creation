export const iconAssets = {
  graduationCap: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/6eb5d3ee-f960-493f-aa0b-44fbf216bcb1.jpg',
  crown: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/66809d72-7fdc-4254-8f38-b6e9b4408d57.jpg',
  shoppingBag: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/4b137ab3-3d2d-467f-bedc-29148ba041e8.jpg',
  heart: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/b8d2ee78-0866-4c70-9958-0e4ca7425c56.jpg',
  award: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/5cff8ba5-1227-4af5-a20c-a2acd266121b.jpg',
  trophy: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/edcc32bf-de7a-44fc-9d0c-d648d67633e1.jpg',
  users: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/070beea6-458d-4e57-afd1-cd0e493e4496.jpg',
  live: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/6ca06d93-edee-4e84-85d8-178aafb03c23.jpg',
  package: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/2ea4dd92-c1ae-4d96-95eb-7563ad59148c.jpg',
  check: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/5fdbbed3-9b0e-4976-afa8-39f4bf16fb92.jpg',
  userCheck: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/165c7671-6243-4687-90d1-bee3c399f7c4.jpg',
  calendarCheck: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/c8cf1921-9558-4c1f-b413-9887a28a4f3a.jpg',
  sparkles: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/3fae1299-41e6-428a-ab49-41b1ae236d10.jpg',
  shield: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/b54cf55f-d0c7-4605-ae62-dde3d5b0636e.jpg',
  percent: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/6ec10fe1-4c48-41b3-89a8-9a01bde5fb96.jpg',
  playCircle: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/92442212-f8cc-4dfd-bde1-d69a0789a764.jpg',
  headphones: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/cea32635-8411-48aa-8d07-3974fe2ab129.jpg',
  gift: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/3d87161e-992a-447f-9393-a076902fd8c2.jpg',
  star: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/310030e9-ec47-4977-a709-b78dbcdd5e14.jpg',
  book: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/93e641ec-6b6f-44cd-83e7-d8f1a439ee72.jpg',
  mapPin: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/c5513698-eebd-4f37-956f-607070375763.jpg',
  truck: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/7665c7a4-f0cd-4936-9f0e-31ad72f3b0f1.jpg',
  refresh: 'https://cdn.poehali.dev/projects/5c134f01-95d0-4127-889a-6ff9b3e809e4/files/9e7a4c5c-72b7-4c35-b6f0-9a647715fff9.jpg',
} as const;

export type IconAssetName = keyof typeof iconAssets;

interface IconAssetProps {
  name: IconAssetName;
  size?: number;
  className?: string;
}

const IconAsset = ({ name, size = 40, className = '' }: IconAssetProps) => (
  <img
    src={iconAssets[name]}
    alt=""
    style={{ width: size, height: size }}
    className={`object-contain rounded-xl ${className}`}
  />
);

export default IconAsset;