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
