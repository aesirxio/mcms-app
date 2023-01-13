import Image from 'next/image';
import Link from 'next/link';
import banner_mcms from '../public/imgs/banner_mcms.jpg';
import icon_banner from '../public/imgs/icon_banner.png';
import footer_right from '../public/imgs/footer_right.png';
import icon_img from '../public/imgs/icon.png';
import icon_20 from '../public/imgs/20.png';

export default function Home() {
  const menuHeader = [
    { title: `Home`, href: '/#features', slug: 'features' },
    { title: `Service`, href: '/#packages', slug: 'packages' },
    { title: `Contact`, href: '/roadmap', slug: 'roadmap' },
  ];
  const dataBanner = [
    { icon: { icon_img }, title: 'Innovative bussiness', subTitle: 'Easy to customize' },
    { icon: { icon_img }, title: 'Expertly marketing', subTitle: 'High quality service' },
    { icon: { icon_img }, title: 'Engaging audiences', subTitle: 'Build perfect websites' },
  ];
  const dataService = [
    {
      icon: { icon_img },
      title: 'eCommerce development',
      subTitle: 'Lorem ipsum dolor sit consectetur <br/> adipiscing elit eiusmod incididunt. ',
      link: 'Read More',
    },
    {
      icon: { icon_img },
      title: 'Design and Development',
      subTitle: 'Lorem ipsum dolor sit consectetur <br/> adipiscing elit eiusmod incididunt. ',
      link: 'Read More',
    },
    {
      icon: { icon_img },
      title: 'Social media marketing',
      subTitle: 'Lorem ipsum dolor sit consectetur <br/> adipiscing elit eiusmod incididunt. ',
      link: 'Read More',
    },
  ];

  const dataFooter = [
    {
      title: 'Company',
      menu: ['About company', 'Ourservices'],
    },
    {
      title: 'Service',
      menu: ['About company', 'Ourservices', 'Contact us'],
    },
    {
      title: 'Contact',
      menu: ['About company', 'Ourservices', 'Contact us'],
    },
    {
      title: 'Company',
      menu: ['About company', 'Ourservices', 'Contact us'],
    },
  ];
  return (
    <>
      {/* //banner */}
      <div className="position-relative overflow-hidden">
        <Image
          quality={100}
          priority={false}
          // layout='fill'
          objectFit="cover"
          src={banner_mcms}
          alt={'banner_mcms'}
          width={banner_mcms.width}
          height={banner_mcms.height}
        />

        <div className="position-absolute top-0 start-0 ps-100 py-5">
          <Image
            quality={100}
            priority={false}
            // layout='fill'
            objectFit="cover"
            src={icon_banner}
            alt={'banner_mcms'}
            width={icon_banner.width}
            height={icon_banner.height}
          />
        </div>
        <div className="position-absolute top-0 end-0 pe-100 py-5">
          <div className="menu-list ">
            <nav className="navbar p-0">
              <ul className="navbar-nav flex-column flex-lg-row flex-xl-row flex-xxl-row mb-0 p-0 fs-10 w-100">
                {menuHeader.map((item, index) => {
                  return (
                    <li key={index} className="nav-item position-relative">
                      <Link
                        href={item.href}
                        passHref
                        className="p-3 text-decoration-none fs-8 text-white fw-semibold"
                      >
                        <span> {item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <h1 className="text-white fs-72 font-robotoslab fw-medium lh-sm text-uppercase">
            Start your online <br /> bussiness today
          </h1>
          <p className="fs-8 text-white">The best way to promote your bussiness</p>
          <a
            target="_blank"
            className={`btn btn-success rounded-4 px-4 py-13px lh-sm text-uppercase fw-bold`}
            href="#"
          >
            GET STARTED NOW
          </a>
        </div>
      </div>
      <div className="d-flex justify-content-center w-100 py-3 mt-95 bg-gray">
        {dataBanner.map((v) => (
          <div
            className="bg-white rounded-5 border me-4 z-3 w-20 h-156 d-flex align-items-center"
            key={v?.title}
          >
            <div className="d-flex mx-auto">
              <Image
                quality={100}
                priority={false}
                // layout='fill'
                src={v.icon.icon_img}
                alt={'icon'}
                width={v.icon.width}
                height={v.icon.height}
              />
              <div className="ms-3">
                <span>{v?.title}</span>
                <p>{v?.subTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* //body */}
      <div className="d-xl-flex text-center justify-content-center align-items-end bg-gray col-12">
        <div className="text-xl-end col-12 col-xl-4">
          <span className="fw-bold fs-70 text-green-50">175+</span>
          <p className="fw-bold">WORLDWIDE OFFICES</p>
          <p className="fw-normal">
            Lorem ipsum dolor sit consectetur do <br /> eiusmod tempor incididunt
          </p>
        </div>
        <div className="col-12 col-xl-4">
          <Image
            quality={100}
            priority={false}
            // layout='fill'
            // objectFit="cover"
            src={icon_20}
            alt={'icon'}
            width={icon_20.width}
            height={icon_20.height}
          />
          <p className="fw-bold">YEARS OF EXPERIENCE</p>
        </div>
        <div className="text-xl-start col-12 col-xl-4">
          <span className="fw-bold fs-70 text-green-50">200+</span>
          <p className="fw-bold text-uppercase">HIGH SKILLED PEOPLE</p>
          <p className="fw-normal">
            Lorem ipsum dolor sit consectetur do <br /> eiusmod tempor incididunt
          </p>
        </div>
      </div>

      {/* //intro */}
      <div className="bg-white">
        <div className="container d-flex py-6rem">
          <div className="col-5 ">
            <span className="fw-bold">
              We provide advanced <br /> solutions to growin your <br /> online business
            </span>
          </div>
          <div className="col-6 d-flex">
            <div className="col-5">
              <span className="fw-bold">Build perfect websites</span>
              <p className="fw-normal text-gray-400">
                Lorem ipsum is simply dummy text of the printing typesetting lorem ipsum been text.
              </p>
            </div>
            <div className="col-5 ms-5">
              <span className="fw-bold">Unique experiences</span>
              <p className="fw-normal text-gray-400">
                Lorem ipsum is simply dummy text of the printing typesetting lorem ipsum been text.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* // */}
      <div className="text-center  align-items-end bg-gray py-6rem">
        <div className="text-center">
          <span className="text-green-50 fs-8 fw-bold lh-sm ">Amazing Service</span>
          <p
            className="text-black fs-32 fw-bold lh-sm"
            dangerouslySetInnerHTML={{
              __html: `Beautiful and easy to use professional <br/> animations and drag & drop feature`,
            }}
          ></p>
        </div>
        <div className="d-flex justify-content-center pt-74px">
          {dataService.map((v) => (
            <div
              className="bg-white rounded-5 border me-4 z-3 w-xxl-20 h-xxl-300 d-flex align-items-center lh-md"
              key={v?.title}
            >
              <div className=" mx-auto">
                <Image
                  quality={100}
                  priority={false}
                  // layout='fill'
                  src={v.icon.icon_img}
                  alt={'icon'}
                  width={v.icon.width}
                  height={v.icon.height}
                />
                <div className="ms-3">
                  <span className="text-primary fs-8 fw-bold">{v?.title}</span>
                  <div dangerouslySetInnerHTML={{ __html: `${v?.subTitle}` }}></div>
                  <a href="#" className="text-decoration-none text-secondary">
                    {v.link}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* //footer */}
      <div className=" h-xl-559px bg-black position-relative">
        <div className="container text-white pt-100px">
          {dataFooter.map((v, i) => (
            <div key={i}>
              <span>{v.title}</span>
              <p>{v.menu[i]}</p>
            </div>
          ))}
        </div>
        <div className="container d-flex">
          <Image
            quality={100}
            priority={false}
            // layout='fill'
            objectFit="cover"
            src={icon_banner}
            alt={'banner_mcms'}
            width={icon_banner.width}
            height={icon_banner.height}
          />
          <div className="position-absolute bottom-0 end-0">
            <Image
              quality={100}
              // priority={false}
              // layout="fill"
              // objectFit="cover"
              src={footer_right}
              alt={'footer_right'}
              width={391}
              height={350}
            />
          </div>
        </div>
      </div>
    </>
  );
}
