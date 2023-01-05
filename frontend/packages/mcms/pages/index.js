import Image from 'next/image';
import banner_mcms from '../public/imgs/banner_mcms.jpg';

export default function Home() {
  return (
    <>
      <div>
        <Image
          quality={100}
          priority={false}
          objectFit="cover"
          src={banner_mcms}
          alt={'banner_mcms'}
          width={banner_mcms.width}
          height={banner_mcms.height}
        />
      </div>
    </>
  );
}
